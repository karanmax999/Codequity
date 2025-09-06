// import codeQuityLogo from "@assets/WhatsApp Image 2025-08-09 at 23.54.36_e9b4a964_1756273841031.jpg";
import codeQuityLogo from "@assets/codequity-logo.jpg";

import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/codequity", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/codequity", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/codequity", label: "LinkedIn" },
    { icon: Mail, href: "mailto:codequitycommunity@gmail.com", label: "Email" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 border-t border-border/20" data-testid="footer">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={codeQuityLogo} 
                  alt="CodeQuity Logo" 
                  className="w-16 h-16 object-contain rounded-lg shadow-lg border border-border/20"
                  data-testid="footer-logo-image"
                />
              </motion.div>
              <div>
                <h3 className="text-3xl font-orbitron font-bold gradient-text" data-testid="footer-logo-text">
                  CodeQuity
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  India's Premier Tech Community
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-muted-foreground mb-6 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Together, we're building the future of Indian tech! 🇮🇳
              <br />
              <span className="text-sm text-primary/80">Made with ❤️ for the Indian developer community</span>
            </motion.p>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-all duration-300 border border-border/20"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              className="font-semibold text-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              className="space-y-3 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                { label: "Events", href: "/events" },
                { label: "Community", href: "/community" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" }
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4 
              className="font-semibold text-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Connect
            </motion.h4>
            <motion.div 
              className="space-y-3 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>India</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:codequitycommunity@gmail.com" className="hover:text-primary transition-colors">
                  codequitycommunity@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91-9582520423</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CodeQuity. All rights reserved. 
              <span className="ml-2 text-primary">Community Love Made in India 🇮🇳</span>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
