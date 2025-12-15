import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock, Users, Trophy, Code2, Video, Wifi, Play, Download, Zap, Star, Target, TrendingUp, Award, Sparkles, Rocket, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.timeline()
        .from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        })
        .from(".hero-subtitle", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(".hero-stats", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");

      // Cards animation with ScrollTrigger
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        rotation: 10,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Zigzag lines animation
      gsap.to(".zigzag-line", {
        strokeDashoffset: -1000,
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 0.5
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "CodeQuity Genesis Hackathon",
      date: "Q1 2025",
      time: "48 Hours",
      location: "Hybrid - Bangalore & On-Chain",
      participants: "500+",
      prize: "₹5,00,000 + Grants",
      description: "The kick-off event for our first cohort. Build infrastructure, DeFi, or AI agents on partner L2s.",
      type: "Hackathon",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "Zero-to-Dapp Bootcamp",
      date: "February 2025",
      time: "2 Weeks",
      location: "Virtual",
      participants: "200+",
      prize: "Certification",
      description: "Intensive crash course on Solidity, React, and connecting wallets. Pre-requisite for the Genesis Hackathon.",
      type: "Bootcamp",
      status: "Early Bird",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "The Pitch: Demo Day",
      date: "April 2025",
      time: "1 Day",
      location: "Mumbai",
      participants: "VC Invite Only",
      prize: "Seed Funding",
      description: "Top 10 teams from the shipping sprint present to a panel of Web3 VCs and Angel Investors.",
      type: "Demo Day",
      status: "Invite Only",
      image: "https://images.unsplash.com/photo-1559136555-9303dff5a98c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const communityCalls = [
    {
      id: 4,
      title: "Weekly Town Hall",
      date: "Every Friday",
      time: "8:00 PM IST",
      location: "Discord Stage",
      participants: "300+",
      description: "Updates on the ecosystem, spotlight on builder projects, and open floor networking.",
      type: "Community",
      status: "Weekly",
      progress: 100,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 5,
      title: "Builder Office Hours",
      date: "Wednesdays",
      time: "6:00 PM IST",
      location: "Google Meet",
      participants: "50+",
      description: "Get unstuck. Senior smart contract engineers debug your code live.",
      type: "Support",
      status: "Weekly",
      progress: 100,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const workshops = [
    {
      id: 7,
      title: "Account Abstraction Explained",
      date: "Jan 15, 2025",
      time: "7:00 PM IST",
      location: "YouTube Live",
      speaker: "Dev Rel, Biconomy",
      participants: "1000+",
      description: "Deep dive into ERC-4337 and how to build gasless dApps.",
      type: "Technical",
      status: "Register Now",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 8,
      title: "Tokenomics Masterclass",
      date: "Jan 22, 2025",
      time: "7:00 PM IST",
      location: "Discord",
      speaker: "DeFi Architect",
      participants: "500+",
      description: "Designing sustainable token economies for your Hackathon project.",
      type: "Strategy",
      status: "Register Now",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const stats = [
    { label: "Total Events", value: "25+", icon: Calendar },
    { label: "Participants", value: "3000+", icon: Users },
    { label: "Prize Money", value: "₹20L+", icon: Trophy },
    { label: "Tech Tracks", value: "3", icon: Code2 }
  ];

  return (
    <div className="min-h-screen" ref={heroRef}>
      <Navigation />

      {/* Animated Zig-Zag Lines (PRESERVED) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
              <stop offset="50%" stopColor="rgba(0, 212, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
            </linearGradient>
          </defs>

          {/* Zig-zag lines */}
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              className="zigzag-line"
              d={`M ${-100 + i * 200},${50 + i * 100} Q ${100 + i * 200},${150 + i * 100} ${300 + i * 200},${50 + i * 100} T ${700 + i * 200},${50 + i * 100}`}
              stroke="url(#zigzagGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
              style={{
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Top badges */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Building the Future
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 px-4 py-2 text-sm backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              500+ on Waitlist
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2" />
              ₹20L+ in Grants
            </Badge>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text"
            data-testid="events-page-title"
          >
            BUILDER <span className="text-white">EVENTS</span>
          </h1>

          <p className="hero-subtitle text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            🚀 The proving ground for India's best engineers. Compete, ship, and get funded.
          </p>

          {/* Enhanced call to action */}
          <div className="mb-12 space-y-4">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ⚡ <strong className="text-primary">Upcoming:</strong> Genesis Hackathon (Q1 2025) • Tokenomics Masterclass
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 font-semibold px-8 neon-border">
                <Zap className="w-5 h-5 mr-2" />
                Register for Hackathon
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/50 backdrop-blur-sm text-primary">
                <Calendar className="w-5 h-5 mr-2" />
                Full Calendar
              </Button>
            </div>
          </div>

          {/* Enhanced Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="hero-stats group bg-card/40 backdrop-blur-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <stat.icon className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  <div className="mt-3">
                    <Progress value={75 + index * 5} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick info section */}
          <Separator className="my-12 max-w-2xl mx-auto opacity-30" />
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              <Target className="w-4 h-4 inline mr-2" />
              Next Major Event: <span className="text-primary font-semibold">Genesis Hackathon</span> • Q1 2025
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Events Section with Tabs */}
      <section className="py-20 relative" ref={cardsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Event <span className="gradient-text">Calendar</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic interventions to accelerate your Web3 journey.
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12 bg-black/50 border border-white/10">
              <TabsTrigger value="upcoming" className="text-sm">Hackathons</TabsTrigger>
              <TabsTrigger value="community" className="text-sm">Community</TabsTrigger>
              <TabsTrigger value="workshops" className="text-sm">Workshops</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="event-card group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 neon-border"
                    data-testid={`event-card-${event.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${event.status === 'Registration Open' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                            event.status === 'Invite Only' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                          {event.status}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-orbitron font-semibold leading-tight text-white">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-xs text-white/80">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-xs text-white/80">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-xs text-white/80">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-accent" />
                          <span className="text-xs text-white/80">{event.prize}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:opacity-90 transition-opacity neon-border"
                          data-testid={`button-register-event-${event.id}`}
                        >
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {communityCalls.map((event) => (
                  <div
                    key={event.id}
                    className="event-card group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-xl border border-green-500/30 hover:border-green-400 transition-all duration-500 hover:scale-105"
                    data-testid={`ongoing-event-${event.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm animate-pulse">
                          <Wifi className="w-3 h-3 inline mr-1" />
                          {event.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-orbitron font-semibold leading-tight text-white">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-white/80">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-white/80">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-white/80">{event.location}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                          data-testid={`button-join-event-${event.id}`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Join Discord
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshops" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {workshops.map((event) => (
                  <div
                    key={event.id}
                    className="event-card group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:scale-105"
                    data-testid={`webinar-${event.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                          <Video className="w-3 h-3 inline mr-1" />
                          Virtual
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-orbitron font-semibold leading-tight text-white">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>

                      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-sm font-medium text-purple-300">Speaker</div>
                        <div className="text-xs text-muted-foreground">{event.speaker}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-white/80">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-white/80">{event.time}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                          data-testid={`button-register-webinar-${event.id}`}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}