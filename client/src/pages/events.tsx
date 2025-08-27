import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, Trophy, Code2, Video, Wifi, Play, Download } from "lucide-react";

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
      title: "CodeQuity Mega Hackathon 2024",
      date: "March 15-17, 2024",
      time: "48 Hours",
      location: "Hybrid - Delhi & Virtual",
      participants: "500+",
      prize: "₹5,00,000",
      description: "The biggest hackathon of the year featuring AI/ML, Web3, and Mobile Development tracks.",
      type: "Hackathon",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "AI/ML Masterclass Series",
      date: "March 22-24, 2024",
      time: "3 Days",
      location: "Bangalore",
      participants: "200+",
      prize: "Certificates",
      description: "Learn from industry experts at Google, Microsoft, and Amazon about cutting-edge AI/ML technologies.",
      type: "Workshop",
      status: "Early Bird",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "Web3 Developer Bootcamp",
      date: "April 5-7, 2024",
      time: "3 Days",
      location: "Mumbai",
      participants: "150+",
      prize: "NFT Certificates",
      description: "Intensive bootcamp covering blockchain development, smart contracts, and DeFi protocols.",
      type: "Bootcamp",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const ongoingEvents = [
    {
      id: 4,
      title: "30-Day Code Challenge",
      date: "Feb 1 - Mar 2, 2024",
      time: "Daily",
      location: "Virtual",
      participants: "1200+",
      description: "Daily coding challenges to sharpen your skills across multiple programming languages.",
      type: "Challenge",
      status: "Live Now",
      progress: 75,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 5,
      title: "Weekly Tech Talks",
      date: "Every Friday",
      time: "7:00 PM IST",
      location: "Discord Live",
      participants: "300+",
      description: "Industry experts share insights on latest technologies and career guidance.",
      type: "Tech Talk",
      status: "Live Now",
      progress: 100,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 6,
      title: "Open Source Sprint",
      date: "Feb 15 - Mar 15, 2024",
      time: "1 Month",
      location: "GitHub",
      participants: "800+",
      description: "Contribute to open source projects and earn recognition in the developer community.",
      type: "Sprint",
      status: "Live Now",
      progress: 60,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const webinars = [
    {
      id: 7,
      title: "Future of AI in Software Development",
      date: "March 10, 2024",
      time: "6:00 PM IST",
      location: "Zoom",
      speaker: "Dr. Priya Sharma, Google AI",
      participants: "500+",
      description: "Explore how AI is revolutionizing software development and what it means for developers.",
      type: "Webinar",
      status: "Register Now",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 8,
      title: "Building Scalable Microservices",
      date: "March 17, 2024",
      time: "7:00 PM IST",
      location: "YouTube Live",
      speaker: "Rajesh Kumar, Microsoft",
      participants: "800+",
      description: "Learn best practices for designing and implementing microservices architecture.",
      type: "Webinar",
      status: "Register Now",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 9,
      title: "Career Growth for Developers",
      date: "March 24, 2024",
      time: "6:30 PM IST",
      location: "Teams",
      speaker: "Ankit Verma, Amazon",
      participants: "600+",
      description: "Strategies for advancing your tech career and building a strong professional network.",
      type: "Webinar",
      status: "Register Now",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const stats = [
    { label: "Total Events", value: "25+", icon: Calendar },
    { label: "Participants", value: "3000+", icon: Users },
    { label: "Prize Money", value: "₹20L+", icon: Trophy },
    { label: "Tech Tracks", value: "15+", icon: Code2 }
  ];

  return (
    <div className="min-h-screen" ref={heroRef}>
      <Navigation />
      
      {/* Animated Zig-Zag Lines */}
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
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text"
            data-testid="events-page-title"
          >
            EVENTS
          </h1>
          
          <p className="hero-subtitle text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Join India's most exciting tech events. From hackathons to conferences, 
            level up your skills and network with the best.
          </p>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="hero-stats stat-card neon-border rounded-xl p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-orbitron font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Events Section with Tabs */}
      <section className="py-20 relative" ref={cardsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Tech <span className="gradient-text">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From hackathons to webinars, discover events that shape the future of technology.
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-12">
              <TabsTrigger value="upcoming" className="text-sm">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing" className="text-sm">Live Now</TabsTrigger>
              <TabsTrigger value="webinars" className="text-sm">Webinars</TabsTrigger>
              <TabsTrigger value="past" className="text-sm">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="event-card group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105"
                    data-testid={`event-card-${event.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          event.status === 'Registration Open' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          event.status === 'Early Bird' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
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
                      <h3 className="text-xl font-orbitron font-semibold leading-tight">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.participants}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
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

            <TabsContent value="ongoing" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ongoingEvents.map((event) => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm animate-pulse">
                          <Wifi className="w-3 h-3 inline mr-1" />
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
                      <h3 className="text-xl font-orbitron font-semibold leading-tight">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{event.progress}%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${event.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.participants}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.time}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                          data-testid={`button-join-event-${event.id}`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Join Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webinars" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {webinars.map((event) => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                          <Video className="w-3 h-3 inline mr-1" />
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
                      <h3 className="text-xl font-orbitron font-semibold leading-tight">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                      
                      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-sm font-medium text-purple-300">Speaker</div>
                        <div className="text-xs text-muted-foreground">{event.speaker}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          <span className="text-xs">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent/60" />
                          <span className="text-xs">{event.participants}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                          data-testid={`button-register-webinar-${event.id}`}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Register for Webinar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="text-center py-12">
                <h3 className="text-2xl font-orbitron font-semibold mb-4">Past Events Archive</h3>
                <p className="text-muted-foreground mb-8">Browse through our collection of successful events and download resources.</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Download className="w-4 h-4 mr-2" />
                  View Event Archive
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}