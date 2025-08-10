'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a 
            href="/" 
            className="text-2xl font-bold text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 focus-ring"
          >
            CodeQuity
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/about" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 focus-ring">About</a>
            <a href="/mission" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 focus-ring">Mission</a>
            <a href="/partners" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 focus-ring">Partners</a>
            <a href="/community" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 focus-ring">Community</a>
            <a href="/contact" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 focus-ring">Contact</a>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover-lift focus-ring"
            >
              Connect
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-blue-400 transition-colors focus-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark backdrop-blur-md border-b border-white/10 animate-slide-up">
          <div className="px-6 py-4 space-y-4">
            <a href="/about" className="block text-white/80 hover:text-white transition-all duration-300 py-2 hover:translate-x-2">About</a>
            <a href="/mission" className="block text-white/80 hover:text-white transition-all duration-300 py-2 hover:translate-x-2">Mission</a>
            <a href="/partners" className="block text-white/80 hover:text-white transition-all duration-300 py-2 hover:translate-x-2">Partners</a>
            <a href="/community" className="block text-white/80 hover:text-white transition-all duration-300 py-2 hover:translate-x-2">Community</a>
            <a href="/contact" className="block text-white/80 hover:text-white transition-all duration-300 py-2 hover:translate-x-2">Contact</a>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover-lift">
              Connect
            </Button>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge 
            variant="secondary" 
            className="mb-8 text-sm px-6 py-3 glass border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            THE CODEQUITY COMMUNITY
          </Badge>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            Building India's largest tech community through{' '}
            <span className="gradient-text-blue">
              innovation
            </span>
            ,{' '}
            <span className="gradient-text-green">
              collaboration
            </span>
            , and{' '}
            <span className="gradient-text-purple">
              excellence
            </span>
          </h1>
          
          <p 
            className="text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs 
            to create the future of technology together.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold hover-lift hover-glow focus-ring shadow-2xl"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-4 text-lg font-semibold hover-lift focus-ring backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 