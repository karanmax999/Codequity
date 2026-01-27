import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useBlogs, BlogPost } from "@/hooks/use-blogs";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
    const { upcomingBlogs, previousBlogs, loading } = useBlogs();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <Helmet>
                <title>Blog | CodeQuity - Perspectives on Web3 & Startups</title>
                <meta name="description" content="Read the latest insights, tutorials, and ecosystem updates from the CodeQuity team." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-orbitron font-black mb-4"
                        >
                            THE <span className="text-primary text-glow">MANIFESTO</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 max-w-2xl text-lg"
                        >
                            Insights from the frontier of Web3 startup building, technical deep dives, and community updates.
                        </motion.p>
                    </div>

                    {/* Upcoming Section */}
                    {upcomingBlogs.length > 0 && (
                        <section className="mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Incoming transmissions</h2>
                                <div className="h-px flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {upcomingBlogs.map((blog, index) => (
                                    <BlogCard key={blog.id} blog={blog} index={index} isUpcoming />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Previous Logs Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500">Archived logs</h2>
                            <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
                                ))}
                            </div>
                        ) : previousBlogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {previousBlogs.map((blog, index) => (
                                    <BlogCard key={blog.id} blog={blog} index={index} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No logs found in the archives.</p>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function BlogCard({ blog, index, isUpcoming = false }: { blog: BlogPost, index: number, isUpcoming?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${isUpcoming ? 'from-primary/10 to-accent/10' : 'from-white/5 to-transparent'} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <Link href={`/blog/${blog.slug}`}>
                <div className={`relative bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-500 h-full flex flex-col cursor-pointer`}>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 font-mono uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(blog.published_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {blog.author_name}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                    </h3>

                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed line-clamp-3">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags?.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/10 rounded-full text-gray-500 group-hover:text-gray-300 group-hover:border-primary/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-primary flex items-center gap-2 font-bold group-hover:gap-3 transition-all">
                            <span className="text-xs uppercase tracking-[0.2em]">Read</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
