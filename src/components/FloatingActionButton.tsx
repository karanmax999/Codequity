'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Royal Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 rounded-full royal-button-primary royal-hover royal-focus shadow-2xl animate-royal-glow transition-transform duration-300 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label="Open actions"
      >
        <span className="text-2xl">👑</span>
      </Button>

      {/* Royal expanded action buttons */}
      <div
        className={`absolute bottom-20 right-0 space-y-4 transition-all duration-500 ${
          isExpanded
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Link href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" passHref>
          <Button
            asChild
            size="sm"
            className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Chat"
          >
            <span className="text-lg">💬</span>
          </Button>
        </Link>

        <a
          href="https://www.instagram.com/codequity_official/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
        >
          <Button
            asChild
            size="sm"
            className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-lg">📧</span>
          </Button>
        </a>

        <a
          href="https://www.linkedin.com/company/codequitycommunity/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link"
        >
          <Button
            asChild
            size="sm"
            className="w-12 h-12 rounded-full royal-glass border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 royal-hover royal-focus shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-lg">🔗</span>
          </Button>
        </a>
      </div>
    </div>
  )
}