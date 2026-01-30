"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { ADMIN_WALLETS, SESSION_DURATION_MS } from "./constants";
import { verifyMessage } from "viem";

/**
 * Verifies a signature and creates a session via mutation if valid.
 */
export const login = action({
    args: {
        address: v.string(),
        signature: v.string(),
        message: v.string(), // Expected: "Login to Codequity Admin at [ISO_TIMESTAMP]"
    },
    handler: async (ctx, args) => {
        // 1. Check if address is an admin
        const isAdmin = ADMIN_WALLETS.some(
            (wallet) => wallet.toLowerCase() === args.address.toLowerCase()
        );

        if (!isAdmin) {
            throw new Error("Unauthorized: Address is not an admin.");
        }

        // 2. Verify timestamp in message (Simple Replay Protection)
        const prefix = "Login to Codequity Admin at ";
        if (!args.message.startsWith(prefix)) {
            throw new Error("Invalid message format.");
        }

        const timestampStr = args.message.slice(prefix.length);
        const timestamp = new Date(timestampStr).getTime();
        const now = Date.now();

        if (Math.abs(now - timestamp) > 5 * 60 * 1000) {
            throw new Error("Login request expired. Please try again.");
        }

        // 3. Verify Signature using viem (Requires Node.js)
        const isValid = await verifyMessage({
            address: args.address as `0x${string}`,
            message: args.message,
            signature: args.signature as `0x${string}`,
        });

        if (!isValid) {
            throw new Error("Invalid signature.");
        }

        // 4. Trigger the Mutation to store the session
        const sessionId = crypto.randomUUID();
        const expirationTime = now + SESSION_DURATION_MS;

        await ctx.runMutation(internal.auth.storeSession, {
            address: args.address,
            sessionId,
            expirationTime,
        });

        return { sessionId, expirationTime };
    },
});
