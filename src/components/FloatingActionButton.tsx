'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover-lift hover-glow focus-ring transition-all duration-300"
        style={{
          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
        }}
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
      </Button>

      {/* Expanded action buttons */}
      <div className={`absolute bottom-20 right-0 space-y-4 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button
          variant="outline"
          size="sm"
          className="w-12 h-12 rounded-full glass border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover-lift focus-ring shadow-lg"
        >
          <span className="text-lg">💬</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="w-12 h-12 rounded-full glass border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover-lift focus-ring shadow-lg"
        >
          <span className="text-lg">📧</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="w-12 h-12 rounded-full glass border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover-lift focus-ring shadow-lg"
        >
          <span className="text-lg">🔗</span>
        </Button>
      </div>
    </div>
  )
} 