import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useBlogs, useSingleBlog, BlogPost as BlogPostType } from "@/hooks/use-blogs";
import { useEffect, useState, useMemo } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, User, Clock, PlayCircle, Hash } from "lucide-react";
import { Link } from "wouter";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function BlogPost() {
    const [, params] = useRoute("/blog/:slug");
    const { blog, loading } = useSingleBlog(params?.slug ?? "");

    // Extract headings for Table of Contents
    const toc = useMemo(() => {
        if (!blog?.content) return [];
        const lines = blog.content.split('\n');
        const headings: TOCItem[] = [];
        lines.forEach(line => {
            const match = line.match(/^(#{2,3})\s+(.*)/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                headings.push({ id, text, level });
            }
        });
        return headings;
    }, [blog?.content]);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeHeading, setActiveHeading] = useState("");
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(parseFloat(scroll));
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -70% 0px' }
        );

        document.querySelectorAll('h2[id], h3[id]').forEach((heading) => {
            observer.observe(heading);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [blog?.content]);

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
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black relative overflow-x-hidden">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

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

            {/* Reading Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
                style={{ scaleX: scrollProgress }}
            />

            {/* Mobile TOC Button */}
            <div className="lg:hidden fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                    className="w-14 h-14 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Hash className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile TOC Drawer */}
            {isMobileTocOpen && (
                <div className="lg:hidden fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsMobileTocOpen(false)}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        className="absolute right-0 top-0 bottom-0 w-80 bg-black border-l border-white/10 p-8 overflow-y-auto z-50"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 font-orbitron">Archive Index</h4>
                            <button onClick={() => setIsMobileTocOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6">
                            {toc.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                        setActiveHeading(item.id);
                                        setIsMobileTocOpen(false);
                                    }}
                                    className={`text-sm font-medium transition-all ${activeHeading === item.id ? 'text-primary' : 'text-gray-400'
                                        }`}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            )}

            <main className="pt-32 pb-40">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

                        {/* Sidebar: Table of Contents & Tags */}
                        <aside className="hidden lg:block h-fit sticky top-32">
                            <div className="space-y-12">

                                <Link href="/blog">
                                    <button className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 mb-12 group font-orbitron text-[10px] uppercase tracking-widest">
                                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                        Back to logs
                                    </button>
                                </Link>

                                {toc.length > 0 && (
                                    <div className="max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 font-orbitron">Table of Contents</h4>
                                        <nav className="flex flex-col gap-4">
                                            {toc.map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                        setActiveHeading(item.id);
                                                    }}
                                                    className={`text-xs font-medium transition-all duration-300 border-l-2 pl-4 py-1 hover:text-white ${activeHeading === item.id
                                                        ? 'border-primary text-primary bg-primary/5'
                                                        : 'border-white/10 text-gray-500'
                                                        }`}
                                                >
                                                    {item.text}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 font-orbitron">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags?.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[9px] uppercase font-bold tracking-[0.1em] text-gray-500 hover:text-primary hover:border-primary/30 transition-all cursor-default font-orbitron">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <article className="max-w-4xl">
                            {/* Meta Info */}
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
                                    {Math.ceil((blog.content || "").split(/\s+/).length / 225)} MIN READ
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-7xl font-orbitron font-black mb-16 leading-[1.1] tracking-tighter text-white uppercase"
                            >
                                {blog.title}
                            </motion.h1>

                            {/* Video Player */}
                            {blog.video_url && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 mb-20 relative group bg-black shadow-2xl"
                                >
                                    <video
                                        src={blog.video_url}
                                        className="w-full h-full object-cover"
                                        controls
                                        poster={blog.image_url}
                                    />
                                </motion.div>
                            )}

                            {/* Image (if no video) */}
                            {blog.image_url && !blog.video_url && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/5 mb-20 relative bg-white/5"
                                >
                                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                                </motion.div>
                            )}

                            {/* Content body */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-invert prose-primary max-w-none 
                                         prose-p:text-gray-400 prose-p:leading-[1.9] prose-p:mb-10 prose-p:font-sans prose-p:text-lg md:prose-p:text-[1.25rem]
                                         prose-headings:text-white prose-headings:font-orbitron prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:mt-24 prose-headings:scroll-mt-32
                                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                                         prose-strong:text-white prose-strong:font-bold
                                         prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-12 prose-blockquote:px-12 prose-blockquote:rounded-[2.5rem] prose-blockquote:not-italic prose-blockquote:text-white prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:font-medium prose-blockquote:border-l-0 prose-blockquote:text-center prose-blockquote:italic"
                            >
                                <div className="whitespace-pre-wrap selection:bg-primary/30">
                                    {blog.content?.split('\n').map((line, i) => {
                                        const match = line.match(/^(#{2,3})\s+(.*)/);
                                        if (match) {
                                            const Tag = match[1].length === 2 ? 'h2' : 'h3';
                                            const text = match[2].trim();
                                            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                            return <Tag key={i} id={id}>{text}</Tag>;
                                        }
                                        return <p key={i}>{line}</p>;
                                    })}
                                </div>
                            </motion.div>
                        </article>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
