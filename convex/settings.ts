import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ADMIN_WALLETS } from "./constants";

export const getSettings = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("global_settings").collect();
    },
});

export const getSetting = query({
    args: { key: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("global_settings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();
    },
});

export const updateSetting = mutation({
    args: {
        key: v.string(),
        value: v.any(),
        adminAddress: v.string(),
    },
    handler: async (ctx, args) => {
        if (!ADMIN_WALLETS.includes(args.adminAddress)) {
            throw new Error("Unauthorized: Not an admin wallet");
        }

        const existing = await ctx.db
            .query("global_settings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, { value: args.value });
        } else {
            await ctx.db.insert("global_settings", { key: args.key, value: args.value });
        }
    },
});
