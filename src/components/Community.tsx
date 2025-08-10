"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, easeInOut } from "framer-motion"
import { Twitter, MessageCircle } from "lucide-react"

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

export default function Community() {
  return (
    <section id="community" className="py-20 px-6 relative overflow-hidden" aria-labelledby="community-heading">
      
      {/* Royal animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />
        {/* Orbs */}
        <motion.div
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-[var(--royal-blue)]/10 to-[var(--royal-gold)]/10"
          {...motionOrb(0)}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-[var(--royal-gold)]/10 to-blue-600/10"
          {...motionOrb(1)}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto text-white relative z-10">
        


        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
            {/* Twitter Card */}
            <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            >
            <Card
              className="royal-card royal-hover cursor-pointer"
              role="article"
              aria-label="Follow on Twitter"
              tabIndex={0}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
              <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
              >
          <Twitter className="w-12 h-12 text-sky-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Follow Us on X (Twitter)</h3>
              <p className="text-gray-300 mb-6">
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
          <Button className="royal-button-primary w-full">
          Follow on X
          </Button>
              </a>
              </CardContent>
            </Card>
            </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card
              className="royal-card royal-hover cursor-pointer"
              role="article"
              aria-label="Join WhatsApp Group"
              tabIndex={0}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
          >
            <MessageCircle className="w-12 h-12 text-green-400 mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">Join Our WhatsApp Community</h3>
          <p className="text-gray-300 mb-6">
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
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full">
              Join WhatsApp Group
            </Button>
          </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">Ready to Get Started?</h3>
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
              className="royal-button-secondary px-8 py-3 text-lg w-full sm:w-auto"
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
              className="royal-button-secondary px-8 py-3 text-lg w-full sm:w-auto"
              >
              Become Ambassador
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
