'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MovingTrain() {
  const trainRef = useRef<HTMLDivElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trainRef.current || !smokeRef.current) return

    const ctx = gsap.context(() => {
      // Train movement animation
      gsap.to(trainRef.current, {
        x: '100vw',
        duration: 15,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (window.innerWidth + 400))
        }
      })

      // Smoke animation
      if (smokeRef.current?.children) {
        gsap.to(smokeRef.current.children, {
          y: -100,
          opacity: 0,
          duration: 2,
          stagger: 0.3,
          repeat: -1,
          ease: 'power1.out'
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute bottom-20 left-0 right-0 z-0 pointer-events-none">
      {/* Smoke particles */}
      <div ref={smokeRef} className="absolute -top-20 left-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full opacity-70"
            style={{
              left: `${i * 8}px`,
              top: '0px'
            }}
          />
        ))}
      </div>

      {/* Train */}
      <div
        ref={trainRef}
        className="relative w-64 h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-2xl border-2 border-gray-600 transform -translate-x-full"
      >
        {/* Train windows */}
        <div className="absolute top-2 left-4 w-8 h-6 bg-blue-400 rounded-md border border-blue-300" />
        <div className="absolute top-2 left-16 w-8 h-6 bg-blue-400 rounded-md border border-blue-300" />
        <div className="absolute top-2 left-28 w-8 h-6 bg-blue-400 rounded-md border border-blue-300" />
        
        {/* Train details */}
        <div className="absolute top-0 left-0 w-6 h-4 bg-red-600 rounded-tl-lg" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-600" />
        
        {/* Wheels */}
        <div className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700" />
        <div className="absolute -bottom-2 left-16 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700" />
        <div className="absolute -bottom-2 left-28 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700" />
        <div className="absolute -bottom-2 left-40 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700" />
        
        {/* Headlight */}
        <div className="absolute top-4 right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_20px_5px_rgba(255,255,0,0.6)]" />
        
        {/* Cosmic glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-lg" />
      </div>

      {/* Tracks */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-600/80 rounded-full" />
      <div className="absolute bottom-1 left-0 right-0 h-px bg-gray-400/60" />
    </div>
  )
}
