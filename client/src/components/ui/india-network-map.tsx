import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function IndiaNetworkMap() {
    const nodes = [
        { id: "delhi", x: 31, y: 31, label: "Delhi NCR" },
        { id: "mumbai", x: 14, y: 62, label: "Mumbai" },
        { id: "bangalore", x: 31, y: 83, label: "Bangalore" },
        { id: "kolkata", x: 69, y: 52, label: "Kolkata" },
        { id: "hyderabad", x: 34, y: 69, label: "Hyderabad" },
        { id: "chennai", x: 41, y: 83, label: "Chennai" },
        { id: "pune", x: 18, y: 65, label: "Pune" },
        { id: "ahmedabad", x: 16, y: 50, label: "Ahmedabad" },
        { id: "jaipur", x: 26, y: 40, label: "Jaipur" },
    ];

    const connections = [
        ["delhi", "mumbai"],
        ["delhi", "kolkata"],
        ["mumbai", "bangalore"],
        ["bangalore", "chennai"],
        ["chennai", "hyderabad"],
        ["hyderabad", "mumbai"],
        ["kolkata", "hyderabad"],
        ["delhi", "jaipur"],
        ["mumbai", "pune"],
        ["mumbai", "ahmedabad"],
    ];

    return (
        <div className="relative w-full h-full bg-[#050510] overflow-hidden rounded-3xl border border-white/5 shadow-2xl skew-x-3 transform-style-3d group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* Abstract Map Containment Field */}
            <div className="absolute inset-4 border border-primary/10 rounded-2xl opacity-50" />

            {/* Network Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(([start, end], i) => {
                    const startNode = nodes.find(n => n.id === start)!;
                    const endNode = nodes.find(n => n.id === end)!;
                    return (
                        <motion.line
                            key={i}
                            x1={`${startNode.x}%`}
                            y1={`${startNode.y}%`}
                            x2={`${endNode.x}%`}
                            y2={`${endNode.y}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.4 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    );
                })}
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
                        <stop offset="50%" stopColor="rgba(0, 212, 255, 0.5)" />
                        <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
                <div
                    key={node.id}
                    className="absolute"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    {/* Pulse Effect */}
                    <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping opacity-75" />

                    {/* Node Point */}
                    <div className="relative w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--primary)] z-10 hover:scale-150 transition-transform cursor-pointer group/node">
                        {/* Tooltip Label */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 border border-primary/30 rounded text-xs font-mono text-primary opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {node.label}
                        </div>
                    </div>
                </div>
            ))}

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
