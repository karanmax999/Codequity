import { QueryCtx, MutationCtx } from "./_generated/server";

export async function requireAdmin(ctx: QueryCtx | MutationCtx, sessionId: string) {
    const session = await ctx.db
        .query("auth_sessions")
        .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
        .first();

    if (!session) {
        throw new Error("Unauthorized: Invalid session.");
    }

    if (Date.now() > session.expirationTime) {
        throw new Error("Unauthorized: Session expired.");
    }

    return session.address;
}
