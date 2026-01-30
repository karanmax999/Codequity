import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

// Submit a new application (Public)
export const submit = mutation({
    args: {
        team_name: v.string(),
        lead_name: v.string(),
        email: v.string(),
        github_url: v.optional(v.string()),
        project_name: v.optional(v.string()),
        category: v.optional(v.string()),
        stage: v.optional(v.string()),
        description: v.optional(v.string()),
        video_url: v.optional(v.string()),
        motivation: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("applications", {
            ...args,
            status: "pending",
            created_at: new Date().toISOString(),
        });
    },
});

// List all applications (Admin)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("applications").order("desc").collect();
    },
});

// Update status (Admin)
export const updateStatus = mutation({
    args: {
        sessionId: v.string(), // Auth
        id: v.id("applications"),
        status: v.string()
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        await ctx.db.patch(args.id, { status: args.status });
    },
});
