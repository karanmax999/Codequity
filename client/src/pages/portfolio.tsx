import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, Github, Rocket, Layers, Loader2, Sparkles } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";

const categories = ["All", "DeFi", "Infra", "Gaming", "RWA", "AI", "Social"];

export default function Portfolio() {
    const { projects, loading } = useProjects();
    const [filter, setFilter] = useState("All");

    const filteredProjects = (projects as any[]).filter((p: any) =>
        filter === "All" || p.tags?.some((t: string) => t.toLowerCase() === filter.toLowerCase()) || (filter === "Infra" && p.tags?.some((t: string) => t.toLowerCase() === "infrastructure"))
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
            <Helmet>
                <title>Portfolio | Built at CodeQuity</title>
                <meta name="description" content="A showcase of the best teams shipping code, raising capital, and defining the future of Web3 at CodeQuity." />
            </Helmet>
            <Navigation />

            <div className="pt-32 pb-20 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                            <Rocket className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary tracking-widest uppercase">The Hall of Fame</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-tight">
                            Built at <span className="gradient-text">CodeQuity</span>
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            A showcase of the best teams shipping code, raising capital, and defining the future of Web3.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                            px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all
                            ${filter === cat
                                        ? 'bg-primary text-black shadow-[0_0_20px_rgba(var(--primary),0.5)]'
                                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/5'}
                        `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center py-24">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-gray-500 font-orbitron uppercase tracking-widest text-sm">Recruiting Projects...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 rounded-3xl bg-white/5">
                            <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-orbitron font-bold mb-2">No Projects Found</h2>
                            <p className="text-gray-500 text-sm">Be the first to build the future of {filter === "All" ? "Web3" : filter}.</p>
                            <Button className="mt-8 bg-primary text-black font-bold uppercase tracking-widest px-8 rounded-full">
                                Start Building
                            </Button>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        key={project.id}
                                        className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="p-8 relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-2xl font-orbitron overflow-hidden border border-white/10">
                                                    {project.image_url ? (
                                                        <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        project.name[0]
                                                    )}
                                                </div>
                                                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                                    {project.status}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold font-orbitron mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                                            <p className="text-xs font-bold text-gray-500 mb-4 tracking-wider uppercase">{project.tagline}</p>
                                            <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 h-15">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tags?.map((tag: string) => (
                                                    <span key={tag} className="text-[10px] uppercase font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                                {project.website_url && (
                                                    <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                                        <ExternalLink className="w-3 h-3 mr-2" /> Live Site
                                                    </a>
                                                )}
                                                {project.twitter_url && (
                                                    <a href={project.twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                                        <Twitter className="w-3 h-3 mr-2" /> Twitter
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
