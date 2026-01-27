import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

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
    const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

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

            // If no data (real DB empty), fall back to defaults for demo
            if (merged.length === 0) {
                setArticles([
                    {
                        id: '1',
                        title: "Privacy trends for 2026",
                        description: "Why privacy, where, and how -- on moats and messaging to data and security testing",
                        tags: ["tech trends", "privacy"],
                        link: "#",
                        type: 'article'
                    },
                    {
                        id: '2',
                        title: "Performing under pressure: Lessons from elite athletes",
                        description: "Big-wave surfer Laird Hamilton and former pro volleyball star Gabby Reece talk about how to achieve peak performance while...",
                        tags: ["company building", "Founders Summits"],
                        link: "#",
                        type: 'article'
                    }
                ]);
            } else {
                setArticles(merged.slice(0, 2)); // Keep the top 2 for the grid
            }
        } catch (err: any) {
            console.error('Error fetching featured articles:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const subscribeToNewsletter = async (email: string) => {
        setSubmittingNewsletter(true);
        try {
            const { error: subError } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email, source: 'featured_section' }]);

            if (subError) throw subError;
            return { success: true, message: 'Subscribed successfully!' };
        } catch (err: any) {
            console.error('Error subscribing to newsletter:', err);
            return { success: false, message: err.message || 'Subscription failed.' };
        } finally {
            setSubmittingNewsletter(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return {
        articles,
        loading,
        error,
        submittingNewsletter,
        subscribeToNewsletter,
        refresh: fetchArticles
    };
}
