import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Star, Award, Heart, Code, Lightbulb, GraduationCap, Globe, Zap } from "lucide-react";

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



      // States map animation
      gsap.from(".state-marker", {
        scrollTrigger: {
          trigger: statesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.5,
          from: "random"
        },
        ease: "elastic.out(1, 0.3)"
      });

      // Parallax effect for background elements
      gsap.to(".parallax-slow", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".parallax-fast", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const communityStats = [
    { label: "Active Members", value: "500+", icon: Users, color: "text-primary" },
    { label: "States Covered", value: "25+", icon: MapPin, color: "text-accent" },
    { label: "Community Rating", value: "4.9★", icon: Star, color: "text-yellow-400" },
    { label: "Total Events", value: "25+", icon: Award, color: "text-primary" }
  ];



  const features = [
    {
      icon: Code,
      title: "Connect & Collaborate",
      description: "Join a vibrant community of developers, designers, and tech enthusiasts across India.",
      color: "text-primary"
    },
    {
      icon: Lightbulb,
      title: "Learn & Grow",
      description: "Access exclusive workshops, bootcamps, and learning resources from industry experts.",
      color: "text-accent"
    },
    {
      icon: GraduationCap,
      title: "Skill Development",
      description: "Enhance your technical skills through hands-on projects and mentorship programs.",
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
      title: "Innovation Hub",
      description: "Be part of cutting-edge projects and innovative solutions for real-world problems.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Inclusive Community",
      description: "Join a supportive environment welcoming developers of all backgrounds and skill levels.",
      color: "text-red-400"
    }
  ];

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
      
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-slow absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <div className="parallax-fast absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="community-title text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text">
            COMMUNITY
          </h1>
          
          <p className="community-subtitle text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Join India's most vibrant tech community. Connect, learn, and grow with 
            passionate developers across the nation.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {communityStats.map((stat, index) => (
              <div key={stat.label} className="community-stats stat-card neon-border rounded-xl p-6">
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
              Discover the benefits of being part of India's fastest-growing tech community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="neon-border rounded-xl p-8 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-orbitron font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* States Coverage */}
      <section className="py-20 bg-gradient-to-b from-card to-background" ref={statesRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Pan-India <span className="gradient-text">Presence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Kashmir to Kanyakumari, our community spans across 25+ Indian states.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {indianStates.map((state, index) => (
              <div
                key={state}
                className="state-marker neon-border rounded-lg p-4 bg-card/30 backdrop-blur-sm text-center hover:bg-card/50 transition-all duration-300"
                data-testid={`state-${state.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-sm font-medium">{state}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 font-orbitron font-semibold hover:bg-primary/90 neon-border"
              data-testid="button-join-community"
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