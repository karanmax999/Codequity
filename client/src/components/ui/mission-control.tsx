import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Hexagon, Shield, Zap, Globe, Cpu, Database, Twitter, MessageCircle, FileText, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MetalButton } from "@/components/ui/liquid-glass-button";

interface MissionControlProps {
    isOpen: boolean;
    onClose: () => void;
}

const WEEKS = 48;
const GRID_COLS = 8;

interface WeekData {
    week: number;
    status: "completed" | "active" | "locked";
    ecosystem: string;
    category: string;
    description: string;
    socials: {
        twitter?: string;
        discord?: string;
        website?: string;
    };
    resources: {
        label: string;
        url: string;
        type: "doc" | "blog" | "code";
    }[];
}

// Simulated data for the grid
const WEEK_DATA: WeekData[] = Array.from({ length: WEEKS }, (_, i) => {
    const weekNum = i + 1;
    let status: "completed" | "active" | "locked" = "locked";
    if (weekNum < 1) status = "completed";
    if (weekNum === 1) status = "active"; // Week 1 is active

    // Placeholder ecosystem names for demo
    const ecosystems = [
        "Ethereum", "Solana", "Polygon", "Arbitrum",
        "Optimism", "Avalanche", "Base", "ZkSync",
        "Starknet", "Scroll", "Lineap", "Mantle",
        "Monad", "Berachain", "Sui", "Aptos"
    ];

    const ecosystem = ecosystems[i] || `Protocol-${weekNum}`;

    return {
        week: weekNum,
        status,
        ecosystem,
        category: i < 8 ? "L1/L2 Foundation" : i < 16 ? "ZK Rollups" : "App Chains",
        description: `Master the ${ecosystem} ecosystem. Build and deploy a production-ready dApp using native tooling. Focus on high-throughput architecture and state management.`,
        socials: {
            twitter: "#",
            discord: "#",
            website: "#"
        },
        resources: [
            { label: "Documentation", url: "#", type: "doc" },
            { label: "Developer Guide", url: "#", type: "blog" },
            { label: "Starter Kit", url: "#", type: "code" }
        ]
    };
});

