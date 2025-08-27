import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, Code, Lightbulb, GraduationCap, Globe, Award, Rocket } from "lucide-react";
import karanImage from "@assets/WhatsApp Image 2025-08-18 at 02.44.30_14a452d7_1756295205409.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.timeline()
        .from(".about-title", {
          rotationX: 90,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        })
        .from(".about-subtitle", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.8")
        .from(".mission-cards", {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }, "-=0.5");

      // Timeline animation
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: (index) => index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      // Team animation removed for simplicity

      // Continuous animation for floating elements
      gsap.to(".floating-icon", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1,
          from: "random"
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const missionValues = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Building India's largest tech community through innovation, collaboration, and excellence.",
      color: "text-primary"
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To create a thriving ecosystem where every developer can learn, grow, and contribute to India's tech revolution.",
      color: "text-accent"
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Inclusivity, innovation, collaboration, and excellence drive everything we do in our community.",
      color: "text-red-400"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Foundation",
      description: "CodeQuity was founded with a vision to connect developers across India and made a high value Model.",
      icon: Rocket,
      side: "left"
    },
    {
      year: "Early 2024",
      title: "First Hackathon",
      description: "Organized our first virtual hackathon with 500+ participants.",
      icon: Code,
      side: "right"
    },
    {
      year: "Mid 2024",
      title: "Community Growth",
      description: "Expanded to 15+ states with 500+ active community members.",
      icon: Users,
      side: "left"
    },
    {
      year: "Late 2024",
      title: "Major Events",
      description: "Hosted 15+ events including workshops, bootcamps, and conferences.",
      icon: Award,
      side: "right"
    },
  ];

  const team = [
    {
      name: "MAYURESH SHARMA",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Founder | Tech Entrepreneur | AWS Certified | AI Enthusiast | GGSIPU'28",
      expertise: ["Leadership", "AI/ML", "AWS Cloud", "Entrepreneurship"]
    },
    {
      name: "KARAN BANSAL",
      role: "Co-Founder & CTO",
      image: karanImage,
      bio: "ASPIRING Blockchain Developer || Solidity || DSA 😎 || Web Developer helping brands grow (either mine or someone's). Web3 enthusiast || Co-founder - @Codequity || Collaborating with communities across India!",
      expertise: ["Blockchain", "Web3", "Solidity", "Web Development"]
    }
  ];

  const achievements = [
    { label: "Community Members", value: "500+", icon: Users },
    { label: "Events Hosted", value: "25+", icon: Award },
    { label: "States Covered", value: "25+", icon: Globe },
    { label: "Industry Partners", value: "10+", icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen" ref={heroRef}>
      <Navigation />
      
      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        {[Code, Users, Lightbulb, Globe, Award, Heart].map((Icon, i) => (
          <Icon
            key={i}
            className="floating-icon absolute w-12 h-12 text-primary"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="about-title text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text">
            ABOUT US
          </h1>
          
          <p className="about-subtitle text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Discover the story behind India's premier tech community and our journey 
            towards building a connected developer ecosystem.
          </p>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {missionValues.map((item, index) => (
              <div key={item.title} className="mission-cards stat-card neon-border rounded-xl p-8">
                <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
                <h3 className="text-xl font-orbitron font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-gradient-to-b from-background to-card" ref={timelineRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small idea to India's fastest-growing tech community.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
            
            {timeline.map((item, index) => (
              <div
key={`timeline-${index}`}
                className={`timeline-item relative flex items-center mb-16 ${
                  item.side === 'left' ? 'flex-row-reverse' : 'flex-row'
                }`}
                data-testid={`timeline-item-${item.year}`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${item.side === 'left' ? 'text-right' : 'text-left'}`}>
                  <div className="neon-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
                    <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center neon-border">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 circuit-pattern" ref={teamRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate leaders driving innovation and community growth across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-card rounded-xl overflow-hidden border border-border"
                data-testid={`team-member-${index}`}
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-orbitron font-semibold mb-1 text-white">{member.name}</h3>
                    <p className="text-primary font-medium text-lg">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              Our <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Milestones that showcase our community's growth and impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-orbitron font-bold gradient-text mb-2">
                  {achievement.value}
                </div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 font-orbitron font-semibold hover:bg-primary/90 neon-border"
              data-testid="button-join-mission"
            >
              Join Our Mission
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}