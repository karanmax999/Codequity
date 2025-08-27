import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Trophy, Code2 } from "lucide-react";

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

      // Floating background elements
      gsap.to(".floating-element", {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const events = [
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
    },
    {
      id: 4,
      title: "Mobile Dev Conference",
      date: "April 12-13, 2024",
      time: "2 Days",
      location: "Chennai",
      participants: "300+",
      prize: "Swag & Networking",
      description: "Explore the latest in mobile development with React Native, Flutter, and native platforms.",
      type: "Conference",
      status: "Planning",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 5,
      title: "Open Source Contribution Drive",
      date: "April 20-30, 2024",
      time: "10 Days",
      location: "Virtual",
      participants: "1000+",
      prize: "GitHub Swag",
      description: "Month-long event to encourage contributions to open source projects and community building.",
      type: "Community Event",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 6,
      title: "CodeQuity Annual Summit",
      date: "May 15-16, 2024",
      time: "2 Days",
      location: "Goa",
      participants: "800+",
      prize: "Awards & Recognition",
      description: "Our biggest annual event featuring keynotes from tech leaders, networking, and celebration.",
      type: "Summit",
      status: "Save the Date",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
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
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-element absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
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

      {/* Events Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-card" ref={cardsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our lineup of amazing tech events designed to inspire, educate, and connect the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card neon-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm"
                data-testid={`event-card-${event.id}`}
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'Registration Open' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      event.status === 'Early Bird' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      event.status === 'Coming Soon' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-orbitron font-semibold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span>{event.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span>{event.prize}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full font-semibold ${
                      event.status === 'Registration Open' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                      event.status === 'Early Bird' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                      'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    }`}
                    disabled={event.status === 'Planning' || event.status === 'Save the Date'}
                    data-testid={`button-register-event-${event.id}`}
                  >
                    {event.status === 'Registration Open' ? 'Register Now' :
                     event.status === 'Early Bird' ? 'Early Bird Registration' :
                     event.status === 'Coming Soon' ? 'Notify Me' :
                     event.status === 'Planning' ? 'Coming Soon' :
                     'Save the Date'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}