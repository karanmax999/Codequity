import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Coins, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import builderBgVideo from "@assets/builder-guild-bg.mp4";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function BuilderGuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const tracks = [
    {
      icon: Server,
      title: "Infra Track",
      description: "L2s, Scaling, & AA",
      outcomes: [
        "Build on Optimism/Base",
        "Implement Account Abstraction",
        "Run Indexers & Oracles"
      ],
      color: "text-blue-400",
      bgFrom: "from-blue-500/20",
      border: "border-blue-400/30"
    },
    {
      icon: Coins,
      title: "DeFi Track",
      description: "Protocols & Tokenomics",
      outcomes: [
        "Design AMM & Lending logic",
        "Architect Token Economies",
        "Yield Strategy Integrations"
      ],
      color: "text-green-400",
      bgFrom: "from-green-500/20",
      border: "border-green-400/30"
    },
    {
      icon: Shield,
      title: "Security Track",
      description: "Audits & Best Practices",
      outcomes: [
        "Smart Contract Auditing",
        "Fuzzing & Formal Verification",
        "Gas Optimization"
      ],
      color: "text-red-400",
      bgFrom: "from-red-500/20",
      border: "border-red-400/30"
    }
  ];

  const benefits = [
    { text: "₹50k+ Infrastructure Credits", sub: "(AWS, Alchemy, QuickNode)" },
    { text: "Priority for Protocol Bounties", sub: "(Avg $500 - $2k per bounty)" },
    { text: "Direct Accelerator Referrals", sub: "(YC, Tachyon, LongHash)" },
    { text: "1:1 Mentorship from OGs", sub: "(Weekly Office Hours)" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for cards
      gsap.from(".guild-card-container", {
        scrollTrigger: {
          trigger: ".guild-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Flip interaction using GSAP
      // We use event listeners for more control over the hover state
      const cards = document.querySelectorAll('.guild-card-container');
      cards.forEach(card => {
        const inner = card.querySelector('.guild-card-inner');
        if (!inner) return;

        card.addEventListener('mouseenter', () => {
          gsap.to(inner, { rotateY: 180, duration: 0.6, ease: "power2.inOut" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(inner, { rotateY: 0, duration: 0.6, ease: "power2.inOut" });
        });
      });

      // Benefits Entrance
      gsap.from(".benefit-item", {
        scrollTrigger: {
          trigger: ".benefits-container",
          start: "top 85%",
        },
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden builder-section">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src={builderBgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div> {/* Overlay for readability */}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Web3 <span className="gradient-text">Builder Guild</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Specialized tracks for developers who want to go deep. Don't just learn syntax; master the stack.
          </p>
        </div>

        <div className="guild-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 max-w-6xl mx-auto perspective-1000">
          {tracks.map((track) => (
            <div
              key={track.title}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setFlippedCard(flippedCard === track.title ? null : track.title);
                }
              }}
              className="guild-card-container h-[350px] md:h-[400px] relative perspective-1000 cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              <div
                className="guild-card-inner relative w-full h-full duration-500 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === track.title ? 'rotateY(180deg)' : 'none'
                }}
              >
                {/* Front Face */}
                <div className={cn(
                  "guild-card-front absolute inset-0 w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center text-center border bg-black/60 backdrop-blur-md transition-colors",
                  track.border,
                  "border-white/10 group-hover:border-opacity-100 shadow-lg"
                )}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]", track.color)}>
                    <track.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold mb-4">{track.title}</h3>
                  <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">{track.description}</p>

                  <div className="absolute bottom-8 text-xs text-white/40 flex items-center gap-2 group-hover:text-primary transition-colors">
                    Hover to reveal <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className={cn(
                    "guild-card-back absolute inset-0 w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center border bg-gradient-to-b",
                    track.bgFrom, "to-black",
                    track.border
                  )}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <h3 className={cn("text-xl font-bold mb-6", track.color)}>{track.title} Outcomes</h3>
                  <ul className="space-y-4 w-full">
                    {track.outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 text-left">
                        <ArrowRight className={cn("w-4 h-4 mt-0.5 shrink-0", track.color)} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Updated Button to Link to Telegram */}
                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto w-full border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <a href="https://t.me/codequiity" target="_blank" rel="noopener noreferrer">
                      Join the Guild
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="benefits-container max-w-5xl mx-auto bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 scale-100 opacity-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-orbitron font-bold mb-6 text-white">Guild <span className="gradient-text">Benefits</span></h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                This isn't just a course. It's a professional network and resource hub designed to accelerate your Web3 career.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80 group text-lg font-semibold">
                View Sample Schedule <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-default group/benefit">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_var(--primary)] group-hover/benefit:scale-150 transition-transform"></div>
                  <div>
                    <div className="text-white font-medium group-hover/benefit:text-primary transition-colors">{benefit.text}</div>
                    <div className="text-sm text-muted-foreground">{benefit.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-10 text-center">
            {/* Updated Main CTA Button */}
            <Button
              asChild
              className="bg-primary text-primary-foreground px-10 py-6 text-lg font-bold hover:bg-primary/90 neon-border rounded-full animate-pulse-glow hover:scale-105 transition-transform"
            >
              <a href="https://t.me/codequiity" target="_blank" rel="noopener noreferrer">
                Join the Guild
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
