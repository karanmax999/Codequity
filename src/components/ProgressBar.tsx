'use client'

import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-2 z-50">
      {/* Cosmic background track */}
      <div className="absolute inset-0 bg-cosmic-card/30 backdrop-blur-sm" />
      
      {/* Cosmic progress bar */}
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 transition-all duration-300 ease-out relative overflow-hidden shadow-cosmic"
        style={{ width: `${progress}%` }}
      >
        {/* Cosmic shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent cosmic-shimmer" />
        
        {/* Cosmic glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-pink-400/50 to-yellow-400/50 blur-sm" />
      </div>
      
      {/* Cosmic top border accent */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 opacity-60" />
    </div>
  )
} 