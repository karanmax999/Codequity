import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./utils";
import { ADMIN_WALLETS } from "./constants";

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

// Wallet-based file upload for admin portal
export const generateUploadUrlWithWallet = mutation({
    args: { adminAddress: v.string() },
    handler: async (ctx, args) => {
        if (!ADMIN_WALLETS.includes(args.adminAddress)) {
            throw new Error("Unauthorized: Not an admin wallet");
        }
        return await ctx.storage.generateUploadUrl();
    },
});

export const getFileUrl = mutation({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

