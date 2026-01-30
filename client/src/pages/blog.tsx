import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useBlogs, BlogPost } from "@/hooks/use-blogs";
import { ArrowRight, Calendar, User, Tag, PlayCircle } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
    const { upcomingBlogs, previousBlogs, loading } = useBlogs();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black relative overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <Helmet>
                <title>Blog | CodeQuity - Perspectives on Web3 & Startups</title>
                <meta name="description" content="Read the latest insights, tutorials, and ecosystem updates from the CodeQuity team." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="mb-24 text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-orbitron font-black mb-6 tracking-tighter"
                        >
                            THE <span className="text-primary">ARCHIVE</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="h-1 w-24 bg-primary mx-auto mb-8 rounded-full"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed font-light"
                        >
                            Deciphering the future of Web3, technical engineering, and the builder ecosystem.
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
                <div className={`relative bg-black border border-white/5 rounded-[2.5rem] p-6 md:p-10 hover:border-primary/40 transition-all duration-700 h-full flex flex-col cursor-pointer overflow-hidden group/card`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

                    {/* Image */}
                    {blog.image_url && (
                        <div className="aspect-[16/10] w-full mb-8 rounded-3xl overflow-hidden border border-white/5 relative bg-white/5">
                            <img
                                src={blog.image_url}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.5] group-hover/card:grayscale-0 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity" />
                            {blog.video_url && (
                                <div className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-primary">
                                    <PlayCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 mb-6 font-orbitron uppercase tracking-[0.2em] font-bold">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-primary" />
                            {blog.published_at ? new Date(blog.published_at as string).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-primary" />
                            {blog.author_name}
                        </div>
                    </div>

                    <h3 className="text-3xl font-orbitron font-black mb-6 group-hover/card:text-primary transition-colors line-clamp-2 leading-tight uppercase tracking-tighter">
                        {blog.title}
                    </h3>

                    <p className="text-gray-400 mb-10 flex-grow leading-relaxed line-clamp-3 text-sm font-light">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-3">
                            {blog.tags?.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/5 rounded-full text-gray-500 font-bold group-hover/card:border-primary/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-primary flex items-center gap-3 font-black group-hover:gap-5 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
