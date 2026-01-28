import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FileText, ArrowRight, Download, Share2, Shield, Rocket, Target, Users, TrendingUp, BarChart3, Map, Zap } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

const Section = ({ title, children, icon: Icon, delay = 0 }: { title: string, children: React.ReactNode, icon?: any, delay?: number }) => (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="mb-24 relative"
    >
        <div className="flex items-center gap-4 mb-8">
            {Icon && (
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
            )}
            <h2 className="text-3xl font-orbitron font-black uppercase tracking-tighter text-white">
                {title}
            </h2>
        </div>
        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed font-sans">
            {children}
        </div>
    </motion.section>
);

const Card = ({ title, value, unit, color = "text-primary" }: { title: string, value: string, unit?: string, color?: string }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all group">
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-hover:text-primary transition-colors">{title}</div>
        <div className={`text-3xl font-orbitron font-black ${color}`}>
            {value}{unit && <span className="text-sm ml-1 opacity-50 font-normal">{unit}</span>}
        </div>
    </div>
);

export default function Whitepaper() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 font-sans">
            <Helmet>
                <title>Whitepaper | CodeQuity Ecosystem</title>
                <meta name="description" content="Technical documentation and roadmap for CodeQuity - India's Web3 startup foundry." />
            </Helmet>
            <Navigation />

            <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-8">
                        <FileText className="w-3 h-3" /> Official Whitepaper v1.0
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                        FROM <span className="text-primary italic">REPO</span> TO <br />
                        ON-CHAIN <span className="text-primary italic">REVENUE</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium">
                        CodeEquity is the world's first developer-to-founder platform in Web3, transforming talent into on-chain entrepreneurship.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                            Share Concept
                        </button>
                        <a
                            href="https://relic-flannel-89e.notion.site/CodeEquity-Whitepaper-From-Hackathon-Repo-to-On-Chain-Revenue-9ddef4fdc0f640c99935d8d9bb4eab33?source=copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> View in Notion
                        </a>
                    </div>
                </motion.div>

                {/* 1. Executive Summary */}
                <Section title="Executive Summary" icon={Target}>
                    <p className="text-lg">CodeEquity bridges the gap between traditional development and Web3 execution. We transform talented developers into blockchain entrepreneurs through intensive, practical education and direct ecosystem access.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <Card title="Alumni Raised" value="$2.5" unit="M+" />
                        <Card title="Placement" value="85" unit="%" />
                        <Card title="Startups" value="15" unit="+" />
                        <Card title="Members" value="1,000" unit="+" />
                    </div>
                    <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl italic">
                        "By 2028: #1 Web3 developer platform. 10,000+ developers transformed. $500M+ ecosystem value created."
                    </div>
                </Section>

                {/* 2. The Problem */}
                <Section title="The Problem" icon={Shield}>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-orbitron text-xl mb-4">The Web3 Shortage</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Global Developers:</span> <span className="text-primary font-bold font-mono">27M</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Web3 Developers:</span> <span className="text-primary font-bold font-mono">30K (0.11%)</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Unfilled Roles:</span> <span className="text-primary font-bold font-mono">50,000+</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Salary Gap:</span> <span className="text-primary font-bold font-mono">+150%</span></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-white font-bold text-xs uppercase mb-2">Gap 1: Education</h4>
                                <p className="text-xs">Traditional universities have a 5+ year lag. Theory doesn't translate to production-grade shipping.</p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-white font-bold text-xs uppercase mb-2">Gap 2: Execution</h4>
                                <p className="text-xs">98% of hackathon projects die within 6 months. There is no long-term mentorship pipeline.</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 3. The Solution */}
                <Section title="48 Weeks, 48 Blockchains" icon={Zap}>
                    <p className="mb-8">A 48-week intensive program where developers learn 48 different blockchain networks, shipping real dApps weekly and presenting to VCs every Friday.</p>

                    <div className="space-y-4 mb-12">
                        <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="text-primary font-orbitron font-black text-xl">W1-12</div>
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs mb-1">EVM Powerhouses</h4>
                                <p className="text-xs text-gray-500">Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, zkSync, Scroll.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="text-primary font-orbitron font-black text-xl">W19-30</div>
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs mb-1">Alternative L1s</h4>
                                <p className="text-xs text-gray-500">Solana, Aptos, Sui, Near, Cosmos, Polkadot, Monad, Berachain.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="bg-white/10">
                                    <th className="p-4 font-orbitron uppercase">Day</th>
                                    <th className="p-4 font-orbitron uppercase">Focus</th>
                                    <th className="p-4 font-orbitron uppercase">Outcome</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr><td className="p-4 font-bold text-primary">Monday</td><td className="p-4">Intel Download</td><td className="p-4">Ecosystem Setup</td></tr>
                                <tr><td className="p-4 font-bold text-primary">Tue-Thu</td><td className="p-4">The Buildup</td><td className="p-4">Ship Real dApp</td></tr>
                                <tr><td className="p-4 font-bold text-primary">Friday</td><td className="p-4">Demo Day</td><td className="p-4">Pitch to VCs</td></tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* 4. Market Opportunity */}
                <Section title="Market Opportunity" icon={TrendingUp}>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-gray-500 text-[10px] uppercase font-black mb-2">Total TAM</div>
                            <div className="text-4xl font-orbitron font-black text-primary">$17B+</div>
                        </div>
                        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-gray-500 text-[10px] uppercase font-black mb-2">Growth Rate</div>
                            <div className="text-4xl font-orbitron font-black text-primary">200%</div>
                            <div className="text-[10px] text-gray-600 font-bold uppercase mt-1">YoY</div>
                        </div>
                        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-gray-500 text-[10px] uppercase font-black mb-2">SAM (Year 1)</div>
                            <div className="text-4xl font-orbitron font-black text-primary">₹500B+</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {["Bitcoin Mainstream", "L2 Explosion", "AI + Crypto", "Web3 Gaming"].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* 5. Business Model */}
                <Section title="Business Model" icon={BarChart3}>
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
                                <h3 className="text-white font-orbitron font-black uppercase text-sm mb-6 pb-4 border-b border-white/10">Revenue Streams</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-bold uppercase tracking-wider">Cohort Fees</span>
                                        <span className="text-primary font-orbitron font-black">40%</span>
                                    </li>
                                    <li className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-bold uppercase tracking-wider">Partnerships</span>
                                        <span className="text-primary font-orbitron font-black">30%</span>
                                    </li>
                                    <li className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-bold uppercase tracking-wider">Success Fees</span>
                                        <span className="text-primary font-orbitron font-black">20%</span>
                                    </li>
                                    <li className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-bold uppercase tracking-wider">Enterprise</span>
                                        <span className="text-primary font-orbitron font-black">10%</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-64 bg-primary p-8 rounded-3xl text-black flex flex-col justify-center">
                                <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Gross Margin</div>
                                <div className="text-6xl font-orbitron font-black leading-none">70%</div>
                                <div className="mt-4 text-[10px] font-bold uppercase max-w-[120px]">Scalable Unit Economics</div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 6. Traction */}
                <Section title="Traction & Validation" icon={TrendingUp}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-primary text-xl font-orbitron font-black">200+</div>
                            <div className="text-[9px] text-gray-600 uppercase font-black mt-1">Developers</div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-primary text-xl font-orbitron font-black">85%</div>
                            <div className="text-[9px] text-gray-600 uppercase font-black mt-1">Completion</div>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="text-primary text-xl font-orbitron font-black">9.2/10</div>
                            <div className="text-[9px] text-gray-600 uppercase font-black mt-1">NPS Score</div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <h4 className="text-white font-orbitron font-black uppercase text-xs mb-6">Alumni Success Spotlight</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="text-primary font-bold text-xs uppercase">DeFi Protocol X</div>
                                <p className="text-xs italic text-gray-500">"Raised $500K from Polychain post-program. Now live with $10M+ TVL."</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-primary font-bold text-xs uppercase">NFT Market Y</div>
                                <p className="text-xs italic text-gray-500">"Acquired by Tier-1 Infrastructure company 3 months after graduation."</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 9. Roadmap */}
                <Section title="The Road Ahead" icon={Map}>
                    <div className="relative pl-8 border-l border-white/10 space-y-12">
                        <div className="relative">
                            <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-[#050505]" />
                            <h4 className="text-white font-bold uppercase text-xs mb-2">Q1 2026: The Seed</h4>
                            <p className="text-xs text-gray-500">Close Round, Secure 5 blockchain partners, Launch Cohort 3 (500 devs).</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-white/20 border-4 border-[#050505]" />
                            <h4 className="text-white font-bold uppercase text-xs mb-2">Q2-Q3 2026: Scale</h4>
                            <p className="text-xs text-gray-500">1,000+ graduates, Global expansion (EU/APAC), Talent marketplace launch.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-white/20 border-4 border-[#050505]" />
                            <h4 className="text-white font-bold uppercase text-xs mb-2">2027: Dominance</h4>
                            <p className="text-xs text-gray-500">5,000+ developers, Profitability achieved, Series A fundraise.</p>
                        </div>
                    </div>
                </Section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 sm:p-12 md:p-20 bg-primary rounded-[2rem] sm:rounded-[3rem] text-black text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-orbitron font-black uppercase tracking-tighter mb-8 leading-none">
                        WANT TO BUILD <br /> THE MOAT?
                    </h2>
                    <p className="text-sm font-bold uppercase tracking-widest mb-12 opacity-70">
                        Join 1,000+ builders shaping the decentralized future.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/apply">
                            <button className="px-10 py-4 bg-black text-white font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-all">
                                Apply for Cohort 4
                            </button>
                        </Link>
                        <button className="px-10 py-4 border-2 border-black text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-black/10 transition-all flex items-center gap-2">
                            Investor Inquiry <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

// Helper Link component to handle wouter or plain anchor
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
    if (href.startsWith('/')) {
        return <a href={href} className={className}>{children}</a>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}
