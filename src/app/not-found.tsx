"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden royal-section-primary flex items-center justify-center">
      {/* Royal Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-blue-500/10 to-purple-400/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-purple-400/10 to-blue-600/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-pink-500/10 to-purple-500/10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle Grid */}
        <div className="absolute inset-0 
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
              linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]" />

        {/* Accent Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/20 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto px-6 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
        >
          404
        </motion.h1>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-xl text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 
                                        hover:from-blue-700 hover:to-purple-700 
                                        text-white px-8 py-3 text-lg">
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
