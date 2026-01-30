import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ADMIN_WALLETS, SESSION_DURATION_MS } from "./constants";

/**
 * Internal mutation to store a validated session.
 */
export const storeSession = internalMutation({
    args: {
        address: v.string(),
        sessionId: v.string(),
        expirationTime: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("auth_sessions", {
            sessionId: args.sessionId,
            address: args.address,
            expirationTime: args.expirationTime,
        });
    },
});

/**
 * Checks if a session is valid.
 */
export const validateSession = query({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("auth_sessions")
            .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
            .first();

        if (!session) {
            return { isValid: false };
        }

        if (Date.now() > session.expirationTime) {
            // Clean up expired session? Can't delete in query.
            // We'll just return false.
            return { isValid: false };
        }

        return { isValid: true, address: session.address };
    },
});

/**
 * Logs out (deletes session).
 */
export const logout = mutation({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("auth_sessions")
            .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
            .first();

        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});
