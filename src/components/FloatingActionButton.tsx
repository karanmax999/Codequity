'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Royal Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full royal-button-primary royal-hover royal-focus shadow-2xl animate-royal-glow transition-all duration-300"
        style={{
          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
        }}
      >
        <span className="text-2xl">👑</span>
      </Button>

      {/* Royal expanded action buttons */}
      <div className={`absolute bottom-20 right-0 space-y-4 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button
          size="sm"
          className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg"
        >
          <span className="text-lg">💬</span>
        </Button>
        
        <Button
          size="sm"
          className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg"
        >
          <span className="text-lg">📧</span>
        </Button>
        
        <Button
          size="sm"
          className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg"
        >
          <span className="text-lg">🔗</span>
        </Button>
      </div>
    </div>
  )
} 