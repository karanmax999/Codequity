import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Users, Zap, Star, Globe, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const trustMetrics = [
    { value: "500+", label: "Builders" },
    { value: "15+", label: "Products" },
    { value: "₹2Cr+", label: "Raised" },
    { value: "8+", label: "Funded" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for elements to mount then animate
      gsap.delayedCall(0.1, () => {
        // Advanced logo entrance animation
        const tl = gsap.timeline();

        tl.to(".logo-brackets", {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
          .to(".logo-text", {
            y: 0,
            opacity: 1,
            letterSpacing: "0px",
            duration: 1.2,
            ease: "power4.out"
          }, "-=0.8")
          .to(".hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }, "-=0.5")
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
          }, "-=0.2")
          .from(".trust-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.5");

        // Continuous floating animation for particles
        gsap.to(".floating-particle", {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          rotation: "random(0, 360)",
          scale: "random(0.5, 1.5)",
          duration: "random(3, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            amount: 4,
            from: "random"
          }
        });

        // Logo breathing effect (after initial animation)
        gsap.delayedCall(2, () => {
          gsap.to(".logo-brackets", {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });

        // Parallax effect on scroll
        gsap.to(".parallax-bg", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20 pb-20 md:pb-32"
      data-testid="hero-section"
    >
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

      {/* Advanced Particle System */}
      <div className="absolute inset-0 pointer-events-none" ref={particlesRef}>
        {[...Array(50)].map((_, i) => (
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

      <div className="container mx-auto px-6 text-center relative z-10 flex-grow flex flex-col justify-center">

        {/* Enhanced Animated Logo */}
        <div
          ref={logoRef}
          className="mb-8"
          data-testid="animated-logo"
        >
          <div className="logo-brackets text-8xl md:text-9xl font-orbitron font-black gradient-text mb-4 glow-text drop-shadow-2xl">
            <img
              src={codeQuityLogo}
              alt="CodeQuity Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto"
            />
          </div>
          <h1 className="logo-text text-4xl md:text-6xl font-orbitron font-bold mb-4">
            CODE<span className="gradient-text">QUITY</span>
          </h1>
        </div>

        {/* Enhanced Hero Content */}
        <div ref={contentRef} data-testid="hero-content">
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto font-medium">
            India's Web3 Startup Foundry
          </p>
          <h2 className="hero-description text-2xl md:text-3xl font-medium mb-10 max-w-4xl mx-auto leading-relaxed">
            From Hackathon Repo to{" "}
            <span className="gradient-text font-semibold">On-Chain Revenue</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch md:items-center max-w-2xl mx-auto mb-16">
            <Button
              asChild
              className="hero-buttons flex-1 h-auto py-4 bg-primary text-primary-foreground hover:bg-primary/90 neon-border animate-glow group relative overflow-hidden"
              data-testid="button-apply-cohort"
            >
              <a href="/apply" className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Rocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  Apply for Cohort 3
                </div>
                <span className="text-xs opacity-90 font-light tracking-wide">Limited Spots Available</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="hero-buttons flex-1 h-auto py-4 border-primary/50 text-primary hover:bg-primary/5 hover:border-primary neon-border group relative overflow-hidden"
              data-testid="button-watch-demo"
            >
              <a href="https://www.youtube.com/@CodeQuity" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Watch Demo Day
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary/90 font-light tracking-wide">See what we ship</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Band */}
      <div className="w-full bg-black/40 backdrop-blur-md border-t border-white/5 py-8 relative z-10 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {trustMetrics.map((metric, i) => (
              <div key={i} className="trust-item relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/0 border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-primary/50 transition-all duration-500 backdrop-blur-md group-hover:bg-white/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10 text-3xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 group-hover:from-white group-hover:to-primary transition-all duration-300">
                    {metric.value}
                  </div>
                  <div className="relative z-10 text-sm text-gray-400 uppercase tracking-widest font-bold mt-2 group-hover:text-white transition-colors">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 text-4xl text-primary/40"
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
        className="absolute top-1/3 right-10 text-3xl text-accent/40"
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
        className="absolute bottom-1/4 left-1/4 text-5xl text-primary/30"
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
        className="absolute top-3/4 right-1/4 text-3xl text-accent/30"
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
