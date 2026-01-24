import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Star, Award, Heart, Code, Lightbulb, GraduationCap, Globe, Zap, Rocket, ShieldCheck, MessageCircle } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export default function Community() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.timeline()
        .from(".community-title", {
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
        .from(".community-subtitle", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(".community-stats", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");

      // Map pins animation (simulated)
      gsap.from(".map-pin", {
        scrollTrigger: {
          trigger: ".map-container",
          start: "top 70%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(2)"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const communityStats = [
    { label: "Active Builders", value: "500+", icon: Users, color: "text-primary" },
    { label: "Cities Covered", value: "12+", icon: MapPin, color: "text-accent" },
    { label: "Partner Protocols", value: "15+", icon: ShieldCheck, color: "text-green-400" },
    { label: "Grants Disbursed", value: "₹20L+", icon: Award, color: "text-primary" }
  ];

  const features = [
    {
      icon: Code,
      title: "The Builder Guild",
      description: "Join 500+ developers in our exclusive Discord. Daily standups, code reviews, and bounty hunting squads.",
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: "Launchpad Access",
      description: "Direct pipeline to our incubator. Top hackathon teams get seed funding and mentorship.",
      color: "text-accent"
    },
    {
      icon: GraduationCap,
      title: "Masterclasses",
      description: "Weekly deep dives into ZK-Rollups, Account Abstraction, and DeFi mechanics from protocol engineers.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with international developers and access global opportunities.",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Permissionless Innovation",
      description: "We don't just teach. We ship. Build real products that solve real problems on-chain.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Meritocratic Culture",
      description: "Your background doesn't matter. Your GitHub commit graph does. Standardize your skillset.",
      color: "text-red-400"
    }
  ];

  // Visual Map Pins (random positions for visual effect in this demo)
  const mapPins = [...Array(15)].map((_, i) => ({
    left: `${20 + Math.random() * 60}%`,
    top: `${10 + Math.random() * 70}%`,
    delay: Math.random() * 2
  }));

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <div className="min-h-screen" ref={heroRef}>
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="community-title text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text">
            COMMUNITY
          </h1>

          <p className="community-subtitle text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Join India's most vibrant Web3 guild. Connect, build, and ship with
            passionate developers across the nation.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {communityStats.map((stat, index) => (
              <div key={stat.label} className="community-stats stat-card neon-border rounded-xl p-6 bg-black/40 backdrop-blur-md">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-3xl font-orbitron font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Why Join <span className="gradient-text">CodeQuity?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The unfair advantage for Indian Web3 builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="neon-border rounded-xl p-8 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with the Hive Section */}
      <section className="py-20 relative overflow-hidden bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Live Channels</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Connect with the <span className="text-green-400">Hive</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct access to mentors, investors, and fellow builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Priority WhatsApp Card */}
            <a
              href="https://chat.whatsapp.com/CT8hlabuNkSJ9X5HyYvdd7"
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-950/10 hover:bg-green-950/20 transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.3)]"
            >
              <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[100px] group-hover:bg-green-500/20 transition-all duration-500" />

              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-green-400"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">
                    Join the WhatsApp Community
                  </h3>
                  <p className="text-green-200/60 mb-6 max-w-lg">
                    Get instant updates on grants, hackathons, and local meetups. Be the first to know.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-500 text-white font-bold border border-green-400/50 shadow-lg shadow-green-900/20">
                    Join Now — It's Free
                  </Button>
                </div>
              </div>
            </a>

            {/* Other Socials Grid */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Telegram", icon: Zap, color: "text-blue-400", bg: "bg-blue-950/20", border: "border-blue-500/20", link: "https://t.me/codequiity" },
                { name: "Twitter", icon: Globe, color: "text-sky-400", bg: "bg-sky-950/20", border: "border-sky-500/20", link: "https://x.com/CodequityOrg" },
                { name: "Discord", icon: Code, color: "text-indigo-400", bg: "bg-indigo-950/20", border: "border-indigo-500/20", link: "https://discord.gg/XnhwAAGe" },
                { name: "LinkedIn", icon: Users, color: "text-blue-500", bg: "bg-blue-900/20", border: "border-blue-600/20", link: "https://linkedin.com/company/codequity" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-xl border ${social.border} ${social.bg} backdrop-blur-sm flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className={`${social.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`}>
                    <social.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Map States Coverage */}
      <section className="py-20 bg-gradient-to-b from-card to-background" ref={statesRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Pan-India <span className="gradient-text">Presence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Kashmir to Kanyakumari, our guild spans across 25+ Indian states.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {indianStates.map((state, index) => (
              <div
                key={state}
                className="state-marker neon-border rounded-lg p-4 bg-card/30 backdrop-blur-sm text-center hover:bg-card/50 transition-all duration-300 border-white/5"
              >
                <div className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{state}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm inline-block mx-auto">
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 font-orbitron font-semibold hover:bg-primary/90 neon-border min-w-[200px]"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}