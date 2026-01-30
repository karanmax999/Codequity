import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

// List published featured content (Public)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("featured_content")
            .withIndex("by_priority")
            .order("asc") // Higher priority (number) first? Or generic sort
            .filter((q) => q.eq(q.field("is_published"), true))
            .collect();
    },
});

// List all (Admin)
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("featured_content").collect();
    },
});

// Create item
export const create = mutation({
    args: {
        sessionId: v.string(), // Auth
        title: v.string(),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        link: v.optional(v.string()),
        priority: v.number(),
        is_published: v.boolean(),
        type: v.string(),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, ...fields } = args;
        return await ctx.db.insert("featured_content", {
            ...fields,
            created_at: new Date().toISOString(),
        });
    },
});

// Update item
export const update = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("featured_content"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        link: v.optional(v.string()),
        priority: v.optional(v.number()),
        is_published: v.optional(v.boolean()),
        type: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

// Remove item
export const remove = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("featured_content")
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.delete(args.id);
    },
});
