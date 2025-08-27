import { Mail, Users, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "General Inquiries",
      detail: "hello@codequity.in",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Partnerships",
      detail: "partners@codequity.in",
      color: "text-accent",
    },
    {
      icon: Calendar,
      title: "Events",
      detail: "events@codequity.in",
      color: "text-primary",
    },
  ];

  const socialPlatforms = [
    {
      name: "Twitter/X",
      handle: "@CodeQuity",
      icon: "fab fa-twitter",
      color: "text-blue-400",
      url: "https://x.com/CodeQuity"
    },
    {
      name: "LinkedIn",
      handle: "CodeQuity Community",
      icon: "fab fa-linkedin",
      color: "text-blue-600",
      url: "https://www.linkedin.com/company/codequitycommunity/"
    },
    {
      name: "WhatsApp",
      handle: "Join Group",
      icon: "fab fa-whatsapp",
      color: "text-green-500",
      url: "https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich"
    },
    {
      name: "Instagram",
      handle: "@codequity_official",
      icon: "fab fa-instagram",
      color: "text-pink-500",
      url: "https://www.instagram.com/codequity_official/"
    },
  ];

  return (
    <section id="contact" className="py-20 circuit-pattern" data-testid="contact-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Get <span className="gradient-text">Connected</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community through various platforms and start your journey with India's premier tech community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-orbitron font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  className="flex items-center gap-4 p-4 neon-border rounded-lg bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`contact-info-${contact.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`text-2xl ${contact.color}`}>
                    <contact.icon />
                  </div>
                  <div>
                    <div className="font-semibold">{contact.title}</div>
                    <div className="text-muted-foreground">{contact.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Platforms */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-orbitron font-semibold mb-6">Join Our Community</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 neon-border rounded-lg bg-card hover:bg-card/80 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`social-link-${platform.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                >
                  <div className={`text-2xl ${platform.color}`}>
                    <i className={platform.icon}></i>
                  </div>
                  <div>
                    <div className="font-semibold">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">{platform.handle}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                </motion.a>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground py-4 px-6 font-orbitron font-semibold hover:bg-primary/90 neon-border"
                data-testid="button-join-events"
              >
                <a href="https://luma.com/CodeConnect?k=c" target="_blank" rel="noopener noreferrer">
                  Join Our Events
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary py-4 px-6 font-orbitron font-semibold hover:bg-primary/10 neon-border"
                data-testid="button-join-whatsapp"
              >
                <a href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" target="_blank" rel="noopener noreferrer">
                  Join WhatsApp Group
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
