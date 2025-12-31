import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, Github, Rocket, Layers } from "lucide-react";

const projects = [
    {
        id: 1,
        name: "VaultBTC",
        tagline: "Decentralized Bitcoin Custody",
        description: "Non-custodial BTC bridging and yield generation on EVM chains.",
        tags: ["DeFi", "Infrastructure"],
        cohort: "Cohort 1",
        status: "mainnet"
    },
    {
        id: 2,
        name: "PixelRealms",
        tagline: "On-Chain MMORPG",
        description: "A fully on-chain strategy game where assets are dynamic NFTs.",
        tags: ["Gaming", "NFT"],
        cohort: "Cohort 1",
        status: "live"
    },
    {
        id: 3,
        name: "TrustPact",
        tagline: "ZK-Escrow Protocol",
        description: "Privacy-preserving escrow for freelance payments and grants.",
        tags: ["DeFi", "Privacy"],
        cohort: "Cohort 2",
        status: "testnet"
    },
    {
        id: 4,
        name: "AgriFi",
        tagline: "RWA Tokenization",
        description: "Tokenizing agricultural supply chains for transparent financing.",
        tags: ["RWA", "Social"],
        cohort: "Cohort 2",
        status: "building"
    },
    {
        id: 5,
        name: "DeFiLens",
        tagline: "Portfolio Analytics",
        description: "AI-powered portfolio tracking and risk analysis dashboard.",
        tags: ["DeFi", "AI"],
        cohort: "Cohort 1",
        status: "live"
    },
    {
        id: 6,
        name: "ChainGuard",
        tagline: "Smart Contract Security AI",
        description: "Automated vulnerability detection for Solidity contracts.",
        tags: ["Infra", "AI"],
        cohort: "Cohort 2",
        status: "beta"
    }
];

const categories = ["All", "DeFi", "Infra", "Gaming", "RWA", "AI"];

export default function Portfolio() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(p =>
        filter === "All" || p.tags.includes(filter) || (filter === "Infra" && p.tags.includes("Infrastructure"))
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
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
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-2xl font-orbitron">
                                                {project.name[0]}
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                {project.status}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold font-orbitron mb-2">{project.name}</h3>
                                        <p className="text-sm font-bold text-primary mb-4">{project.tagline}</p>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed h-12">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/5 border border-white/5 rounded-md text-gray-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 pt-4 border-t border-white/5">
                                            <Button size="sm" variant="ghost" className="hover:text-primary px-0">
                                                <ExternalLink className="w-4 h-4 mr-2" /> Live Site
                                            </Button>
                                            <Button size="sm" variant="ghost" className="hover:text-primary px-0">
                                                <Twitter className="w-4 h-4 mr-2" /> Follow
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </div>
    );
}
