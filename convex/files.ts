import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";

export const generateUploadUrl = mutation({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.sessionId);
        return await ctx.storage.generateUploadUrl();
    },
});

export const getImageUrl = mutation({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});
