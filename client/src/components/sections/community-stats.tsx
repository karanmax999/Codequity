import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Lightbulb, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".stats-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Stats counter animation
      gsap.from(".stat-number", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });

      // Feature cards with magnetic hover effect
      gsap.set(".feature-card", {
        transformOrigin: "center center"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "6+", label: "Major Events" },
    { value: "25+", label: "Indian States" },
    { value: "10+", label: "Countries" },
  ];

  const features = [
    {
      icon: Code,
      title: "Connect",
      description: "Connect with developers across India and beyond through our vibrant community platforms.",
    },
    {
      icon: Lightbulb,
      title: "Inspire",
      description: "Get inspired through cutting-edge tech events, workshops, and learning experiences.",
    },
    {
      icon: GraduationCap,
      title: "Educate",
      description: "Learn with hands-on experiences and empower the next generation of tech leaders.",
    },
  ];

  return (
    <section id="community" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-card" data-testid="community-stats-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="stats-title text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Our <span className="gradient-text">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join India's fastest-growing tech community that brings together passionate hackers, 
            innovative developers, creative designers, and visionary entrepreneurs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card neon-border rounded-xl p-8 text-center hover:scale-110 transition-transform duration-300"
              data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="stat-number text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-lg font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card neon-border rounded-xl p-8 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:rotate-1"
              data-testid={`feature-card-${feature.title.toLowerCase()}`}
            >
              <div className="text-3xl text-primary mb-4 transform hover:scale-110 transition-transform duration-300">
                <feature.icon />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
