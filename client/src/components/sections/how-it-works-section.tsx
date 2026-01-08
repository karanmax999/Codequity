import { useLayoutEffect, useRef } from "react";
import { Code, Rocket, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const steps = [
        {
            id: 1,
            title: "On-Chain Hackathon",
            icon: Code,
            tags: ["48 hours", "Prototype", "$5K prizes"],
            description: "Ship a testnet MVP, validate the problem, and define your first users.",
            color: "text-blue-400",
            bgFrom: "from-blue-500/20",
            bgTo: "to-blue-600/5",
            border: "border-blue-500/30",
            shadow: "shadow-blue-500/20",
        },
        {
            id: 2,
            title: "Shipping Sprint",
            icon: Rocket,
            tags: ["6 weeks", "Mainnet", "Mentorship"],
            description: "Launch on mainnet, onboard 100+ beta users, and refine audited contracts.",
            color: "text-purple-400",
            bgFrom: "from-purple-500/20",
            bgTo: "to-purple-600/5",
            border: "border-purple-500/30",
            shadow: "shadow-purple-500/20",
        },
        {
            id: 3,
            title: "Funding Day",
            icon: Trophy,
            tags: ["1 day", "Top teams", "Investment"],
            description: "Pitch to VCs and accelerators and raise seed capital.",
            color: "text-amber-400",
            bgFrom: "from-amber-500/20",
            bgTo: "to-amber-600/5",
            border: "border-amber-500/30",
            shadow: "shadow-amber-500/20",
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Sequential Card Reveal
            gsap.from(".pipeline-card", {
                scrollTrigger: {
                    trigger: ".pipeline-section",
                    start: "top 70%",
                    end: "top 30%",
                    scrub: 1.5,
                },
                y: 120,
                opacity: 0,
                scale: 0.85,
                rotateX: 15,
                stagger: 0.3,
                ease: "power3.out"
            });

            // Progress Line Animation
            gsap.fromTo(".progress-line-fill",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".pipeline-section",
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );

            // Number Badge Pop-in
            gsap.from(".number-badge", {
                scrollTrigger: {
                    trigger: ".pipeline-section",
                    start: "top 60%",
                    end: "top 20%",
                    scrub: 1,
                },
                scale: 0,
                rotation: -180,
                opacity: 0,
                stagger: 0.3,
                ease: "back.out(1.7)"
            });

            // 3D Tilt Effect
            cardsRef.current.forEach((card) => {
                if (!card) return;

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    gsap.to(card, {
                        rotateY: x * 10,
                        rotateX: -y * 10,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-black pipeline-section" id="how-it-works">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-5xl font-orbitron font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Works</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        From idea to investment in three high-intensity stages.
                    </motion.p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30 rounded-full z-0 overflow-hidden">
                        {/* Progress Animation */}
                        <div className="progress-line-fill absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 origin-left" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={el => cardsRef.current[index] = el}
                                className="relative z-10 pipeline-card preserve-3d"
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                            >
                                {/* Number Badge */}
                                <div className="number-badge absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center font-orbitron font-bold text-muted-foreground z-20 shadow-lg">
                                    {step.id}
                                </div>

                                <div
                                    className={cn(
                                        "h-full p-1 rounded-2xl bg-gradient-to-b transition-all duration-300 md:group-hover:-translate-y-2", // Removed group hover transform here as GSAP handles it, but keeping subtle CSS transitions for other props
                                        step.bgFrom,
                                        "to-transparent"
                                    )}
                                >
                                    <div className={cn(
                                        "h-full bg-black/80 backdrop-blur-xl rounded-xl p-8 border transition-colors",
                                        "border-white/5",
                                        // "group-hover:" + step.border // This string concatenation approach had issues, using simpler template literal
                                        `hover:${step.border} border-opacity-50 hover:border-opacity-100`
                                    )}>
                                        {/* Header: Icon + Title */}
                                        <div className="flex flex-col items-center text-center mb-6">
                                            <div className={cn(
                                                "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-background border shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-500",
                                                "border-white/10",
                                                // `group-hover:${step.shadow} group-hover:border-${step.color.split('-')[1]}-500/50`
                                            )}>
                                                <step.icon className={cn("w-10 h-10", step.color)} />
                                            </div>

                                            <h3 className="text-2xl font-orbitron font-bold mb-3">{step.title}</h3>

                                            {/* Tags */}
                                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                                {step.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={cn(
                                                            "text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 border border-white/5",
                                                            step.color
                                                        )}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-center leading-relaxed mb-6">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
