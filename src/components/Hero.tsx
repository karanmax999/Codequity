'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X } from 'lucide-react'
import GSAPAnimations from './GSAPAnimations'

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/mission', label: 'Mission' },
  { href: '/community', label: 'Community' },
  { href: '/programs', label: 'Programs' },
  { href: '/contact', label: 'Contact' }
]

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
      <GSAPAnimations />
      
      {/* Enhanced Navigation with dark theme */}
      <nav 
        className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"
        data-gsap="fade-up"
        data-delay="0.1"
      >
        <div className="flex items-center justify-between">
          <div className="hover:scale-105 transition-transform duration-300">
            <Link 
              href="/" 
              className="text-2xl sm:text-3xl font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg px-2 py-1"
              aria-label="CodeQuity Home"
            >
              CodeQuity
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item, index) => (
              <div
                key={item.href}
                data-gsap="fade-up"
                data-delay={0.2 + index * 0.1}
              >
                <Link 
                  href={item.href} 
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-md px-3 py-2"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div 
              className="hover:scale-105 transition-transform duration-300"
              data-gsap="scale-in"
              data-delay="0.8"
            >
              <Button 
                className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                aria-label="Connect with us"
              >
                Connect
              </Button>
            </div>
          </div>
          
          {/* Enhanced Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-gray-300 transition-colors p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 mobile-touch-target hover:scale-110 active:scale-95 transition-transform duration-300"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu with dark theme */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-gray-950/98 backdrop-blur-md z-40 mobile-nav"
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
                <div
                  key={item.href}
                  data-gsap="slide-left"
                  data-delay={index * 0.1}
                >
                  <Link 
                    href={item.href} 
                    className="block text-gray-300 hover:text-white transition-all duration-300 py-4 px-4 hover:translate-x-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg mobile-touch-target mobile-animate hover:bg-gray-800/50"
                    onClick={closeMobileMenu}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                </div>
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
        </div>
      )}

      {/* Enhanced Hero Content with dark theme */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div
          className="text-center max-w-5xl mx-auto"
        >
          <div data-gsap="fade-up" data-delay="0.2">
            <Badge 
              className="mb-6 sm:mb-8 text-xs sm:text-sm px-6 sm:px-8 py-2 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 font-semibold tracking-wide"
            >
              ✨ THE CODEQUITY COMMUNITY ✨
            </Badge>
          </div>
          
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-10 leading-compact tracking-tight heading-cosmic"
            data-gsap="fade-up"
            data-delay="0.3"
          >
            <span className="block text-teal">
              THE CODEQUITY COMMUNITY
            </span>
            <span className="block text-base sm:text-lg md:text-xl font-medium cosmic-text-secondary mt-2 sm:mt-4 leading-compact px-4 sm:px-0">
              Building India's largest tech community through innovation, collaboration, and excellence
            </span>
          </h1>
          
          <p 
            className="text-base sm:text-lg cosmic-text-secondary mb-8 sm:mb-12 max-w-4xl mx-auto leading-compact font-medium px-4 sm:px-0"
            data-gsap="fade-up"
            data-delay="0.4"
          >
            We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs 
            to create the future of technology together. Join our community of excellence.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center px-4 sm:px-0"
            data-gsap="fade-up"
            data-delay="0.5"
          >
            <div className="hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-transform duration-300">
              <Button 
                size="lg" 
                className="btn-cosmic-primary px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-cosmic focus-cosmic"
                aria-label="Get started with CodeQuity"
              >
                👑 Get Started
              </Button>
            </div>
            <div className="hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-transform duration-300">
              <Button 
                size="lg" 
                className="btn-cosmic-secondary px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold focus-cosmic"
                aria-label="Learn more about CodeQuity"
              >
                📚 Learn More
              </Button>
            </div>
          </div>
          
          {/* Enhanced accent elements */}
          <div 
            className="flex justify-center items-center space-x-2 sm:space-x-4 mt-8 sm:mt-12 px-4 sm:px-0"
            data-gsap="fade-up"
            data-delay="0.6"
          >
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 sm:space-x-4"
                data-gsap="pulse"
                data-delay={0.7 + index * 0.2}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full shadow-cosmic" />
                {index < 2 && <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-cyan-400 to-pink-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
