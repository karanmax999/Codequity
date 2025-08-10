'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      
      setScrollY(currentScrollY)
      setMaxScroll(documentHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollPercentage = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative">
        <div className="w-2 h-32 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>
        <div className="absolute -right-8 top-0 text-xs text-gray-400 transform -rotate-90 origin-left">
          {Math.round(scrollPercentage)}%
        </div>
      </div>
    </div>
  )
} 