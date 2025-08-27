import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const content = contentRef.current;

    if (logo && content) {
      // GSAP-style animations with Framer Motion
      setTimeout(() => {
        logo.style.opacity = "1";
        logo.style.transform = "scale(1)";
        logo.style.transition = "all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }, 100);

      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
        content.style.transition = "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      }, 1000);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        
        {/* Animated Logo */}
        <div
          ref={logoRef}
          className="logo-container mb-8"
          data-testid="animated-logo"
        >
          <div className="text-8xl md:text-9xl font-orbitron font-black gradient-text mb-4 glow-text">
            {"{}"}
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            CODE<span className="gradient-text">QUITY</span>
          </h1>
        </div>

        {/* Hero Content */}
        <div ref={contentRef} className="hero-content" data-testid="hero-content">
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
            India's Premier Tech Community
          </p>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 max-w-4xl mx-auto">
            Building India's Largest Tech Community Through{" "}
            <span className="gradient-text">Innovation</span>,{" "}
            <span className="gradient-text">Collaboration</span> &{" "}
            <span className="gradient-text">Excellence</span> 🇮🇳
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 neon-border animate-glow"
              data-testid="button-join-community"
            >
              Join Community
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary px-8 py-4 font-semibold hover:bg-primary/10 neon-border"
              data-testid="button-explore-events"
            >
              Explore Events
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 text-4xl text-primary/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        data-testid="floating-code-icon"
      >
        <Code />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-10 text-3xl text-accent/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        data-testid="floating-rocket-icon"
      >
        <Rocket />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 left-1/4 text-5xl text-primary/20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        data-testid="floating-users-icon"
      >
        <Users />
      </motion.div>
    </section>
  );
}
