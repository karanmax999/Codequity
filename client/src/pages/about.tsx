import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  Users, Award, Rocket, Zap, Layers,
  CheckCircle, XCircle
} from "lucide-react";
import karanImage from "../assets/founder.jpg";
import adityaImage from "../assets/aditya.png";
import aryanImage from "../assets/aryan.png";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

import codequityCardVideo from "../assets/codequity_card.mp4";
import transitionCityImage from "../assets/transition-city.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      color: "from-purple-500 to-pink-500",
      link: "/founder"
    },
    {
      name: "ARYAN",
      role: "Cofounder & CTO",
      image: aryanImage,
      type: "Builder",
      bio: "Mastermind behind the core infrastructure. Scales distributed systems and optimizes gas costs. Believes in code as the ultimate truth.",
      stats: { rust: 95, systems: 98, security: 92 },
      color: "from-blue-500 to-cyan-500",
      link: null
    },
    {
      name: "ADITYA",
      role: "Head of Growth & Consultant",
      image: adityaImage,
      type: "Growth",
      bio: "Connecting the dots between protocols and people. Strategies that turn users into evangelists. Building the ecosystem one partnership at a time.",
      stats: { strategy: 96, network: 94, analytics: 90 },
      color: "from-green-500 to-emerald-500",
      link: null
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
      <Helmet>
        <title>About - CodeQuity</title>
        <meta name="description" content="CodeQuity is India's structured path for student builders to launch Web3 startups. Meet the team and understand our mission." />
        <link rel="canonical" href="https://codequity.org/about" />
      </Helmet>
      <Navigation />

      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={codequityCardVideo}
        bgImageSrc={transitionCityImage}
        date="Est. 2025"
        scrollToExpand="Scroll to Expand Your Vision"
        textBlend
      >
        <div className="space-y-32">
          {/* 1. Introductory Copy (formerly Hero text) */}
          <section className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                The Future of <br />
                <span className="text-primary">Ecosystem Building.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed fade-up">
                India's definitive Web3 ecosystem. We bridge the gap between <span className="text-white italic">ambition</span> and <span className="text-white">on-chain reality</span>.
              </p>
            </div>
          </section>



          {/* 3. Editorial Mission & Vision */}
          <section className="bg-black">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start border-t border-white/10 pt-20 mb-32">
                <div className="fade-up">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-6 block">// 01 — MISSION</span>
                  <h2 className="text-5xl font-bold text-white mb-8">India's Web3 <br />Builder Pipeline</h2>
                </div>
                <div className="fade-up text-gray-400 text-lg leading-relaxed space-y-6 max-w-xl">
                  <p>
                    We've built a structured path to transform high-potential builders into funded founders within 90 days. CodeQuity isn't just a community; it's a high-pressure foundry where real products are shipped to mainnet.
                  </p>
                  <div className="bg-white/5 p-8 border-l border-primary">
                    <p className="text-white italic">"Not theory. Real products. Real funding."</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start border-t border-white/10 pt-20">
                <div className="fade-up lg:order-2">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-6 block">// 02 — VISION</span>
                  <h2 className="text-5xl font-bold text-white mb-8">Prove Yourself <br />On-Chain</h2>
                </div>
                <div className="fade-up lg:order-1 text-gray-400 text-lg leading-relaxed space-y-6 max-w-xl">
                  <p>
                    In the new world, resumes are obsolete. We believe your reputation should be built on your contributions. No degrees, no corporate ladders—just your deployed contracts and on-chain activity.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>On-chain Activity</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Open Source Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Editorial Call to Action */}
          <section className="bg-black border-y border-white/10 py-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="fade-up">
                  <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                    India has 5M+ developers. <br />
                    Only ~50K know Web3.
                  </h2>
                  <p className="text-gray-400 text-xl leading-relaxed mb-12">
                    We're here to change that ratio. The next $1B+ protocol could be built in Bangalore, Delhi, or Mumbai. We provide the forge; you bring the fire.
                  </p>
                  <Button className="bg-primary text-black font-bold h-14 px-10 rounded-none hover:bg-primary/90 transition-colors">
                    Apply for Q1 2025 Cohort
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-up">
                  {[
                    { icon: XCircle, text: "No structured education" },
                    { icon: XCircle, text: "Limited VC access" },
                    { icon: XCircle, text: "Few accelerators" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <item.icon className="w-10 h-10 text-primary/40 mb-4" />
                      <span className="text-xs uppercase font-bold tracking-widest text-gray-500">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Editorial Core Values */}
          <section className="bg-black">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20">
                <div className="fade-up lg:col-span-1">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-6 block">// 03 — VALUES</span>
                  <h2 className="text-5xl font-bold text-white mb-4">Integrity.<br />Then Everything Else.</h2>
                </div>
                <div className="fade-up lg:col-span-2 text-gray-400 text-lg">
                  <p>Four guiding principles shape our work at CodeQuity. They've helped us maintain a standard of excellence that sets our builders apart.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="p-10 border border-white/10 hover:bg-white/5 transition-colors group fade-up"
                  >
                    <div className="text-4xl font-bold text-primary/20 group-hover:text-primary transition-colors mb-8">0{index + 1}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Editorial Success Stories */}
          <section className="bg-black">
            <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-24 fade-up">
                <div className="max-w-2xl">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-6 block">// THE OUTPUT</span>
                  <h2 className="text-5xl font-bold text-white uppercase tracking-tight">Ships from the Foundry</h2>
                </div>
                <div className="text-gray-500 text-sm uppercase font-bold tracking-widest pb-2">
                  Pilot Cohort Projects
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {stories.map((story, i) => (
                  <div key={i} className="bg-black p-12 fade-up hover:bg-white/5 transition-colors group">
                    <h4 className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{story.name}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">{story.text}</p>
                    <div className="h-px w-8 bg-white/20 group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Modern Squad Section */}
          <section className="bg-black overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="text-center mb-24 fade-up">
                <span className="text-sm font-bold tracking-widest text-primary uppercase mb-6 block">// THE FOUNDATION</span>
                <h2 className="text-6xl font-bold text-white">The Squad</h2>
              </div>

              <div className="grid grid-cols-1 gap-32 max-w-6xl mx-auto">
                {team.map((member, i) => {
                  const CardContent = (
                    <div className={`flex flex-col lg:flex-row gap-16 items-start fade-up border-b border-white/10 pb-20 last:border-0 group ${member.link ? "cursor-pointer hover:bg-white/5 transition-colors p-6 rounded-xl -mx-6" : ""}`}>
                      <div className="relative w-full lg:w-[450px] aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 pt-4">
                        <div className="mb-12">
                          <h3 className={`text-5xl font-bold text-white mb-2 uppercase tracking-tight ${member.link ? "group-hover:text-primary" : ""} transition-colors`}>{member.name}</h3>
                          <div className="text-primary text-sm font-bold tracking-widest uppercase">{member.role}</div>
                        </div>
                        <div className="text-gray-400 text-xl leading-relaxed mb-12">
                          <p>"{member.bio}"</p>
                        </div>
                        <div className="flex gap-8 border-t border-white/10 pt-8 mt-12">
                          <div className="flex flex-col">
                            <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest mb-1">Status</span>
                            <span className="text-white text-sm flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              Available
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest mb-1">Focus</span>
                            <span className="text-white text-sm uppercase tracking-wider">{member.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                  return member.link ? (
                    <Link key={i} href={member.link}>
                      {CardContent}
                    </Link>
                  ) : (
                    <div key={i}>{CardContent}</div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 8. Building With */}
          <section className="border-t border-white/5 pt-20">
            <div className="container mx-auto px-6 text-center">
              <h3 className="uppercase tracking-widest text-sm font-bold text-muted-foreground mb-8">Building With Ecosystem Partners</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60">
                {["ETHEREUM", "POLYGON", "APTOS", "SOLANA", "OPTIMISM", "ARBITRUM"].map((p, i) => (
                  <div key={i} className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
                    <span className="text-sm md:text-lg font-bold font-orbitron text-gray-400 group-hover:text-white transition-colors">{p}</span>
                    <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 rounded-lg transition-colors duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Pre-Launch Status */}
          <section className="bg-primary/5 border-t border-primary/10 py-20 pb-40">
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
        </div>
      </ScrollExpandMedia>

      <Footer />
    </div>
  );
}
