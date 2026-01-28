import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNewsletter } from './use-newsletter';

export interface FeaturedArticle {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    type: string;
}

export function useFeaturedSection() {
    const [articles, setArticles] = useState<FeaturedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { subscribe: subscribeToNewsletter, submitting: submittingNewsletter } = useNewsletter();

    const fetchArticles = async () => {
        try {
            setLoading(true);

            // Fetch from dedicated featured_content
            const { data: directFeatured, error: fetchError } = await supabase
                .from('featured_content')
                .select('*')
                .eq('is_published', true)
                .order('priority', { ascending: false });

            if (fetchError) throw fetchError;

            // Fetch featured blogs
            const { data: featuredBlogs, error: blogError } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .eq('is_featured', true)
                .order('published_at', { ascending: false });

            if (blogError) {
                console.error('Error fetching featured blogs:', blogError);
            }

            // Merge and transform
            const merged = [
                ...(directFeatured || []),
                ...(featuredBlogs || []).map(blog => ({
                    id: blog.id,
                    title: blog.title,
                    description: blog.excerpt || blog.title,
                    tags: blog.tags || [],
                    link: `/blog/${blog.slug}`,
                    type: 'blog'
                }))
            ];

            // Keep the top 2 for the grid
            setArticles(merged.slice(0, 2));
        } catch (err: any) {
            console.error('Error fetching featured articles:', err);
            setError(err.message);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    const internalSubscribe = async (email: string) => {
        return await subscribeToNewsletter(email, 'featured_section');
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return {
        articles,
        loading,
        error,
        submittingNewsletter,
        subscribeToNewsletter: internalSubscribe,
        refresh: fetchArticles
    };
}
