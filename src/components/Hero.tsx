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
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 royal-nav">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a 
            href="/" 
            className="text-3xl font-bold royal-gradient-text hover:scale-105 transition-all duration-300 royal-focus"
          >
            CodeQuity
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/about" className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium">About</a>
            <a href="/mission" className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium">Mission</a>
            <a href="/partners" className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium">Partners</a>
            <a href="/community" className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium">Community</a>
            <a href="/contact" className="text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 royal-focus font-medium">Contact</a>
            <Button 
              className="royal-button-secondary royal-hover royal-focus"
            >
              Connect
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-700 hover:text-blue-600 transition-colors royal-focus"
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
        <div className="md:hidden absolute top-full left-0 right-0 royal-glass backdrop-blur-md border-b border-blue-200 animate-slide-up">
          <div className="px-6 py-4 space-y-4">
            <a href="/about" className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium">About</a>
            <a href="/mission" className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium">Mission</a>
            <a href="/partners" className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium">Partners</a>
            <a href="/community" className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium">Community</a>
            <a href="/contact" className="block text-slate-700 hover:text-blue-600 transition-all duration-300 py-2 hover:translate-x-2 font-medium">Contact</a>
            <Button className="w-full royal-button-secondary royal-hover">
              Connect
            </Button>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge 
            className="mb-8 text-sm px-8 py-3 royal-glass border-blue-200 text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-105 animate-fade-in font-semibold tracking-wide"
            style={{ animationDelay: '0.2s' }}
          >
            ✨ THE CODEQUITY COMMUNITY ✨
          </Badge>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-slate-800">Building India's largest tech community through</span>{' '}
            <span className="royal-gradient-blue block mt-2">
              innovation
            </span>
            <span className="text-slate-800">,</span>{' '}
            <span className="royal-gradient-text">
              collaboration
            </span>
            <span className="text-slate-800">, and</span>{' '}
            <span className="royal-gradient-gold">
              excellence
            </span>
          </h1>
          
          <p 
            className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed font-medium"
            style={{ animationDelay: '0.6s' }}
          >
            We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs 
            to create the future of technology together. Join our royal community of excellence.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              size="lg" 
              className="royal-button-primary royal-hover royal-focus px-12 py-4 text-lg font-semibold shadow-2xl animate-royal-glow"
            >
              👑 Get Started
            </Button>
            <Button 
              size="lg" 
              className="royal-button-secondary royal-hover royal-focus px-12 py-4 text-lg font-semibold"
            >
              📚 Learn More
            </Button>
          </div>
          
          {/* Royal accent elements */}
          <div className="flex justify-center items-center space-x-4 mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="royal-accent-dot animate-royal-pulse" />
            <div className="royal-divider w-24" />
            <div className="royal-accent-dot animate-royal-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="royal-divider w-24" />
            <div className="royal-accent-dot animate-royal-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  )
} 