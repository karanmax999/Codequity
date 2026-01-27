import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    author_name: string;
    status: 'draft' | 'published' | 'archived';
    published_at: string;
    is_featured: boolean;
    tags: string[];
}

export function useBlogs() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogs = async (showAll = false) => {
        try {
            setLoading(true);
            let query = supabase
                .from('blogs')
                .select('*')
                .order('published_at', { ascending: false });

            if (!showAll) {
                query = query.eq('status', 'published');
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;
            setBlogs(data || []);
        } catch (err: any) {
            console.error('Error fetching blogs:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUpcomingBlogs = () => {
        const now = new Date();
        return blogs.filter(blog => new Date(blog.published_at) > now);
    };

    const getPreviousBlogs = () => {
        const now = new Date();
        return blogs.filter(blog => new Date(blog.published_at) <= now);
    };

    const getFeaturedBlogs = () => {
        return blogs.filter(blog => blog.is_featured);
    };

    const getBlogBySlug = async (slug: string) => {
        try {
            const { data, error: fetchError } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .single();

            if (fetchError) throw fetchError;
            return data as BlogPost;
        } catch (err) {
            console.error(`Error fetching blog by slug ${slug}:`, err);
            return null;
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        blogs,
        loading,
        error,
        upcomingBlogs: getUpcomingBlogs(),
        previousBlogs: getPreviousBlogs(),
        featuredBlogs: getFeaturedBlogs(),
        getBlogBySlug,
        refresh: fetchBlogs
    };
}
