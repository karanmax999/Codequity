"use client"

import { motion } from "framer-motion"
import Contact from "@/components/Contact"
import PageLayout from "@/components/PageLayout"

export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-hidden royal-section-primary">
      {/* Animated, glassmorphic background */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient canvas */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />

        {/* Floating orbs with motion */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-purple-500/10 to-blue-400/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-blue-300/10 to-purple-600/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-blue-600/10 to-amber-500/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]" />

        {/* Accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Page Content fade-in animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <PageLayout
          title="Get In Touch"
          description="Have questions or want to collaborate? We'd love to hear from you!"
          breadcrumbItems={[{ label: "Contact" }]}
        >
          <Contact />
        </PageLayout>
      </motion.div>
    </main>
  )
}
