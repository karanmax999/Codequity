import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

// List all projects (publicly accessible for now, can be secured later)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").order("desc").collect();
    },
});

// Create a new project (Admin only)
export const create = mutation({
    args: {
        sessionId: v.string(), // Auth
        name: v.string(),
        tagline: v.optional(v.string()),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        website_url: v.optional(v.string()),
        twitter_url: v.optional(v.string()),
        cohort_id: v.optional(v.string()),
        status: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, ...fields } = args;
        return await ctx.db.insert("projects", fields);
    },
});

// Update an existing project
export const update = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("projects"),
        name: v.optional(v.string()),
        tagline: v.optional(v.string()),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        website_url: v.optional(v.string()),
        twitter_url: v.optional(v.string()),
        cohort_id: v.optional(v.string()),
        status: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        const { sessionId, id, ...fields } = args;
        await ctx.db.patch(id, fields);
        return id;
    },
});

// Delete a project
export const remove = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("projects")
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.delete(args.id);
    },
});
