import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // 1. Applications (Linked to Apply Page)
    applications: defineTable({
        team_name: v.string(),
        lead_name: v.string(),
        email: v.string(),
        github_url: v.optional(v.string()),
        project_name: v.optional(v.string()),
        category: v.optional(v.string()), // 'defi', 'infra', etc.
        stage: v.optional(v.string()),    // 'idea', 'mvp', 'testnet'
        description: v.optional(v.string()),
        video_url: v.optional(v.string()),
        motivation: v.optional(v.string()),
        status: v.string(), // 'pending', 'reviewing', 'accepted', 'rejected'
        created_at: v.string(), // ISO timestamp
    })
        .index("by_status", ["status"])
        .index("by_email", ["email"]),

    // 2. Projects (Linked to Portfolio Page)
    projects: defineTable({
        name: v.string(),
        tagline: v.optional(v.string()),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        website_url: v.optional(v.string()),
        twitter_url: v.optional(v.string()),
        cohort_id: v.optional(v.string()),
        status: v.optional(v.string()), // 'live', 'acquired', 'building'
    }).index("by_cohort", ["cohort_id"]),

    // 3. Partners (Linked to Partners Page)
    partners: defineTable({
        name: v.string(),
        category: v.optional(v.string()),
        logo_url: v.optional(v.string()),
        website_url: v.optional(v.string()),
        perk_title: v.optional(v.string()),
        perk_description: v.optional(v.string()),
        is_active: v.boolean(),
    }).index("by_category", ["category"]),

    // 4. Featured Content (Dynamic Home Section)
    featured_content: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        link: v.optional(v.string()),
        priority: v.number(),
        is_published: v.boolean(),
        type: v.string(), // 'article', 'newsletter', 'event'
        created_at: v.string(),
    }).index("by_priority", ["priority"]),

    // 5. Newsletter Subscribers
    newsletter_subscribers: defineTable({
        email: v.string(),
        source: v.optional(v.string()),
        created_at: v.string(),
    }).index("by_email", ["email"]),

    // 6. Blog Posts
    blogs: defineTable({
        title: v.string(),
        slug: v.string(),
        excerpt: v.optional(v.string()),
        content: v.optional(v.string()), // Markdown
        image_url: v.optional(v.string()),
        video_url: v.optional(v.string()),
        video_storage_id: v.optional(v.string()),
        author_name: v.string(),
        status: v.string(), // 'draft', 'published', 'archived'
        published_at: v.optional(v.string()),
        is_featured: v.boolean(),
        tags: v.optional(v.array(v.string())),
        created_at: v.string(),
        updated_at: v.string(),
    })
        .index("by_slug", ["slug"])
        .index("by_status_date", ["status", "published_at"]),

    // 7. Auth Sessions (Wallet Login)
    auth_sessions: defineTable({
        sessionId: v.string(),
        address: v.string(), // Ethereum address
        expirationTime: v.number(),
    }).index("by_sessionId", ["sessionId"]),
});
