"use client"

import { motion } from "framer-motion"
import About from '@/components/About'
import PageLayout from '@/components/PageLayout'

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Modern animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20" />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 blur-3xl"
          animate={{ 
            y: [0, -15, 0],
            scale: [0.9, 1.1, 0.9],
            rotate: [180, 360, 180]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Accent lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent" />
      </div>
      
      {/* Content with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <PageLayout
          title="About CodeQuity"
          description="Empowering the next generation of tech innovators through community, collaboration, and cutting-edge technology."
          breadcrumbItems={[{ label: 'About' }]}
        >
          <About />
        </PageLayout>
      </motion.div>
    </main>
  )
}
