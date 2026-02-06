import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ADMIN_WALLETS } from "./constants";

// ------------------------------------------------------------------
// Mission Weeks
// ------------------------------------------------------------------

export const getWeeks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("mission_weeks")
            .withIndex("by_week")
            .order("asc")
            .collect();
    },
});

export const getWeekByNumber = query({
    args: { week: v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("mission_weeks")
            .withIndex("by_week", (q) => q.eq("week", args.week))
            .first();
    },
});

export const updateWeek = mutation({
    args: {
        id: v.optional(v.id("mission_weeks")), // If provided, update; else insert/upsert logic manually if needed
        week: v.number(),
        status: v.string(),
        ecosystem: v.string(),
        category: v.string(),
        description: v.string(),
        socials: v.object({
            twitter: v.optional(v.string()),
            discord: v.optional(v.string()),
            website: v.optional(v.string()),
        }),
        resources: v.array(v.object({
            label: v.string(),
            url: v.string(),
            type: v.string(),
        })),
        initialize_url: v.optional(v.string()), // Added for initialize button
        adminAddress: v.string(), // For simple auth check
    },
    handler: async (ctx, args) => {
        // Simple Admin Check
        if (!ADMIN_WALLETS.includes(args.adminAddress)) {
            throw new Error("Unauthorized: Not an admin wallet");
        }

        // Check if week already exists
        const existing = await ctx.db
            .query("mission_weeks")
            .withIndex("by_week", (q) => q.eq("week", args.week))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                status: args.status,
                ecosystem: args.ecosystem,
                category: args.category,
                description: args.description,
                socials: args.socials,
                resources: args.resources,
                initialize_url: args.initialize_url,
            });
            return existing._id;
        } else {
            return await ctx.db.insert("mission_weeks", {
                week: args.week,
                status: args.status,
                ecosystem: args.ecosystem,
                category: args.category,
                description: args.description,
                socials: args.socials,
                resources: args.resources,
                initialize_url: args.initialize_url,
            });
        }
    },
});

// ------------------------------------------------------------------
// Events
// ------------------------------------------------------------------

export const getEvents = query({
    args: { activeOnly: v.optional(v.boolean()) },
    handler: async (ctx, args) => {
        const q = ctx.db.query("events");
        if (args.activeOnly) {
            return await q.withIndex("by_active", (q) => q.eq("is_active", true)).collect();
        }
        return await q.collect();
    },
});

export const updateEvent = mutation({
    args: {
        id: v.optional(v.id("events")),
        title: v.string(),
        start_date: v.string(),
        end_date: v.optional(v.string()),
        link: v.optional(v.string()),
        is_active: v.boolean(),
        type: v.string(),
        adminAddress: v.string(),
    },
    handler: async (ctx, args) => {
        if (!ADMIN_WALLETS.includes(args.adminAddress)) {
            throw new Error("Unauthorized: Not an admin wallet");
        }

        if (args.id) {
            await ctx.db.patch(args.id, {
                title: args.title,
                start_date: args.start_date,
                end_date: args.end_date,
                link: args.link,
                is_active: args.is_active,
                type: args.type,
            });
            return args.id;
        } else {
            return await ctx.db.insert("events", {
                title: args.title,
                start_date: args.start_date,
                end_date: args.end_date,
                link: args.link,
                is_active: args.is_active,
                type: args.type,
            });
        }
    },
});

export const deleteEvent = mutation({
    args: { id: v.id("events"), adminAddress: v.string() },
    handler: async (ctx, args) => {
        if (!ADMIN_WALLETS.includes(args.adminAddress)) {
            throw new Error("Unauthorized: Not an admin wallet");
        }
        await ctx.db.delete(args.id);
    },
});
// ------------------------------------------------------------------
// Global Settings (Moved from settings.ts to ensure availability)
// ------------------------------------------------------------------

export const getGlobalSettings = query({
    args: {},
    handler: async (ctx) => {
        try {
            return await ctx.db.query("global_settings").collect();
        } catch (e) {
            console.error("Error fetching global_settings:", e);
            return [];
        }
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
