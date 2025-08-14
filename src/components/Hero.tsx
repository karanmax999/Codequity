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
      {/* Enhanced Navigation with dark theme */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"
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
              className="text-2xl sm:text-3xl font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg px-2 py-1"
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
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-md px-3 py-2"
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
                className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                aria-label="Connect with us"
              >
                Connect
              </Button>
            </motion.div>
          </div>
          
          {/* Enhanced Mobile menu button */}
          <motion.button
            className="md:hidden text-white hover:text-gray-300 transition-colors p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 mobile-touch-target"
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

      {/* Enhanced Mobile Menu with dark theme */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-gray-950/98 backdrop-blur-md z-40 mobile-nav"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <span className="text-white text-lg font-semibold">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:text-gray-300 transition-colors p-2 mobile-touch-target"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Mobile menu items */}
              <div className="flex-1 px-6 py-8 space-y-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    <Link 
                      href={item.href} 
                      className="block text-gray-300 hover:text-white transition-all duration-300 py-4 px-4 hover:translate-x-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg mobile-touch-target mobile-animate hover:bg-gray-800/50"
                      onClick={closeMobileMenu}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Mobile menu footer */}
              <div className="p-6 border-t border-gray-700">
                <Button 
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 border-2 border-white mobile-button mobile-touch-target"
                  onClick={closeMobileMenu}
                  aria-label="Connect with us"
                >
                  Connect
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Content with dark theme */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge 
              className="mb-6 sm:mb-8 text-xs sm:text-sm px-6 sm:px-8 py-2 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 font-semibold tracking-wide"
            >
              ✨ THE CODEQUITY COMMUNITY ✨
            </Badge>
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-10 leading-tight tracking-tight text-white"
            variants={itemVariants}
          >
            <span className="block bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              THE CODEQUITY COMMUNITY
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl font-medium text-gray-300 mt-2 sm:mt-4 px-4 sm:px-0">
              Building India&apos;s largest tech community through innovation, collaboration, and excellence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0"
            variants={itemVariants}
          >
            We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs 
            to create the future of technology together. Join our community of excellence.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center px-4 sm:px-0"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 mobile-button"
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
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 mobile-button"
                aria-label="Learn more about CodeQuity"
              >
                📚 Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Enhanced accent elements */}
          <motion.div 
            className="flex justify-center items-center space-x-2 sm:space-x-4 mt-8 sm:mt-12 px-4 sm:px-0"
            variants={itemVariants}
          >
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-2 sm:space-x-4"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.5,
                  ease: 'easeInOut'
                }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-white rounded-full shadow-lg" />
                {index < 2 && <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-blue-400 via-white to-blue-400" />}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
