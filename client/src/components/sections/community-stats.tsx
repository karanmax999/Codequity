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
    <section id="launchpad" ref={sectionRef} className="pt-32 pb-32 bg-black relative z-10 overflow-hidden" data-testid="community-stats-section">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Problem -> Solution Block */}
        <div className="problem-solution-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32 max-w-6xl mx-auto">
          {/* Problem Card */}
          <div className="problem-card group relative p-6 sm:p-10 md:p-12 bg-[#F9FAFB] border border-gray-200 overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <XCircle className="w-24 h-24 text-black" />
            </div>

            <div className="relative z-10">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-200 pb-2">
                Phase 01: The Friction
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-[3.5rem] font-serif font-medium leading-[1.1] text-black mb-8 tracking-tight">
                78% of hackathon projects <span className="italic text-gray-400 font-normal">die in GitHub.</span>
              </h3>

              <p className="text-gray-600 text-lg leading-[1.8] max-w-md">
                Great code often fails to become a business. Lack of mentorship, users, and funding kills momentum after the weekend ends.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-black transition-colors duration-500" />
          </div>

          {/* Solution Card */}
          <div className="solution-card group relative p-6 sm:p-10 md:p-12 bg-white border border-emerald-100 overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)]">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-24 h-24 text-emerald-500" />
            </div>

            <div className="relative z-10">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-8 border-b border-emerald-100 pb-2">
                Phase 02: The Forge
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-[3.5rem] font-serif font-medium leading-[1.1] text-black mb-8 tracking-tight">
                We build <span className="text-emerald-500 italic">businesses</span>, not just repos.
              </h3>

              <p className="text-gray-600 text-lg leading-[1.8] max-w-md">
                CodeQuity provides the structure, mentorship, and capital ensuring your project survives the "post-hackathon depth" and ships to mainnet.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-500" />
          </div>
        </div>

        {/* Founder Stories Strip - Sliding Ticker (Controlled by Scroll) */}
        <div className="foundry-section mb-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-center mb-10 text-white">Ships from the <span className="gradient-text">Foundry</span></h3>

          {/* Container for the scroll track */}
          <div className="flex w-max foundry-track pb-4">
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
