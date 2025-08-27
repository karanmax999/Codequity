import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Users, Zap, Star, Globe } from "lucide-react";
import { motion } from "framer-motion";
import codeQuityLogo from "@assets/WhatsApp Image 2025-08-09 at 23.54.36_e9b4a964_1756273841031.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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
        }, "-=0.2");

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
      className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden"
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

      <div className="container mx-auto px-6 text-center relative z-10">
        
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
            India's Premier Tech Community
          </p>
          <h2 className="hero-description text-2xl md:text-3xl font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
            Building India's Largest Tech Community Through{" "}
            <span className="gradient-text font-semibold">Innovation</span>,{" "}
            <span className="gradient-text font-semibold">Collaboration</span> &{" "}
            <span className="gradient-text font-semibold">Excellence</span> 🇮🇳
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="hero-buttons bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 neon-border animate-glow transform hover:scale-105 transition-transform"
              data-testid="button-join-community"
            >
              <a href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" target="_blank" rel="noopener noreferrer">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="hero-buttons border-primary text-primary px-8 py-4 font-semibold hover:bg-primary/10 neon-border transform hover:scale-105 transition-transform"
              data-testid="button-explore-events"
            >
              <a href="https://luma.com/CodeConnect?k=c" target="_blank" rel="noopener noreferrer">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Events
              </a>
            </Button>
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
      <motion.div
        className="absolute top-1/2 left-16 text-2xl text-primary/20"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        data-testid="floating-star-icon"
      >
        <Star className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-16 text-4xl text-accent/25"
        animate={{ 
          y: [-18, 18, -18],
          rotate: [-10, 10, -10],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        data-testid="floating-globe-icon"
      >
        <Globe className="drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
