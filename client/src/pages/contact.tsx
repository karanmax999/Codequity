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
  Loader2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

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
      value: "codequity -india, India",
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
    <div className="min-h-screen" ref={heroRef}>
      <Navigation />
      
      {/* Animated Zig-Zag Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
              <stop offset="50%" stopColor="rgba(0, 212, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
            </linearGradient>
          </defs>
          
          {/* Zig-zag lines */}
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              className="zigzag-line"
              d={`M ${-100 + i * 220},${80 + i * 110} Q ${120 + i * 220},${180 + i * 110} ${340 + i * 220},${80 + i * 110} T ${680 + i * 220},${80 + i * 110}`}
              stroke="url(#zigzagGradient)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.25"
              style={{
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-bg circuit-pattern relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="contact-hero-title text-5xl md:text-7xl font-orbitron font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="contact-hero-subtitle text-xl md:text-2xl text-muted-foreground mb-6">
              Connect with India's Premier Tech Community
            </p>
            <p className="contact-hero-description text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to join our community, partner with us, or have questions about our events, 
              we'd love to hear from you. Let's build the future of Indian tech together! 🇮🇳
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative" ref={formRef}>
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
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
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
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        className="bg-background/50 border-white/20 focus:border-primary"
                        data-testid="input-first-name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        className="bg-background/50 border-white/20 focus:border-primary"
                        data-testid="input-last-name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="bg-background/50 border-white/20 focus:border-primary"
                      data-testid="input-email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="bg-background/50 border-white/20 focus:border-primary"
                      data-testid="input-subject"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-background/50 border-white/20 focus:border-primary resize-none"
                      data-testid="textarea-message"
                      required
                      minLength={10}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
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
                  Join Our <span className="gradient-text">Community</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Active Community</h4>
                      <p className="text-muted-foreground text-sm">
                        Join 3000+ developers, designers, and tech enthusiasts from across India.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Learning Together</h4>
                      <p className="text-muted-foreground text-sm">
                        Participate in workshops, hackathons, and collaborative coding sessions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Open Communication</h4>
                      <p className="text-muted-foreground text-sm">
                        Connect with like-minded individuals and industry experts in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-orbitron font-bold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
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