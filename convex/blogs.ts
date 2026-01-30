import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

// List published blogs (Public)
export const listPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("blogs")
            .withIndex("by_status_date", (q) => q.eq("status", "published"))
            .order("desc") // Most recent first
            .take(50);
    },
});

// List all blogs (Admin)
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("blogs").order("desc").collect();
    },
});

// Get single blog by slug
export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("blogs")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

// Create blog post
export const create = mutation({
    args: {
        sessionId: v.string(), // Auth
        title: v.string(),
        slug: v.string(),
        excerpt: v.optional(v.string()),
        content: v.optional(v.string()),
        image_url: v.optional(v.string()),
        video_url: v.optional(v.string()),
        video_storage_id: v.optional(v.string()),
        author_name: v.string(),
        status: v.string(),
        published_at: v.optional(v.string()),
        is_featured: v.boolean(),
        tags: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);

        // Basic slug collision check could be added here
        const now = new Date().toISOString();
        const { sessionId, ...fields } = args;
        return await ctx.db.insert("blogs", {
            ...fields,
            created_at: now,
            updated_at: now,
        });
    },
});

// Update blog post
export const update = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("blogs"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        content: v.optional(v.string()),
        image_url: v.optional(v.string()),
        video_url: v.optional(v.string()),
        video_storage_id: v.optional(v.string()),
        author_name: v.optional(v.string()),
        status: v.optional(v.string()),
        published_at: v.optional(v.string()),
        is_featured: v.optional(v.boolean()),
        tags: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);

        const { sessionId, id, ...fields } = args;
        await ctx.db.patch(id, {
            ...fields,
            updated_at: new Date().toISOString(),
        });
    },
});

// Delete blog post
export const remove = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("blogs")
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.delete(args.id);
    },
});
