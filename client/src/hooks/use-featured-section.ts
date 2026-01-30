import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNewsletter } from './use-newsletter';

export interface FeaturedArticle {
    id: string; // We map _id to id for compatibility
    title: string;
    description: string;
    tags: string[];
    link: string;
    type: string;
}

export function useFeaturedSection() {
    const directFeatured = useQuery(api.featured.list) || [];
    const featuredBlogs = useQuery(api.blogs.listPublished) || [];

    const { subscribe: subscribeToNewsletter, submitting: submittingNewsletter } = useNewsletter();

    // Filter for featured blogs only
    const actuallyFeaturedBlogs = (featuredBlogs as any[]).filter((b: any) => b.is_featured);

    // Merge and transform
    const merged: FeaturedArticle[] = [
        ...directFeatured.map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description || "",
            tags: item.tags || [],
            link: item.link || "#",
            type: item.type,
        })),
        ...actuallyFeaturedBlogs.map((blog: any) => ({
            id: blog._id,
            title: blog.title,
            description: blog.excerpt || blog.title,
            tags: blog.tags || [],
            link: `/blog/${blog.slug}`,
            type: 'blog'
        }))
    ];

    // Keep the top 2 for the grid (assuming frontend only wants 2)
    const articles = merged.slice(0, 2);
    const loading = directFeatured === undefined || featuredBlogs === undefined;

    const internalSubscribe = async (email: string) => {
        return await subscribeToNewsletter(email, 'featured_section');
    };

    return {
        articles,
        loading,
        error: null,
        submittingNewsletter,
        subscribeToNewsletter: internalSubscribe,
        refresh: () => { } // No-op
    };
}
