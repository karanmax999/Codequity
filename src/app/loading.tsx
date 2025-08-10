"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <main className="min-h-screen relative overflow-hidden royal-section-primary flex items-center justify-center">
      {/* Animated Royal Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-blue-500/10 to-amber-400/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-purple-400/10 to-blue-600/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
              linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]" />
      </div>

      {/* Loader Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Glass Spinner */}
        <div className="royal-glass-dark rounded-full p-6 mb-6">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin" />
        </div>

        {/* Gradient Loading Text */}
        <p className="text-2xl font-bold royal-gradient-blue animate-pulse">
          Loading...
        </p>
      </motion.div>
    </main>
  )
}
