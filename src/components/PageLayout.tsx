'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Breadcrumb from './Breadcrumb'
import BackToTop from './BackToTop'
import PageTransition from './PageTransition'
import ProgressBar from './ProgressBar'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  breadcrumbItems: Array<{
    label: string
    href?: string
  }>
}

export default function PageLayout({ children, title, description, breadcrumbItems }: PageLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ProgressBar />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              CodeQuity
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
              <Link href="/mission" className="text-white/80 hover:text-white transition-colors">Mission</Link>
              <Link href="/partners" className="text-white/80 hover:text-white transition-colors">Partners</Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">Community</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Connect
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors py-2">About</Link>
              <Link href="/mission" className="block text-white/80 hover:text-white transition-colors py-2">Mission</Link>
              <Link href="/partners" className="block text-white/80 hover:text-white transition-colors py-2">Partners</Link>
              <Link href="/community" className="block text-white/80 hover:text-white transition-colors py-2">Community</Link>
              <Link href="/contact" className="block text-white/80 hover:text-white transition-colors py-2">Contact</Link>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Connect
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <PageTransition>
        <div className="container mx-auto px-4 py-16">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          {children}
        </div>
      </PageTransition>
      
      <BackToTop />
    </main>
  )
} 