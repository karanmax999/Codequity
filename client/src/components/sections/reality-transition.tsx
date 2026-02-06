import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import transitionCity from "@/assets/transition-city.jpg";

export default function RealityTransition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
    const textY = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[500px] overflow-hidden z-0 bg-black"
            style={{ position: "relative" }}
        >
            {/* Background Parallax Image */}
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 w-full h-[120%]"
            >
                <img
                    src={transitionCity}
                    alt="Future City"
                    className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

                {/* Animated Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-20"
                    style={{
                        backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                        backgroundSize: "100% 2px, 3px 100%"
                    }}
                />
            </motion.div>

            {/* Noise Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-30 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
                <motion.div
                    style={{ y: textY }}
                    className="relative text-center px-6"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-primary to-transparent opacity-50" />

                    <h2 className="text-3xl xs:text-4xl sm:text-7xl md:text-9xl font-orbitron font-black tracking-tighter text-white">
                        <span className="relative inline-block">
                            {/* Stroke Text Reveal */}
                            <span className="absolute inset-0 text-transparent border-white/10 [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] select-none">
                                THE REALITY
                            </span>
                            {/* Foreground Gradient Text */}
                            <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                THE REALITY
                            </span>
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-[10px] md:text-sm font-orbitron tracking-[0.2em] sm:tracking-[0.5em] text-primary/60 uppercase font-bold text-center"
                    >
                        Phase 01 /// Foundries & Forges
                    </motion.p>

                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary to-transparent opacity-50" />
                </motion.div>
            </div>

            {/* Bottom Glass Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
        </div>
    );
}
