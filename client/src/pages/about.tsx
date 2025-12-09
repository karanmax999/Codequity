import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, Code, Lightbulb, GraduationCap, Globe, Award, Rocket, Zap, Layers, Cpu } from "lucide-react";
import karanImage from "@assets/karan_1756295348934.jpeg";
import mayureshImage from "@assets/mayuresh.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2, // -1 to 1
      y: (clientY / innerHeight - 0.5) * 2  // -1 to 1
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Title Reveal
      gsap.from(".hero-char", {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Floating Elements Entrance
      gsap.from(".glass-shard", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // Asymmetric Sections Animation
      gsap.utils.toArray<HTMLElement>(".feature-section").forEach((section, i) => {
        gsap.from(section.querySelectorAll(".animate-slide-in"), {
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Values Cards Stagger
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Stats Counter Animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((stat) => {
        const value = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 85%"
          },
          innerText: 0,
          duration: 2,
          snap: { innerText: 1 },
          onUpdate: function () {
            stat.innerText = Math.ceil(this.targets()[0].innerText) + "+";
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const coreValues = [
    {
      icon: Zap,
      title: "Innovation First",
      desc: "Pushing boundaries with cutting-edge Web3 and AI technologies.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    },
    {
      icon: Users,
      title: "Community Led",
      desc: "Built by developers, for developers. Every voice matters.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      icon: Layers,
      title: "Open Source",
      desc: "Believing in the power of shared knowledge and transparent code.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20"
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "Striving for perfection in every line of code and every event.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    }
  ];

  const team = [
    {
      name: "MAYURESH SHARMA",
      role: "CEO & Founder",
      image: mayureshImage,
      type: "Visionary",
      stats: { leadership: 95, tech: 88, innovation: 92 },
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "KARAN BANSAL",
      role: "CTO & Co-Founder",
      image: karanImage,
      type: "Architect",
      stats: { solidity: 98, architecture: 90, community: 95 },
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" ref={containerRef}>
      <Navigation />

      {/* Cinematic 3D Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black"
        onMouseMove={handleMouseMove}
      >
        {/* Aurora Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[100px] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Floating Glass Shards - Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="glass-shard absolute top-[20%] left-[15%] p-4 rounded-2xl glass-morphism border border-white/10 rotate-[-12deg] transition-transform duration-75 will-change-transform"
            style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) rotate(-12deg)` }}
          >
            <Code className="w-8 h-8 text-primary opacity-80" />
          </div>
          <div
            className="glass-shard absolute bottom-[30%] right-[15%] p-4 rounded-2xl glass-morphism border border-white/10 rotate-[12deg] transition-transform duration-75 will-change-transform"
            style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px) rotate(12deg)` }}
          >
            <Globe className="w-8 h-8 text-accent opacity-80" />
          </div>
          <div
            className="glass-shard absolute top-[40%] right-[25%] w-4 h-4 rounded-full bg-accent/50 blur-sm"
            style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center perspective-1000">
          <div
            className="transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`
            }}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">The Next Chapter</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black font-orbitron tracking-tighter leading-[0.9] mb-8 mix-blend-difference text-white">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">LIMITS</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              India's definitive Web3 ecosystem. Where <span className="text-white font-medium">ambition</span> meets <span className="text-white font-medium">opportunity</span>.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-16 rounded-full bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
      </section>

      {/* Premium Bento Grid - Mission & Vision */}
      <section className="relative py-20 z-20 -mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">

            {/* Mission Block - Large */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <Target className="w-96 h-96 text-primary" />
              </div>

              <div className="relative p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-4xl font-orbitron font-bold text-white mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-Relaxed max-w-xl">
                    To architect the largest parallel education system for Web3 in India. We don't just teach code; we incubate <span className="text-primary font-semibold">high-value IP</span> and tangible products.
                    <br /><br />
                    Bridging the chasm between academic theory and the ruthless demands of the bleeding-edge industry.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 text-sm font-medium text-primary/80">
                  <div className="h-px bg-primary/30 w-12" />
                  <span>EST. 2025</span>
                </div>
              </div>
            </div>

            {/* Vision Block - Tall */}
            <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-accent/30">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[150%] h-[50%] bg-accent/20 blur-[100px] -rotate-45" />
              </div>

              <div className="relative p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/20 group-hover:rotate-12 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-orbitron font-bold text-white mb-4">Vision</h2>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  A meritocratic utopia where your GitHub commit graph matters more than your degree.
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">Global Impact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">Open Source</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative/Stat Stripe - Wide (Optional extension if grid used differently, but fitting in current 2x3 logic covers it. Adding a floaty for flair) */}
          </div>
        </div>
      </section>

      {/* Interactive Core Values */}
      <section className="py-24 bg-gradient-to-b from-black via-card/50 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">Core Values</h2>
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`value-card relative group p-6 rounded-xl border ${value.border} ${value.bg} backdrop-blur-sm overflow-hidden hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <value.icon className={`w-32 h-32 ${value.color}`} />
                </div>
                <value.icon className={`w-10 h-10 ${value.color} mb-4 relative z-10`} />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-white relative z-10">{value.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{value.desc}</p>
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color.replace('text-', 'from-')}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Impact Stats */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10 pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-full bg-primary/10 animate-pulse" style={{ animationDelay: `${Math.random() * 2}s` }} />
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Builders", val: "500" },
              { label: "Events", val: "25" },
              { label: "States", val: "15" },
              { label: "Partners", val: "10" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number text-5xl md:text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                  {stat.val}+
                </div>
                <div className="text-primary font-medium tracking-widest uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Squad / Team Section */}
      <section className="py-24 pb-48 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
            The <span className="gradient-text">Squad</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${member.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`} />
                <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-2xl border-2 border-white/10" />
                      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${member.color} text-[10px] font-bold uppercase rounded-full tracking-widest text-white shadow-lg`}>
                        {member.type}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left w-full">
                      <h3 className="text-2xl font-orbitron font-bold text-white mb-1">{member.name}</h3>
                      <p className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>{member.role}</p>

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

          <div className="text-center mt-20">
            <Button className="px-12 py-6 text-lg font-orbitron font-bold bg-primary hover:bg-primary/80 neon-border rounded-full animate-pulse-glow">
              Join The CodeQuity Revolution
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
