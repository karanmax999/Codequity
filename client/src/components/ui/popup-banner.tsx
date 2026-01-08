import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ArrowRight, Box, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import codeQuityLogo from "@assets/codequity-logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Trigger popup after a delay, ONLY if not shown before
    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("codequity_popup_seen");

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                localStorage.setItem("codequity_popup_seen", "true");
            }, 2000); // 2 second delay

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isVisible && bannerRef.current) {
            const ctx = gsap.context(() => {
                // Entrance Animation
                const tl = gsap.timeline();

                // 1. Backdrop Fade In
                tl.fromTo(".popup-backdrop",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );

                // 2. Banner Scale & Fade In
                tl.fromTo(bannerRef.current,
                    { scale: 0.8, opacity: 0, y: 50 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
                    "-=0.3"
                );

                // 3. Logo Spin & Entry
                tl.fromTo(".popup-logo",
                    { rotationY: -180, scale: 0, opacity: 0 },
                    { rotationY: 0, scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.75)" },
                    "-=0.5"
                );

                // 4. Text Typewriter / Stagger
                tl.fromTo(".popup-text",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );

                // 5. Button Pulse Loop
                gsap.to(".popup-btn", {
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                // 6. Floating shapes animation
                gsap.to(".floating-shape", {
                    y: "random(-15, 15)",
                    x: "random(-8, 8)",
                    rotation: "random(0, 360)",
                    duration: "random(3, 6)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

            }, bannerRef);

            return () => ctx.revert();
        }
    }, [isVisible]);

    const closePopup = () => {
        gsap.to(bannerRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            onComplete: () => setIsVisible(false)
        });
        gsap.to(".popup-backdrop", { opacity: 0, duration: 0.4 });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center isolate px-4">
                    {/* Backdrop */}
                    <motion.div
                        className="popup-backdrop absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                    />

                    {/* Main Card - Reduced Size & 80% Opacity */}
                    <div
                        ref={bannerRef}
                        className="relative w-full max-w-[350px] md:max-w-[400px] h-auto rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20"
                        style={{
                            // 80% opacity logic: using semi-transparent background colors
                            background: "linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(0, 31, 63, 0.85) 100%)",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        {/* Background Effects */}
                        <div ref={bgRef} className="absolute inset-0 pointer-events-none">
                            {/* Node Lines */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 50% 50%, #00D4FF 1px, transparent 1px)",
                                    backgroundSize: "20px 20px"
                                }}
                            />

                            {/* Glowing Orbs */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                            {/* Floating Shapes - Smaller */}
                            <Box className="floating-shape absolute top-10 left-6 text-cyan-500/30 w-8 h-8" />
                            <Hexagon className="floating-shape absolute bottom-20 right-6 text-blue-400/30 w-10 h-10" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-cyan-400 hover:text-white transition-colors backdrop-blur-sm"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Content Content */}
                        <div className="relative z-10 p-6 flex flex-col items-center text-center">

                            {/* Logo Section */}
                            <div className="mt-4 mb-5 relative">
                                <div className="absolute inset-0 bg-cyan-500 blur-[30px] opacity-20 animate-pulse"></div>
                                <div className="popup-logo w-16 h-16 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(0,212,255,0.3)] backdrop-blur-md">
                                    <img src={codeQuityLogo} alt="CodeQuity" className="w-10 h-10 object-contain" />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-3 mb-6">
                                <h2 className="popup-text text-2xl font-bold font-sans text-white leading-tight drop-shadow-lg">
                                    India's <span className="text-cyan-400">Web3</span><br />Startup Launchpad
                                </h2>

                                <h3 className="popup-text text-sm text-cyan-200 font-medium tracking-wide">
                                    From Hackathon Repo to On-Chain Revenue
                                </h3>

                                <p className="popup-text text-gray-300 text-xs leading-relaxed max-w-xs mx-auto pt-1">
                                    Connect with 1k+ Devs & Ship
                                </p>
                            </div>

                            {/* CTA Button */}
                            <Button
                                asChild
                                className="popup-btn w-full py-5 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all transform mb-2"
                            >
                                <a href="https://t.me/codequiity" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    JOIN NOW <ArrowRight className="w-4 h-4" />
                                </a>
                            </Button>

                            <div className="popup-text text-[10px] text-white/30 font-mono">
                                LIMITED SPOTS FOR COHORT 3
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
