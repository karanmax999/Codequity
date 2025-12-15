import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Users,
  Code,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  CheckCircle,
  Loader2,
  Rocket
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();

      tl.from(".contact-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
        .from(".contact-hero-subtitle", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.5")
        .from(".contact-hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.3");

      // Contact cards animation
      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        rotation: 5,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });

      // Form animation
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Social links animation
      gsap.from(".social-link", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch with our team",
      value: "codequitycommunity@gmail.com",
      action: "mailto:codequitycommunity@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our community managers",
      value: "+91 9582520423",
      action: "tel:+919582520423"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our location in India",
      value: "CodeQuity HQ, India",
      action: "#"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Group",
      description: "Join our active community",
      value: "WhatsApp Community",
      action: "https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich"
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/CodeQuity", label: "Twitter" },
    { icon: Github, href: "https://github.com/codequity", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/codequitycommunity/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/codequity_official/", label: "Instagram" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactFormRef.current) return;

    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        contactFormRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });

        toast({
          title: "Message sent successfully! 🎉",
          description: "We'll get back to you within 24 hours.",
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden font-sans selection:bg-primary/30" ref={heroRef} onMouseMove={handleMouseMove}>
      <Navigation />

      {/* Aurora Background (Consistent with About Page) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] opacity-30 transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[100px] opacity-30 transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto perspective-1000">
            <div
              className="transition-transform duration-100 ease-out will-change-transform"
              style={{
                transform: `rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg)`
              }}
            >
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">Open for Partners</span>
              </div>

              <h1 className="contact-hero-title text-5xl md:text-7xl font-orbitron font-bold mb-6">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="contact-hero-subtitle text-xl md:text-2xl text-muted-foreground mb-6">
                Connect with India's Premier Web3 Foundry
              </p>
              <p className="contact-hero-description text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Whether you're looking to join the <span className="text-white font-medium">Guild</span>, sponsor a <span className="text-white font-medium">Hackathon</span>, or invest in our <span className="text-white font-medium">Launchpad</span> teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-10" ref={formRef}>
        <div className="container mx-auto px-6">

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-card group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105"
                data-testid={`contact-card-${index}`}
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-border">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-3">{info.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{info.description}</p>
                  <a
                    href={info.action}
                    className="text-primary hover:text-accent font-medium transition-colors"
                    data-testid={`contact-link-${index}`}
                  >
                    {info.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Main Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 neon-border">
                <h2 className="text-3xl font-orbitron font-bold mb-6">
                  Send us a <span className="gradient-text">Message</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form
                  ref={contactFormRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-testid="contact-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        className="bg-background/50 border-white/20 focus:border-primary text-white"
                        data-testid="input-first-name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        className="bg-background/50 border-white/20 focus:border-primary text-white"
                        data-testid="input-last-name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="bg-background/50 border-white/20 focus:border-primary text-white"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="bg-background/50 border-white/20 focus:border-primary text-white"
                      data-testid="input-subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-background/50 border-white/20 focus:border-primary resize-none text-white"
                      data-testid="textarea-message"
                      required
                      minLength={10}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 neon-border animate-pulse-glow"
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Community Info */}
            <div className="space-y-8">
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-orbitron font-bold mb-6">
                  Join Our <span className="gradient-text">Network</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Waitlist & Community</h4>
                      <p className="text-muted-foreground text-sm">
                        Join <span className="text-primary font-bold">500+ builders</span> submitting applications for our Q1 2025 cohort.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Rocket className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Launchpad Partners</h4>
                      <p className="text-muted-foreground text-sm">
                        Direct lines to 15+ protocols including <span className="text-white">Polygon, Aptos, and Base</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Founder Access</h4>
                      <p className="text-muted-foreground text-sm">
                        Connect directly with our core team and mentors in the official WhatsApp community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-orbitron font-bold mb-6 text-white">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-white/5 hover:border-primary/50"
                      data-testid={`social-link-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5 text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}