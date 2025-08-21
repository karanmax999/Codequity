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
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 heading-bold">
              Our Growing <span className="text-teal">Community</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-compact">
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
                <div className="card border-teal/20 rounded-xl p-6 hover:border-teal/50 transition-all duration-300 hover:scale-105 minimal-motion focus-improved">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/10 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-teal" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
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
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-teal/10 rounded-full">
                    <Twitter className="w-10 h-10 text-teal" />
                  </div>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Follow Us on X (Twitter)</h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base leading-compact">
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
                  <Button className="bg-teal hover:bg-teal/90 text-gray-900 w-full mobile-button focus-improved">
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
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-teal/10 rounded-full">
                    <MessageCircle className="w-10 h-10 text-teal" />
                  </div>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Join Our WhatsApp Community</h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base leading-compact">
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
                  <Button className="bg-teal hover:bg-teal/90 text-gray-900 w-full mobile-button focus-improved">
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
          <div className="card border-teal/20 rounded-2xl p-8 sm:p-12 mb-8 minimal-motion focus-improved">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white heading-bold">
              Ready to Get <span className="text-teal">Started</span>?
            </h3>
            <p className="text-gray-300 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-compact">
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
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-teal text-teal hover:bg-teal hover:text-gray-900 px-8 py-3 text-lg w-full sm:w-auto mobile-button focus-improved"
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
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-teal text-teal hover:bg-teal hover:text-gray-900 px-8 py-3 text-lg w-full sm:w-auto mobile-button focus-improved"
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
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-white heading-bold">
            Our <span className="text-teal">Values</span>
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
                className="card border-teal/20 rounded-xl p-6 hover:border-teal/50 transition-all duration-300 minimal-motion focus-improved"
              >
                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-300 text-sm leading-compact">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
