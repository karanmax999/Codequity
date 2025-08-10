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
      {/* Royal background track */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      
      {/* Royal progress bar */}
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-800 transition-all duration-300 ease-out relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        {/* Royal shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-royal-shimmer" />
        
        {/* Royal glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-amber-400/50 to-blue-700/50 blur-sm" />
      </div>
      
      {/* Royal top border accent */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-700 opacity-60" />
    </div>
  )
} 