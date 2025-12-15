import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  Target, Eye, Users, Code, Globe, Award, Rocket, Zap, Layers,
  ArrowRight, CheckCircle, TrendingUp, Shield, Server, Box, Terminal,
  AlertTriangle, XCircle, Layout
} from "lucide-react";
import karanImage from "@assets/karan_1756295348934.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-char", {
        opacity: 0, y: 100, rotateX: -90, stagger: 0.05, duration: 1, ease: "back.out(1.7)"
      });

      // Standard fade-ups
      const fadeUps = gsap.utils.toArray<HTMLElement>(".fade-up");
      fadeUps.forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%"
          },
          y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
        });
      });

      // Journey Line Animation
      gsap.from(".journey-line", {
        scrollTrigger: {
          trigger: ".journey-container",
          start: "top 70%"
        },
        scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power3.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const coreValues = [
    {
      icon: Zap,
      title: "Innovation First",
      desc: "Every builder ships to mainnet within 6 weeks. We experiment with AA, ZK, and AI agents.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    },
    {
      icon: Users,
      title: "Community Led",
      desc: "Weekly on-chain hackathons with real bounties. Open GitHub repos and transparent cap tables.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      icon: Layers,
      title: "Open Source",
      desc: "100% of hackathon code is public. We actively contribute to Optimism, Base, and Ethereum core.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20"
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "Average audit score: 95/100. Over 60% of our builders go on to raise funding seeking grants.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    }
  ];

  const team = [
    {
      name: "KARAN BANSAL",
      role: "Founder & Architect",
      image: karanImage,
      type: "Builder",
      bio: "10+ Web3 hackathon wins. Ships smart contracts at 2 AM. Built VaultBTC & AI Auditor. CodeQuity is the community I wish existed when I started.",
      stats: { solidity: 98, architecture: 90, community: 95 },
      color: "from-purple-500 to-pink-500"
    }
  ];

  const journeySteps = [
    {
      title: "Join Builder Guild",
      desc: "Start learning L2s, DeFi, Security. Get free infra credits & mentorship.",
      ctas: ["Join Guild"]
    },
    {
      title: "Ship in Hackathons",
      desc: "Build real products in 48-72 hours. Win bounties & get protocol feedback.",
      ctas: ["View Events"]
    },
    {
      title: "Launch Startup",
      desc: "6-week intensive sprint. Go to market, get grants (₹2Cr+), met VCs.",
      ctas: ["Apply to Launchpad"]
    }
  ];

  const stories = [
    { name: "VaultBTC", text: "Cross-chain yield aggregator. Built at Hackathon → $50K grant. Live on testnet with 200+ users." },
    { name: "AgentX", text: "AI-driven DAO governance. Finalist at ETHIndia. Now in beta with 5 DAOs onboarding." }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden font-sans selection:bg-primary/30" ref={containerRef}>
      <Navigation />

      {/* 1. Cinematic 3D Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] opacity-40"
            style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[100px] opacity-40"
            style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center perspective-1000">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">Launching 2025</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black font-orbitron tracking-tighter leading-[0.9] mb-8 mix-blend-difference text-white">
            BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">LIMITS</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            India's definitive Web3 ecosystem. Where <span className="text-white font-medium">ambition</span> meets <span className="text-white font-medium">opportunity</span>.
          </p>
        </div>
      </section>

      {/* 2. Your Path Journey Map (New) */}
      <section className="py-20 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-16 fade-up">How It Works</h2>
          <div className="journey-container relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent -translate-x-1/2 journey-line"></div>

            <div className="space-y-12">
              {journeySteps.map((step, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 fade-up ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full text-center md:text-left">
                    {idx % 2 !== 0 && <div className="hidden md:block text-right">
                      <h3 className="text-2xl font-bold font-orbitron text-white">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{step.desc}</p>
                    </div>}
                    {idx % 2 === 0 && <div>
                      <h3 className="text-2xl font-bold font-orbitron text-white">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{step.desc}</p>
                    </div>}
                  </div>

                  <div className="relative z-10 w-12 h-12 rounded-full bg-black border-2 border-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_var(--primary)]">
                    <span className="font-bold text-white">{idx + 1}</span>
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    {idx % 2 !== 0 && <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/20">{step.ctas[0]}</Button>}
                    {idx % 2 === 0 && <div className="hidden md:block text-right">
                      <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/20">{step.ctas[0]}</Button>
                    </div>}
                    {/* Mobile Only Content alignment fix */}
                    <div className="md:hidden mt-4">
                      <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/20">{step.ctas[0]}</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision (Rewritten) */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="fade-up p-10 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <Rocket className="w-10 h-10 text-primary mb-6" />
              <h2 className="text-3xl font-orbitron font-bold text-white mb-6">Our Mission</h2>
              <h3 className="text-xl font-bold text-white mb-4">India's Web3 Builder Pipeline</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>Transform builders from zero to funded in 90 days:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Week 0-2: On-chain hackathon</li>
                  <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Week 3-8: 6-week shipping sprint</li>
                  <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Week 9-12: Pitch to VCs & Grants</li>
                </ul>
                <p className="border-l-2 border-primary pl-4 italic text-white/80 mt-4">
                  "Not theory. Real products. Real funding."
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="fade-up p-10 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl relative overflow-hidden group hover:border-accent/30 transition-colors">
              <Eye className="w-10 h-10 text-accent mb-6" />
              <h2 className="text-3xl font-orbitron font-bold text-white mb-6">Vision</h2>
              <h3 className="text-xl font-bold text-white mb-4">Prove Yourself On-Chain</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>No degrees. No resumes. Just:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Your deployed contracts</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Your on-chain activity</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Open source contributions</li>
                </ul>
                <p className="font-bold text-white mt-4">
                  Build in public. Ship to production. Get funded.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Now? (New) */}
      <section className="py-20 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-orbitron font-bold mb-8 fade-up">Why Now?</h2>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm fade-up">
            <p className="text-xl text-white mb-6">
              India has <span className="text-red-400 font-bold">5M+ developers</span>. Only <span className="text-primary font-bold">~50K</span> know Web3.
              The next $1B+ protocol could be built in Bangalore or Delhi.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-black/40 rounded-lg border border-white/5 flex flex-col items-center">
                <XCircle className="text-red-500 mb-2" />
                <span className="text-sm text-muted-foreground">No structured education</span>
              </div>
              <div className="p-4 bg-black/40 rounded-lg border border-white/5 flex flex-col items-center">
                <XCircle className="text-red-500 mb-2" />
                <span className="text-sm text-muted-foreground">Limited VC access</span>
              </div>
              <div className="p-4 bg-black/40 rounded-lg border border-white/5 flex flex-col items-center">
                <XCircle className="text-red-500 mb-2" />
                <span className="text-sm text-muted-foreground">Few accelerators</span>
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground font-bold neon-border">Be Part of the First Cohort</Button>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">Core Values</h2>
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`value-card relative group p-6 rounded-xl border ${value.border} ${value.bg} backdrop-blur-sm overflow-hidden hover:-translate-y-2 transition-transform duration-300 fade-up`}
              >
                <value.icon className={`w-10 h-10 ${value.color} mb-4 relative z-10`} />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-white relative z-10">{value.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Builder Success Stories (New) */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px bg-white/20 w-12" />
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Ships from the Foundry</span>
            <div className="h-px bg-white/20 w-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stories.map((story, i) => (
              <div key={i} className="bg-black border border-white/10 p-6 rounded-xl flex gap-4 items-start fade-up hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xl font-orbitron">{story.name[0]}</div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{story.name}</h4>
                  <p className="text-sm text-muted-foreground leading-snug">{story.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 text-xs text-muted-foreground italic">
            * Early projects from our pilot cohorts
          </div>
        </div>
      </section>

      {/* 7. Squad / Team Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
            The <span className="gradient-text">Squad</span>
          </h2>
          <div className="grid grid-cols-1 gap-12 max-w-2xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="group relative fade-up">
                <div className={`absolute inset-0 bg-gradient-to-r ${member.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`} />
                <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 mx-auto md:mx-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-2xl border-2 border-white/10" />
                      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${member.color} text-[10px] font-bold uppercase rounded-full tracking-widest text-white shadow-lg`}>
                        {member.type}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left w-full">
                      <h3 className="text-2xl font-orbitron font-bold text-white mb-1">{member.name}</h3>
                      <p className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>{member.role}</p>

                      <p className="text-muted-foreground mb-6 text-sm italic border-l-2 border-white/10 pl-4">
                        "{member.bio}"
                      </p>

                      <div className="space-y-3">
                        {Object.entries(member.stats).map(([key, val], idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs uppercase text-muted-foreground font-semibold">
                              <span>{key}</span>
                              <span>{val}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${member.color}`}
                                style={{ width: `${val}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Building With (New) */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h3 className="uppercase tracking-widest text-sm font-bold text-muted-foreground mb-8">Building With Ecosystem Partners</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Text Logos for now as requested */}
            <span className="text-xl font-bold font-orbitron">ETHEREUM</span>
            <span className="text-xl font-bold font-orbitron">POLYGON</span>
            <span className="text-xl font-bold font-orbitron">APTOS</span>
            <span className="text-xl font-bold font-orbitron">SOLANA</span>
          </div>
        </div>
      </section>

      {/* 9. Pre-Launch Status (Replaces Stats) */}
      <section className="py-20 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold tracking-widest mb-8">
            🚀 LAUNCHING Q1 2025
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 border border-white/10 rounded-xl bg-black/40">
              <div className="text-5xl font-orbitron font-bold text-white mb-2">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Waitlist Applications</div>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-black/40">
              <div className="text-5xl font-orbitron font-bold text-white mb-2">15+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Partner Protocols in Pipeline</div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-20">
        <Button className="px-12 py-6 text-lg font-orbitron font-bold bg-primary hover:bg-primary/80 neon-border rounded-full animate-pulse-glow">
          Join The CodeQuity Revolution
        </Button>
      </div>

      <Footer />
    </div>
  );
}
