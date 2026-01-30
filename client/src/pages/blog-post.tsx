import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useBlogs, useSingleBlog, BlogPost as BlogPostType } from "@/hooks/use-blogs";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "wouter";

export default function BlogPost() {
    const [, params] = useRoute("/blog/:slug");
    const { blog, loading } = useSingleBlog(params?.slug ?? "");

    // Calculate reading time
    const readingTime = blog?.content
        ? Math.ceil(blog.content.split(/\s+/).length / 200)
        : 0;

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
                            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 mb-12 group font-orbitron text-[10px] uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Back to logs
                        </motion.button>
                    </Link>

                    <article>
                        {/* Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-8 text-[10px] text-gray-400 mb-10 font-orbitron uppercase tracking-[0.3em] font-bold"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-primary opacity-50">DATE:</span>
                                {blog.published_at
                                    ? new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                                    : 'DRAFT'}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary opacity-50">AUTHOR:</span>
                                {blog.author_name}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary opacity-50">SYNC:</span>
                                {readingTime} MIN READ
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-[5.5rem] font-serif font-medium mb-16 leading-[1.05] tracking-tight text-white"
                        >
                            {blog.title}
                        </motion.h1>

                        {/* Image */}
                        {blog.image_url && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 mb-20 relative group bg-white/5"
                            >
                                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
                            </motion.div>
                        )}

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-invert prose-primary max-w-none prose-lg md:prose-xl 
                                     prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-8
                                     prose-headings:text-white prose-headings:font-orbitron prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:mt-16
                                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                                     prose-strong:text-white prose-strong:font-bold
                                     prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:text-white/90 prose-blockquote:border-l-4"
                        >
                            <div className="whitespace-pre-wrap font-sans selection:bg-primary/30">
                                {blog.content}
                            </div>
                        </motion.div>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-32 pt-12 border-t border-white/5 flex flex-wrap gap-3"
                        >
                            {blog.tags?.map((tag: string, i: number) => (
                                <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-primary hover:border-primary/50 transition-all cursor-default font-orbitron">
                                    {tag}
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
