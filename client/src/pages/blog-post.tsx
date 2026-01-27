import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useBlogs, BlogPost as BlogPostType } from "@/hooks/use-blogs";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "wouter";

export default function BlogPost() {
    const [, params] = useRoute("/blog/:slug");
    const { getBlogBySlug } = useBlogs();
    const [blog, setBlog] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [readingTime, setReadingTime] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            if (params?.slug) {
                const data = await getBlogBySlug(params.slug);
                if (data) {
                    setBlog(data);
                    // Estimate reading time: ~200 words per minute
                    const words = (data.content || '').split(/\s+/).length;
                    setReadingTime(Math.ceil(words / 200));
                }
                setLoading(false);
            }
        };
        fetchPost();
    }, [params?.slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin shadow-[0_0_20px_rgba(0,212,255,0.3)]" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">LOG NOT FOUND</h1>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">The requested transmission could not be decrypted or does not exist in our archives.</p>
                    <Link href="/blog">
                        <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-primary hover:bg-white/10 transition-all flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-4 h-4" /> Back to Archives
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <Helmet>
                <title>{blog.title} | CodeQuity Blog</title>
                <meta name="description" content={blog.excerpt} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.excerpt} />
                {blog.image_url && <meta property="og:image" content={blog.image_url} />}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link href="/blog">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to logs
                        </motion.button>
                    </Link>

                    <article>
                        {/* Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-6 text-xs text-gray-500 mb-8 font-mono uppercase tracking-[0.2em]"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                {blog.author_name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                {readingTime} min read
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-orbitron font-black mb-12 leading-[1.1] tracking-tighter"
                        >
                            {blog.title}
                        </motion.h1>

                        {/* Image */}
                        {blog.image_url && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 mb-16 relative group"
                            >
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </motion.div>
                        )}

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-invert prose-primary max-w-none prose-lg md:prose-xl prose-headings:font-orbitron prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:rounded-r-xl"
                        >
                            <div className="whitespace-pre-wrap">
                                {blog.content}
                            </div>
                        </motion.div>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-3"
                        >
                            {blog.tags?.map((tag: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-primary hover:border-primary/50 transition-all cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </motion.div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
