import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function IndiaNetworkMap() {
    const nodes = [
        { id: "delhi", x: 37, y: 28, label: "Delhi NCR" },
        { id: "mumbai", x: 18, y: 60, label: "Mumbai" },
        { id: "bangalore", x: 33, y: 80, label: "Bangalore" },
        { id: "kolkata", x: 68, y: 52, label: "Kolkata" },
        { id: "hyderabad", x: 40, y: 68, label: "Hyderabad" },
        { id: "chennai", x: 43, y: 82, label: "Chennai" },
        { id: "pune", x: 22, y: 63, label: "Pune" },
        { id: "ahmedabad", x: 16, y: 48, label: "Ahmedabad" },
        { id: "jaipur", x: 25, y: 35, label: "Jaipur" },
        { id: "lucknow", x: 45, y: 35, label: "Lucknow" },
        { id: "guwahati", x: 80, y: 40, label: "Guwahati" },
        { id: "kochi", x: 30, y: 88, label: "Kochi" },
    ];

    const connections = [
        ["delhi", "mumbai"],
        ["delhi", "kolkata"],
        ["delhi", "jaipur"],
        ["delhi", "lucknow"],
        ["mumbai", "bangalore"],
        ["mumbai", "pune"],
        ["mumbai", "ahmedabad"],
        ["bangalore", "chennai"],
        ["bangalore", "kochi"],
        ["chennai", "hyderabad"],
        ["hyderabad", "mumbai"],
        ["hyderabad", "kolkata"],
        ["kolkata", "guwahati"],
        ["lucknow", "kolkata"],
    ];

    // Stylized Polygon Points for India (Approximate Tech-Map)
    const mapPolygon = "37,2 25,12 15,25 2,45 15,65 33,98 43,90 52,70 65,58 72,50 78,40 90,25 98,35 88,48 75,52 68,55 60,45 50,30 37,2";

    return (
        <div className="relative w-full h-full bg-[#050510] overflow-hidden rounded-3xl border border-white/5 shadow-2xl skew-x-3 transform-style-3d group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* Abstract Map Containment Field */}
            <div className="absolute inset-4 border border-primary/10 rounded-2xl opacity-50" />

            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full max-w-lg max-h-[80vh] aspect-[3/4]">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                        <defs>
                            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)" />
                                <stop offset="100%" stopColor="rgba(0, 212, 255, 0.05)" />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
                                <stop offset="50%" stopColor="rgba(0, 212, 255, 0.6)" />
                                <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
                            </linearGradient>
                        </defs>

                        {/* India Silhouette */}
                        <polygon
                            points={mapPolygon}
                            fill="url(#mapGradient)"
                            stroke="rgba(0, 212, 255, 0.3)"
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Connections */}
                        {connections.map(([start, end], i) => {
                            const startNode = nodes.find(n => n.id === start)!;
                            const endNode = nodes.find(n => n.id === end)!;
                            return (
                                <motion.line
                                    key={i}
                                    x1={startNode.x}
                                    y1={startNode.y}
                                    x2={endNode.x}
                                    y2={endNode.y}
                                    stroke="url(#lineGradient)"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                />
                            );
                        })}

                        {/* Nodes */}
                        {nodes.map((node, i) => (
                            <g key={node.id}>
                                <circle cx={node.x} cy={node.y} r="1" fill="#00D4FF" className="animate-pulse">
                                </circle>
                                <circle cx={node.x} cy={node.y} r="3" fill="rgba(0, 212, 255, 0.2)" className="animate-ping" opacity="0.5">
                                </circle>
                            </g>
                        ))}
                    </svg>

                    {/* Tooltips (HTML overlay for better text rendering) */}
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                            <div className="w-4 h-4" /> {/* Hit area */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-black/80 border border-primary/30 rounded text-[8px] font-mono text-primary opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                {node.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Status Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="text-xs font-mono text-gray-500">
                    <div>NETWORK_STATUS: <span className="text-green-500">ONLINE</span></div>
                    <div>NODES_ACTIVE: <span className="text-green-500">{nodes.length}</span></div>
                </div>
                <div className="w-24 h-24 border border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite] opacity-30"></div>
            </div>
        </div>
    );
}
