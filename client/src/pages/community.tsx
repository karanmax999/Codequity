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
  const ambassadorsRef = useRef<HTMLDivElement>(null);
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

      // Ambassador cards with magnetic effect
      gsap.set(".ambassador-card", { transformOrigin: "center center" });
      
      gsap.from(".ambassador-card", {
        scrollTrigger: {
          trigger: ambassadorsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });

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

  const ambassadors = [
    {
      name: "Arjun Sharma",
      city: "Delhi",
      role: "Lead Ambassador",
      specialization: "Full Stack Development",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 12,
      rating: 4.9
    },
    {
      name: "Priya Patel",
      city: "Mumbai",
      role: "Technical Ambassador",
      specialization: "AI/ML Engineering",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b62a6ae0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 8,
      rating: 4.8
    },
    {
      name: "Rahul Verma",
      city: "Bangalore",
      role: "Community Ambassador",
      specialization: "DevOps & Cloud",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 15,
      rating: 4.9
    },
    {
      name: "Sneha Gupta",
      city: "Chennai",
      role: "Events Ambassador",
      specialization: "Mobile Development",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 10,
      rating: 4.7
    },
    {
      name: "Karan Singh",
      city: "Pune",
      role: "Technical Ambassador",
      specialization: "Web3 & Blockchain",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 9,
      rating: 4.8
    },
    {
      name: "Anita Reddy",
      city: "Hyderabad",
      role: "Community Ambassador",
      specialization: "Data Science",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      events: 7,
      rating: 4.6
    }
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

      {/* Community Ambassadors */}
      <section className="py-20 circuit-pattern" ref={ambassadorsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Meet Our <span className="gradient-text">Ambassadors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate leaders driving community growth across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador, index) => (
              <div
                key={ambassador.name}
                className="ambassador-card neon-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                data-testid={`ambassador-card-${index}`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={ambassador.avatar}
                      alt={ambassador.name}
                      className="w-16 h-16 rounded-full object-cover neon-border"
                    />
                    <div>
                      <h3 className="text-xl font-orbitron font-semibold">{ambassador.name}</h3>
                      <p className="text-sm text-accent">{ambassador.role}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {ambassador.city}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{ambassador.specialization}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-primary font-semibold">{ambassador.events}</span>
                      <span className="text-muted-foreground"> events</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{ambassador.rating}</span>
                    </div>
                  </div>
                </div>
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