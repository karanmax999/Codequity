import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface BlogPost {
    _id: Id<"blogs">;
    id: Id<"blogs">; // We map this manually
    _creationTime: number;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    image_url?: string;
    author_name: string;
    status: string;
    published_at?: string;
    is_featured: boolean;
    tags?: string[];
}

export function useBlogs() {
    const publishedBlogs = useQuery(api.blogs.listPublished);
    const allBlogs = useQuery(api.blogs.listAll);

    // Mutations
    const createBlog = useMutation(api.blogs.create);
    const updateBlog = useMutation(api.blogs.update);
    const removeBlog = useMutation(api.blogs.remove);

    // Determine which list to use based on context (for now, public uses published)
    const blogs = publishedBlogs;
    const adminBlogs = allBlogs;

    const loading = blogs === undefined;
    const error = null;

    const getUpcomingBlogs = () => {
        if (!blogs) return [];
        const now = new Date();
        return (blogs as any[]).filter((blog: any) => blog.published_at && new Date(blog.published_at) > now);
    };

    const getPreviousBlogs = () => {
        if (!blogs) return [];
        const now = new Date();
        return (blogs as any[]).filter((blog: any) => blog.published_at && new Date(blog.published_at) <= now);
    };

    const getFeaturedBlogs = () => {
        if (!blogs) return [];
        return (blogs as any[]).filter((blog: any) => blog.is_featured);
    };

    // Note: getBlogBySlug needs to be a hook or called in component
    // We can't return an async function that calls a hook conditionally
    // So we provide a specialized hook for single blog fetching or expose the query

    return {
        blogs: (blogs || []).map((b: any) => ({ ...b, id: b._id } as BlogPost)),
        adminBlogs: (adminBlogs || []).map((b: any) => ({ ...b, id: b._id } as BlogPost)),
        loading,
        error,
        upcomingBlogs: getUpcomingBlogs().map((b: any) => ({ ...b, id: b._id } as BlogPost)),
        previousBlogs: getPreviousBlogs().map((b: any) => ({ ...b, id: b._id } as BlogPost)),
        featuredBlogs: getFeaturedBlogs().map((b: any) => ({ ...b, id: b._id } as BlogPost)),
        refresh: () => { },
        createBlog,
        updateBlog,
        removeBlog
    };
}

// Separate hook for single blog to maintain Rules of Hooks
export function useSingleBlog(slug: string) {
    const blog = useQuery(api.blogs.getBySlug, { slug });
    const loading = blog === undefined;

    return {
        blog: blog ? { ...blog, id: blog._id } : null,
        loading
    };
}