export function MissionControl({ isOpen, onClose }: MissionControlProps) {
    const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

    // Determine which data to show: Selection takes priority, then Hover, then Default (Week 1)
    const activeData = selectedWeek
        ? WEEK_DATA[selectedWeek - 1]
        : hoveredWeek
            ? WEEK_DATA[hoveredWeek - 1]
            : WEEK_DATA[0];

    const isLocked = !!selectedWeek;

    const handleNodeClick = (week: number) => {
        if (selectedWeek === week) {
            setSelectedWeek(null); // Unlock if clicking same node
        } else {
            setSelectedWeek(week); // Lock new node
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 background-scanlines"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Gradient Background Effect matching Hero */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black opacity-90 pointer-events-none" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

                    {/* Main Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="relative w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(168,85,247,0.15)]"
                    >
                        {/* Header / HUD Top */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-600" />
                            <div className="flex items-center gap-4">
                                <div className={cn("w-3 h-3 rounded-full transition-all duration-300", isLocked ? "bg-red-500 animate-none shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-purple-500 animate-pulse")} />
                                <h2 className="font-orbitron font-bold text-xl tracking-widest text-white uppercase flex items-center gap-2">
                                    Mission Control <span className="text-gray-600">//</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">48-WEEK PROTOCOL</span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

                            {/* Left: The Grid */}
                            <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative z-10 flex flex-col">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Select a Node to Lock Target</div>
                                    <div className="flex gap-4 text-[10px] font-mono uppercase text-gray-600">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Active</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-white/30"></div> Locked</div>
                                    </div>
                                </div>
                                <div
                                    className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 content-start"
                                >
                                    {WEEK_DATA.map((item) => {
                                        const isSelected = selectedWeek === item.week;
                                        return (
                                            <motion.button
                                                key={item.week}
                                                onClick={() => handleNodeClick(item.week)}
                                                onMouseEnter={() => setHoveredWeek(item.week)}
                                                onMouseLeave={() => setHoveredWeek(null)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={cn(
                                                    "aspect-square rounded-xl border flex flex-col items-center justify-center relative group transition-all duration-300",
                                                    isSelected
                                                        ? "bg-purple-500/30 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10"
                                                        : item.status === "active"
                                                            ? "bg-purple-900/20 border-purple-500/50 text-white"
                                                            : "bg-white/5 border-white/10 text-gray-600 hover:border-white/30 hover:bg-white/10"
                                                )}
                                            >
                                                {isSelected && (
                                                    <div className="absolute -inset-[1px] border-2 border-purple-400 rounded-xl animate-pulse" />
                                                )}
                                                {item.status === "active" && !isSelected && (
                                                    <div className="absolute inset-0 bg-purple-500/10 animate-pulse rounded-xl" />
                                                )}

                                                <span className={cn(
                                                    "text-xs font-mono mb-1",
                                                    isSelected || item.status === "active" ? "text-purple-200" : "text-gray-600 group-hover:text-gray-400"
                                                )}>
                                                    WK{item.week}
                                                </span>

                                                {item.status === "locked" ? (
                                                    <Lock className="w-4 h-4 opacity-50" />
                                                ) : (
                                                    <Hexagon className={cn("w-4 h-4", (isSelected || item.status === "active") && "text-purple-400")} />
                                                )}
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Right: Info Panel / HUD Sidebar */}
                            <div className="w-full md:w-[420px] bg-black/60 border-l border-white/10 p-8 flex flex-col relative shrink-0">
                                {/* Scanline overlay for sidebar */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none opacity-20 bg-[length:100%_4px,3px_100%]" />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Status Header */}
                                    <div className="mb-8 border-b border-white/10 pb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">Target Designation</h3>
                                            {isLocked ? (
                                                <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono animate-pulse">LOCKED</span>
                                            ) : (
                                                <span className="text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded font-mono">SCANNING</span>
                                            )}
                                        </div>
                                        <div className="text-4xl font-orbitron font-bold text-white mb-2">
                                            {activeData.ecosystem}
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-400 font-mono text-sm">
                                            <Zap className="w-4 h-4" />
                                            {activeData.category}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-purple-500/30 pl-4">
                                            {activeData.description}
                                        </p>
                                    </div>

                                    {/* Resources & Links */}
                                    <div className="space-y-6 flex-1">

                                        {/* Socials */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <a href={activeData.socials.twitter} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group">
                                                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                                                <span className="text-sm text-gray-300">Twitter</span>
                                            </a>
                                            <a href={activeData.socials.website} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group">
                                                <Globe className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                                                <span className="text-sm text-gray-300">Website</span>
                                            </a>
                                        </div>

                                        {/* Deep Dive Resources */}
                                        <div>
                                            <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 flex items-center gap-2">
                                                <Database className="w-3 h-3" /> Intel Database
                                            </h4>
                                            <div className="space-y-2">
                                                {activeData.resources.map((res, idx) => (
                                                    <a key={idx} href={res.url} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
                                                        <div className="flex items-center gap-3">
                                                            {res.type === 'doc' && <BookOpen className="w-4 h-4 text-purple-400" />}
                                                            {res.type === 'blog' && <FileText className="w-4 h-4 text-blue-400" />}
                                                            {res.type === 'code' && <Cpu className="w-4 h-4 text-green-400" />}
                                                            <span className="text-sm text-gray-300 group-hover:text-white">{res.label}</span>
                                                        </div>
                                                        <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-purple-400 transition-colors" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer action */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <MetalButton variant="primary" className="w-full text-sm py-4" as="div">
                                            INITIALIZE PROTOCOL <ChevronRight className="ml-2 w-4 h-4" />
                                        </MetalButton>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer HUD gradient line */}
                        <div className="h-2 bg-gradient-to-r from-purple-900 via-blue-500 to-purple-900" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
