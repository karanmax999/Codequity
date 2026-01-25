import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Problem (Left) & Solution (Right) Split Reveal
      gsap.from(".problem-card", {
        scrollTrigger: {
          trigger: ".problem-solution-container",
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        x: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1
      });

      gsap.from(".solution-card", {
        scrollTrigger: {
          trigger: ".problem-solution-container",
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        x: 100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1
      });

      // Foundry Horizontal Scroll
      // We want the track to move left as we scroll down
      const track = document.querySelector('.foundry-track');
      if (track) {
        const trackWidth = track.scrollWidth;
        const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
        const xMovement = -(trackWidth - containerWidth);

        gsap.to(".foundry-track", {
          x: xMovement,
          ease: "none",
          scrollTrigger: {
            trigger: ".foundry-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          }
        });
      }

      // Card Scale on Entrance for Foundry items
      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: ".foundry-section",
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    },
    {
      name: "BlockEstates",
      tagline: "Real Estate Fractionalization",
      outcome: "Acquired first property",
      status: "Live on Base"
    },
    {
      name: "DaoDash",
      tagline: "DAO Management Tool",
      outcome: "Used by 50+ DAOs",
      status: "Live on Optimism"
    }
  ];

  return (
    <section id="launchpad" ref={sectionRef} className="pt-24 pb-24 bg-black relative z-10 overflow-hidden" data-testid="community-stats-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Problem -> Solution Block */}
        <div className="problem-solution-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 max-w-5xl mx-auto">
          <div className="problem-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-black to-black border border-red-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 blur-[80px] group-hover:bg-red-500/30 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
            <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
              <div className="p-2 md:p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all">
                <XCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wide">The Problem</h3>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4 leading-tight">78% of hackathon projects <span className="text-red-400">die in GitHub.</span></h4>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10">
              Great code often fails to become a business. Lack of mentorship, users, and funding kills momentum after the weekend ends.
            </p>
          </div>

          <div className="solution-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-black to-black border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[80px] group-hover:bg-emerald-500/30 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
              <div className="p-2 md:p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wide">The Solution</h3>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4 leading-tight">We build <span className="text-emerald-400">businesses</span>, not just repos.</h4>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10">
              CodeQuity provides the structure, mentorship, and capital ensuring your project survives the "post-hackathon depth" and ships to mainnet.
            </p>
          </div>
        </div>

        {/* Founder Stories Strip - Sliding Ticker (Controlled by Scroll) */}
        <div className="foundry-section mb-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <h3 className="text-2xl font-orbitron font-bold text-center mb-10">Ships from the <span className="gradient-text">Foundry</span></h3>

          {/* Container for the scroll track */}
          <div className="flex w-[200%] foundry-track">
            {[...founderStories, ...founderStories].map((story, i) => (
              <div key={i} className="min-w-[350px] story-card bg-white/5 border border-white/5 rounded-xl p-6 mr-6 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-2xl font-bold font-orbitron text-gray-500 border border-white/10">
                  {story.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white leading-tight text-lg">{story.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{story.tagline}</div>
                  <div className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full w-fit">
                    <Rocket className="w-3 h-3" /> {story.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
