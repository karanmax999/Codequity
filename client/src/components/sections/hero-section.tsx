import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Users, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-1.5 hero-word">
          {word}
        </span>
      ))}
    </span>
  );
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Refs for parallax layers
  const stars1Ref = useRef<HTMLDivElement>(null);
  const stars2Ref = useRef<HTMLDivElement>(null);
  const stars3Ref = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for elements to mount then animate
      gsap.delayedCall(0.1, () => {
        const tl = gsap.timeline();

        tl.from(".hero-word", {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)"
        })
          .to(".hero-description", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }, "-=0.3")
          .to(".hero-buttons", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }, "-=0.2");

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

        // Multi-Layer Parallax on Scroll
        // Layer 1: Slowest
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

        // Layer 2: Medium
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

        // Layer 3: Fastest (Foreground-ish)
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

      });

    }, heroRef);

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

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-32 pb-32"
      data-testid="hero-section"
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

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-0"></div>

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

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        <div ref={contentRef} data-testid="hero-content" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="col-span-1 lg:col-span-8 text-left">
            <h1 className="hero-statement text-4xl sm:text-6xl md:text-8xl font-orbitron font-black leading-none md:leading-[0.9] tracking-tighter uppercase text-white mb-6 md:mb-8 max-w-full">
              <AnimatedText
                text="we  back  bold  entrepreneurs  building  the  next  internet"
                className="text-white bg-transparent whitespace-normal"
              />
            </h1>

            <h2 className="hero-description text-lg md:text-3xl text-gray-400 font-medium mb-8 md:mb-12 max-w-2xl leading-relaxed opacity-0">
              From Hackathon Repo to{" "}
              <span className="text-white font-semibold">On-Chain Revenue</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-start items-stretch sm:items-center hero-buttons opacity-0">
              <Button
                asChild
                className="h-auto py-4 sm:py-6 px-6 sm:px-8 bg-white text-black hover:bg-white/90 font-orbitron uppercase tracking-wider text-xs sm:text-sm font-bold skew-x-[-10deg] hover:skew-x-[-10deg] transition-all"
              >
                <a href="/apply" className="flex items-center gap-2 skew-x-[10deg]">
                  Start Building
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-auto py-4 sm:py-6 px-6 sm:px-8 border-white/20 text-white hover:bg-white/10 font-orbitron uppercase tracking-wider text-xs sm:text-sm font-bold skew-x-[-10deg] hover:skew-x-[-10deg] transition-all"
                data-testid="button-community"
              >
                <a href="/community" className="flex items-center gap-2 skew-x-[10deg]">
                  Community
                  <Users className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right column for spacing/visuals (empty for now to show background) */}
          <div className="col-span-1 lg:col-span-4 h-full min-h-[40vh]"></div>
        </div>
      </div>



      {/* Enhanced Floating Elements */}
      <motion.div
        className="hidden md:block absolute top-1/4 left-10 text-4xl text-primary/40"
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        data-testid="floating-code-icon"
      >
        <Code className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-1/3 right-10 text-3xl text-accent/40"
        animate={{
          y: [-12, 12, -12],
          x: [-3, 3, -3],
          rotate: [5, -5, 5]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        data-testid="floating-rocket-icon"
      >
        <Rocket className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute bottom-1/4 left-1/4 text-5xl text-primary/30"
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
          rotate: [-3, 3, -3]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        data-testid="floating-users-icon"
      >
        <Users className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-3/4 right-1/4 text-3xl text-accent/30"
        animate={{
          y: [-10, 10, -10],
          x: [-8, 8, -8],
          rotate: [0, 360, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        data-testid="floating-zap-icon"
      >
        <Zap className="drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
