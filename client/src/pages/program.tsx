import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Rocket, Shield, Zap, Users, Code, Trophy, Target, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Program() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const stars1Ref = useRef<HTMLDivElement>(null);
    const stars2Ref = useRef<HTMLDivElement>(null);
    const stars3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".vibe-fade", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".vibe-section",
                    start: "top 80%",
                }
            });

            gsap.from(".loot-card", {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".loot-grid",
                    start: "top 85%",
                }
            });

            // Multi-Layer Parallax on Scroll
            gsap.to(stars1Ref.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(stars2Ref.current, {
                yPercent: 40,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(stars3Ref.current, {
                yPercent: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Continuous floating animation for particles
            gsap.to(".floating-particle", {
                y: "random(-50, 50)",
                x: "random(-50, 50)",
                rotation: "random(0, 360)",
                duration: "random(3, 8)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Helper to generate random stars for a layer
    const renderStars = (count: number, sizeRange: [number, number], opacity: number) => (
        [...Array(count)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`,
                    height: `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`,
                    opacity: Math.random() * opacity + 0.1,
                }}
            />
        ))
    );

    const milestones = [
        {
            title: "The Spark",
            subtitle: "On-Chain Hackathon",
            desc: "48 Hours. Coffee. Code. Chaos. You build the MVP. We provide the pizza and prizes.",
            icon: Zap,
            color: "text-yellow-400",
            border: "border-yellow-400/20",
            bg: "bg-yellow-400/10"
        },
        {
            title: "The Grind",
            subtitle: "6-Week Cohort",
            desc: "No lectures. Just shipping. Weekly sprints, code reviews, and getting your first 100 users.",
            icon: Code,
            color: "text-blue-400",
            border: "border-blue-400/20",
            bg: "bg-blue-400/10"
        },
        {
            title: "The Glory",
            subtitle: "Demo Day",
            desc: "Pitch to a room full of VCs, Whales, and Degens. Raise capital. Go to moon.",
            icon: Rocket,
            color: "text-purple-400",
            border: "border-purple-400/20",
            bg: "bg-purple-400/10"
        }
    ];

    const loot = [
        { title: "$50k+ Infra Credits", desc: "AWS, Google Cloud, QuickNode credits so you never pay for gas.", icon: Gem },
        { title: "Based Mentors", desc: "Direct access to founders who have actually exited.", icon: Users },
        { title: "Audit Support", desc: "Don't get rekt. Subsidized security audits for top teams.", icon: Shield },
        { title: "VC Network", desc: "Direct intro to 50+ VCs. No warm intros needed.", icon: Trophy },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans" ref={containerRef}>
            <Navigation />

            {/* Hero: High Energy */}
            <div
                ref={heroRef}
                className="relative overflow-hidden pt-32 pb-32 hero-bg circuit-pattern"
            >
                {/* Parallax Background Layers */}
                <div ref={stars1Ref} className="absolute inset-0 pointer-events-none z-0">
                    {renderStars(50, [1, 2], 0.3)}
                </div>
                <div ref={stars2Ref} className="absolute inset-0 pointer-events-none z-0">
                    {renderStars(30, [2, 3], 0.5)}
                </div>
                <div ref={stars3Ref} className="absolute inset-0 pointer-events-none z-0">
                    {renderStars(15, [3, 4], 0.7)}
                </div>

                {/* Floating Particles (Decorations) */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="floating-particle absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-sm"></div>
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-0"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-bold tracking-widest uppercase text-white/80">System Online</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black font-orbitron mb-8 tracking-tighter uppercase relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Build.</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/50">Ship.</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-900">Raise.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
                        Not a school. A launchpad for the next generation of Web3 unicorns.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <Button asChild className="h-16 px-10 text-xl font-bold bg-white text-black hover:bg-gray-200 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            <a href="/apply">Start the Game</a>
                        </Button>

                        <Button asChild variant="ghost" className="h-16 px-8 text-xl font-semibold border border-white/10 rounded-full">
                            <a href="/program/initiative">48w × 48 Chains Initiative</a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* The Journey (Replacing Curriculum) */}
            <section className="py-24 vibe-section border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-20 text-center uppercase tracking-wider">
                        The <span className="text-primary">Meta</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 via-blue-500 to-purple-500 -z-10 opacity-30 dashed-line" />

                        {milestones.map((item, index) => (
                            <div key={index} className="vibe-fade group relative">
                                <div className={`absolute inset-0 ${item.bg} blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                                <div className="bg-black border border-white/10 p-8 rounded-3xl h-full hover:border-white/30 transition-all duration-300 hover:-translate-y-2">
                                    <div className={`w-16 h-16 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-6 mx-auto`}>
                                        <item.icon className={`w-8 h-8 ${item.color}`} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-3xl font-black font-orbitron mb-2 uppercase">{item.title}</h3>
                                        <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.color}`}>{item.subtitle}</div>
                                        <p className="text-gray-400 leading-relaxed font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Loot (Perks) */}
            <section className="py-24 bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-16 text-center uppercase tracking-wider">
                        Quest <span className="text-purple-400">Rewards</span>
                    </h2>

                    <div className="loot-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loot.map((item, i) => (
                            <div key={i} className="loot-card p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-purple-500/30">
                                <item.icon className="w-12 h-12 text-white/50 mb-6 group-hover:text-purple-400 transition-colors" />
                                <h3 className="text-2xl font-bold mb-3 font-orbitron">{item.title}</h3>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-2xl font-bold mb-8 text-white/80">Ready to build the future?</p>
                        <Button asChild className="h-14 px-12 text-lg font-bold bg-primary text-black hover:bg-primary/90 rounded-full animate-pulse shadow-[0_0_20px_rgba(var(--primary),0.5)]">
                            <a href="/apply">Join the Guild</a>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
