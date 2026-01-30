import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Subscribe to newsletter (Public)
export const subscribe = mutation({
    args: {
        email: v.string(),
        source: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if email already exists
        const existing = await ctx.db
            .query("newsletter_subscribers")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            return { success: true, message: "You are already subscribed!" };
        }

        await ctx.db.insert("newsletter_subscribers", {
            email: args.email,
            source: args.source || "unknown",
            created_at: new Date().toISOString(),
        });

        return { success: true, message: "Subscribed successfully!" };
    },
});

// List subscribers (Admin)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("newsletter_subscribers").order("desc").collect();
    },
});
