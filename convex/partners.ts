import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

// List all active partners
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("partners")
            .filter((q) => q.eq(q.field("is_active"), true))
            .collect();
    },
});

// Create a new partner (Admin)
export const create = mutation({
    args: {
        sessionId: v.string(), // Auth
        name: v.string(),
        category: v.optional(v.string()),
        logo_url: v.optional(v.string()),
        website_url: v.optional(v.string()),
        perk_title: v.optional(v.string()),
        perk_description: v.optional(v.string()),
        is_active: v.boolean(),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, ...fields } = args;
        return await ctx.db.insert("partners", fields);
    },
});

// Toggle partner status (Admin)
export const toggleActive = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("partners"),
        is_active: v.boolean()
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.patch(args.id, { is_active: args.is_active });
    },
});

// Update partner details
export const update = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("partners"),
        name: v.optional(v.string()),
        category: v.optional(v.string()),
        logo_url: v.optional(v.string()),
        website_url: v.optional(v.string()),
        perk_title: v.optional(v.string()),
        perk_description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

// Remove partner
export const remove = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("partners")
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.delete(args.id);
    },
});
