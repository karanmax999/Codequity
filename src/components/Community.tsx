"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, easeInOut } from "framer-motion"
import { Twitter, MessageCircle, Users, Globe, Calendar, Star } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay }
  })
}

const motionOrb = (extraDelay = 0) => ({
  animate: { y: [0, -15, 0] },
  transition: { duration: 6 + extraDelay, repeat: Infinity, ease: easeInOut, delay: extraDelay }
})

const communityStats = [
  { icon: Users, label: "500+ Members", value: "500+", description: "Active developers" },
  { icon: Globe, label: "25+ States", value: "25+", description: "Pan-India presence" },
  { icon: Calendar, label: "6+ Events", value: "6+", description: "This year" },
  { icon: Star, label: "10+ Ambassadors", value: "10+", description: "Community leaders" }
]

export default function Community() {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 relative overflow-hidden" aria-labelledby="community-heading">
      
      {/* Dark theme background */}
      <div className="absolute inset-0 -z-10">
        {/* Layered dark backgrounds */}
        <div className="absolute inset-0 bg-[var(--dark-bg-primary)]" />
        <div className="absolute inset-0 bg-[var(--dark-bg-secondary)] opacity-30" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Subtle accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--dark-accent)]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--dark-accent)]/10 to-transparent" />
        
        {/* Minimal animated orbs */}
        <motion.div
          className="absolute -top-20 left-1/4 w-72 h-72 rounded-full blur-2xl bg-[var(--dark-accent)]/5 minimal-motion"
          {...motionOrb(0)}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl bg-[var(--dark-accent)]/5 minimal-motion"
          {...motionOrb(1)}
        />
      </div>

      <div className="max-w-7xl mx-auto text-white relative z-10">
        
        {/* Community Stats Section */}
        <motion.div
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 section-cosmic"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 heading-cosmic">
              Our Growing <span className="text-cosmic-gradient">Community</span>
            </h2>
            <p className="text-base sm:text-lg cosmic-text-secondary max-w-3xl mx-auto leading-compact">
              Join thousands of developers, designers, and innovators who are already part of our vibrant tech ecosystem
            </p>
          </div>
          
          <div className="stats-grid">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={0.2 + index * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-cosmic-card border-cosmic rounded-xl p-6 hover:border-cyan-400 transition-all duration-300 hover:scale-105 shadow-cosmic hover:shadow-cosmic-pink cosmic-shimmer focus-cosmic">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full mb-4 cosmic-glow">
                    <stat.icon className="w-8 h-8 text-cosmic-cyan" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-cosmic-gradient mb-2">{stat.value}</div>
                  <div className="text-sm cosmic-text-secondary font-medium">{stat.label}</div>
                  <div className="text-xs cosmic-text-muted mt-1">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Social CTAs */}
          <div className="social-cards">
            {/* Twitter Card */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="social-card">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full cosmic-glow">
                    <Twitter className="w-10 h-10 text-cosmic-cyan" />
                  </div>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 cosmic-text-primary">Follow Us on X (Twitter)</h3>
                <p className="cosmic-text-secondary mb-6 text-sm sm:text-base leading-compact">
                  Stay updated with our latest events, tech insights, and community highlights.
                  Join the conversation with fellow developers and innovators.
                </p>
                <a
                  href="https://x.com/CodeQuity" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  tabIndex={-1}
                >
                  <Button className="btn-cosmic-primary w-full focus-cosmic">
                    Follow on X
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              variants={fadeUp}
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="social-card">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full cosmic-glow">
                    <MessageCircle className="w-10 h-10 text-cosmic-cyan" />
                  </div>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 cosmic-text-primary">Join Our WhatsApp Community</h3>
                <p className="cosmic-text-secondary mb-6 text-sm sm:text-base leading-compact">
                  Connect directly with our members, get instant event updates, 
                  share knowledge, and network with tech enthusiasts.
                </p>
                <a
                  href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  tabIndex={-1}
                >
                  <Button className="btn-cosmic-primary w-full focus-cosmic">
                    Join WhatsApp Group
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-cosmic-card border-cosmic rounded-2xl p-8 sm:p-12 mb-8 shadow-cosmic hover:shadow-cosmic-pink cosmic-shimmer focus-cosmic">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 heading-cosmic">
              Ready to Get <span className="text-cosmic-gradient">Started</span>?
            </h3>
            <p className="cosmic-text-secondary mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-compact">
              Join our community and start your journey with fellow tech enthusiasts. 
              Attend events, become an ambassador, and grow your network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://lu.ma/user/CodeQuity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                tabIndex={-1}
              >
                <Button 
                  size="lg" 
                  className="btn-cosmic-secondary px-8 py-3 text-lg w-full sm:w-auto focus-cosmic"
                >
                  Attend Event
                </Button>
              </a>
              <a
                href="https://lnkd.in/eHRm4yV3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                tabIndex={-1}
              >
                <Button 
                  size="lg" 
                  className="btn-cosmic-secondary px-8 py-3 text-lg w-full sm:w-auto focus-cosmic"
                >
                  Become Ambassador
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Community Values Section */}
        <motion.div
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 heading-cosmic">
            Our <span className="text-cosmic-gradient">Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Innovation", description: "Fostering creativity and pushing technological boundaries" },
              { title: "Collaboration", description: "Building together through shared knowledge and teamwork" },
              { title: "Excellence", description: "Striving for the highest quality in everything we do" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                custom={0.7 + index * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-cosmic-card border-cosmic rounded-xl p-6 hover:border-cyan-400 transition-all duration-300 shadow-cosmic hover:shadow-cosmic-pink cosmic-shimmer focus-cosmic"
              >
                <h4 className="text-xl font-bold cosmic-text-primary mb-3">{value.title}</h4>
                <p className="cosmic-text-secondary text-sm leading-compact">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
