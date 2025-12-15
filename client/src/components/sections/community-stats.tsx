import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Lightbulb, GraduationCap, ArrowRight, Trophy, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

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

      // Pipeline Steps Animation
      gsap.from(".pipeline-step", {
        scrollTrigger: {
          trigger: ".pipeline-container",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
      });

      // Founder Stories Animation
      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: ".stories-grid",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pipelineSteps = [
    {
      icon: Code,
      step: "01",
      title: "On-Chain Hackathon",
      description: "Build MVP on testnet. Define problem & users.",
      details: "48 Hours • Prototype • $5K Prizes",
      example: "Ex: AlgoRhythm built a music NFT demo in 48h.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      icon: Rocket,
      step: "02",
      title: "Shipping Sprint",
      description: "Get 100+ beta users. Audit & refine contracts.",
      details: "6 Weeks • Live on Mainnet • Mentorship",
      example: "Ex: VaultBTC grew to 150 active wallets.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    },
    {
      icon: Trophy,
      step: "03",
      title: "Funding Day",
      description: "Pitch to VCs & Accelerators. Raise seed capital.",
      details: "1 Day • Top 8 Teams • Investment",
      example: "Ex: DefiX raised $100k Pre-Seed.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    },
  ];

  const founderStories = [
    {
      name: "PixelVault",
      tagline: "NFT Lending Protocol",
      outcome: "Backed by Polygon Studios",
      status: "Live on Polygon"
    },
    {
      name: "ChainGuard",
      tagline: "Smart Contract Security AI",
      outcome: "Won ETHIndia '24",
      status: "Beta Access"
    },
    {
      name: "AgriFi",
      tagline: "RWA Tokenization",
      outcome: "Grant from Celo Foundation",
      status: "Live on Celo"
    }
  ];

  return (
    <section id="launchpad" ref={sectionRef} className="py-24 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden" data-testid="community-stats-section">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay max-h-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">The Pipeline</span>
          </div>
          <h2 className="stats-title text-4xl md:text-5xl font-orbitron font-bold mb-6">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Idea</span> to <span className="gradient-text">Investment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A structured, repeatable path to build high-value Web3 startups. We don't just host hackathons; we build businesses.
          </p>
        </div>

        {/* Visual Pipeline Timeline */}
        <div className="pipeline-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-yellow-400/30 -z-10 border-t border-dashed border-white/20"></div>

          {pipelineSteps.map((step, index) => (
            <div
              key={step.title}
              className={`pipeline-step relative group p-1`}
            >
              <div className="bg-card border border-white/5 rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-6 mx-auto border ${step.border} relative group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-black rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-2xl font-orbitron font-bold text-center mb-2">{step.title}</h3>
                <div className="text-xs font-bold text-center text-muted-foreground uppercase tracking-wider mb-4">{step.details}</div>

                <p className="text-center text-muted-foreground/80 mb-6 text-sm">{step.description}</p>

                <div className="mt-auto bg-black/40 rounded-lg p-3 text-xs text-center border border-white/5">
                  <span className={`${step.color} font-semibold`}>{step.example}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Stories Strip */}
        <div className="mb-16">
          <h3 className="text-2xl font-orbitron font-bold text-center mb-10">Ships from the <span className="gradient-text">Foundry</span></h3>
          <div className="stories-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {founderStories.map((story, i) => (
              <div key={i} className="story-card bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-xl font-bold font-orbitron text-gray-500">
                  {story.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white leading-tight">{story.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">{story.tagline}</div>
                  <div className="text-xs font-medium text-primary flex items-center gap-1">
                    <Rocket className="w-3 h-3" /> {story.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="link" className="text-primary hover:text-primary/80 group text-base">
            See Launchpad Selection Criteria <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </section>
  );
}
