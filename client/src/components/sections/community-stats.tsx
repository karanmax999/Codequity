import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Lightbulb, GraduationCap, ArrowRight, Trophy, Rocket, XCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Problem/Solution Fade In
      gsap.from(".problem-solution", {
        scrollTrigger: {
          trigger: ".problem-solution-container",
          start: "top 95%", // Trigger almost immediately when in view
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        clearProps: "all"
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
    },
    {
      name: "DeFiLens",
      tagline: "Portfolio Analytics",
      outcome: "15k+ MAU",
      status: "Live on Solana"
    },
    {
      name: "TrustPact",
      tagline: "Escrow Service",
      outcome: "Raised ₹25L Seed",
      status: "Testing"
    }
  ];

  return (
    <section id="launchpad" ref={sectionRef} className="pt-24 pb-24 bg-black relative z-10 overflow-hidden" data-testid="community-stats-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Problem -> Solution Block */}
        <div className="problem-solution-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="problem-solution p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-black to-black border border-red-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 blur-[80px] group-hover:bg-red-500/30 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide">The Problem</h3>
            </div>
            <h4 className="text-3xl font-bold text-gray-200 mb-4 leading-tight">78% of hackathon projects <span className="text-red-400">die in GitHub.</span></h4>
            <p className="text-gray-400 text-lg leading-relaxed relative z-10">
              Great code often fails to become a business. Lack of mentorship, users, and funding kills momentum after the weekend ends.
            </p>
          </div>

          <div className="problem-solution p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-black to-black border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[80px] group-hover:bg-emerald-500/30 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide">The Solution</h3>
            </div>
            <h4 className="text-3xl font-bold text-gray-200 mb-4 leading-tight">We build <span className="text-emerald-400">businesses</span>, not just repos.</h4>
            <p className="text-gray-400 text-lg leading-relaxed relative z-10">
              CodeQuity provides the structure, mentorship, and capital ensuring your project survives the "post-hackathon depth" and ships to mainnet.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">The Pipeline</span>
          </div>
          <h2 className="stats-title text-4xl md:text-6xl font-orbitron font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From Idea to Investment in 3 Stages.
          </p>
        </div>

        {/* Visual Pipeline Timeline Interactive */}
        <div className="pipeline-container relative mb-32 max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-[28%] left-[10%] right-[10%] h-1 bg-white/10 rounded-full" />
          <div
            className="hidden md:block absolute top-[28%] left-[10%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${(activeStep / (pipelineSteps.length - 1)) * 80}%` }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative z-10"
                onMouseEnter={() => setActiveStep(index)}
              >
                <motion.div
                  className={`
                        p-8 rounded-[2rem] border transition-all duration-500 h-full relative overflow-hidden group
                        ${activeStep === index
                      ? 'bg-gradient-to-b from-white/10 to-black/60 border-primary/50 shadow-[0_0_50px_-10px_rgba(var(--primary),0.3)]'
                      : 'bg-gradient-to-b from-white/5 to-transparent border-white/5 hover:border-white/20 hover:bg-white/10'}
                    `}
                  animate={{
                    y: activeStep === index ? -10 : 0,
                    scale: activeStep === index ? 1.02 : 1
                  }}
                >
                  {/* Card Glow Effect */}
                  {activeStep === index && <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />}
                  <div className={`
                         w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto border relative transition-all duration-500
                         ${activeStep === index ? `${step.bg} ${step.border} scale-110 shadow-lg` : 'bg-white/5 border-white/10'}
                    `}>
                    <step.icon className={`w-8 h-8 ${activeStep === index ? step.color : 'text-gray-500'}`} />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-black rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {step.step}
                    </div>
                  </div>

                  <h3 className={`text-2xl font-orbitron font-bold text-center mb-2 transition-colors ${activeStep === index ? 'text-white' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <div className="text-xs font-bold text-center text-muted-foreground uppercase tracking-wider mb-4">{step.details}</div>
                  <p className="text-center text-muted-foreground/80 mb-6 text-sm">{step.description}</p>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-auto bg-black/40 rounded-lg p-3 text-xs text-center border border-white/5"
                    >
                      <span className={`${step.color} font-semibold`}>{step.example}</span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Stories Strip - Sliding Ticker */}
        <div className="mb-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <h3 className="text-2xl font-orbitron font-bold text-center mb-10">Ships from the <span className="gradient-text">Foundry</span></h3>

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...founderStories, ...founderStories].map((story, i) => (
              <div key={i} className="min-w-[300px] story-card bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-default">
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
          </motion.div>
        </div>

        <div className="text-center">
          <Button variant="link" asChild className="text-primary hover:text-primary/80 group text-base">
            <a href="/portfolio">
              View All Alumni Projects <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
