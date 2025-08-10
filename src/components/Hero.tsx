'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X } from 'lucide-react'

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/mission', label: 'Mission' },
  { href: '/partners', label: 'Partners' },
  { href: '/community', label: 'Community' },
  { href: '/contact', label: 'Contact' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Enhanced Navigation with better accessibility */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-50 p-6 royal-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="text-3xl font-bold royal-gradient-text transition-all duration-300 royal-focus focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="CodeQuity Home"
            >
              CodeQuity
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="royal-button-secondary royal-hover royal-focus"
                aria-label="Connect with us"
              >
                Connect
              </Button>
            </motion.div>
          </div>
          
          {/* Enhanced Mobile menu button */}
          <motion.button
            className="md:hidden text-slate-700 hover:text-blue-600 transition-colors royal-focus p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 royal-glass backdrop-blur-md border-b border-blue-200 z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={mobileItemVariants}
                  custom={index}
                >
                  <Link 
                    href={item.href} 
                    className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2"
                    onClick={closeMobileMenu}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileItemVariants}>
                <Button 
                  className="w-full royal-button-secondary royal-hover"
                  onClick={closeMobileMenu}
                  aria-label="Connect with us"
                >
                  Connect
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge 
              className="mb-8 text-sm px-8 py-3 royal-glass border-blue-200 text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-105 font-semibold tracking-wide"
            >
              ✨ THE CODEQUITY COMMUNITY ✨
            </Badge>
          </motion.div>
          
                <motion.h1
                className="text-5xl sm:text-7xl font-extrabold mb-10 leading-tight tracking-tight text-slate-900"
                variants={itemVariants}
                >
                <span className="block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
                  Elevate. Connect. Inspire.
                </span>
                <span className="block text-2xl sm:text-3xl font-medium text-slate-600 mt-4">
                  India’s Most Exclusive Tech Collective
                </span>
                </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
            variants={itemVariants}
          >
            We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs 
            to create the future of technology together. Join our royal community of excellence.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="royal-button-primary royal-hover royal-focus px-12 py-4 text-lg font-semibold shadow-2xl animate-royal-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Get started with CodeQuity"
              >
                👑 Get Started
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="royal-button-secondary royal-hover royal-focus px-12 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Learn more about CodeQuity"
              >
                📚 Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Royal accent elements */}
          <motion.div 
            className="flex justify-center items-center space-x-4 mt-12"
            variants={itemVariants}
          >
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-4"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.5,
                  ease: 'easeInOut'
                }}
              >
                <div className="royal-accent-dot" />
                {index < 2 && <div className="royal-divider w-24" />}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
