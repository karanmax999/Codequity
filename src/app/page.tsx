"use client"

import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import Footer from "@/components/Footer"
import ProgressBar from "@/components/ProgressBar"
import FloatingActionButton from "@/components/FloatingActionButton"
import FeaturesSection from "@/components/FeaturesSection"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Dark theme background - removed duplicate background since it's in layout */}
      
      {/* Content container with fade-up animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <ProgressBar />
        <Hero />
        <FeaturesSection />
        <Stats />
        <Footer />
        <FloatingActionButton />
      </motion.div>
    </main>
  )
}
