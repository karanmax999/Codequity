'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Spaceship() {
  const spaceshipRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spaceshipRef.current || !engineRef.current) return

    const ctx = gsap.context(() => {
      // Spaceship floating animation
      gsap.to(spaceshipRef.current, {
        y: 30,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })

      // Engine glow animation
      if (engineRef.current?.children) {
        gsap.to(engineRef.current.children, {
          scale: 1.2,
          opacity: 0.8,
          duration: 0.5,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        })
      }

      // Orbital movement
      gsap.to(spaceshipRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute top-20 right-20 z-0 pointer-events-none">
      {/* Spaceship */}
      <div
        ref={spaceshipRef}
        className="relative w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl border-2 border-purple-400/50"
      >
        {/* Cockpit */}
        <div className="absolute top-2 left-4 w-8 h-6 bg-cyan-400 rounded-full border border-cyan-300/50 backdrop-blur-sm" />
        
        {/* Wings */}
        <div className="absolute top-4 -left-4 w-8 h-4 bg-purple-700 rounded-r-lg border-r border-purple-500/50" />
        <div className="absolute top-4 -right-4 w-8 h-4 bg-purple-700 rounded-l-lg border-l border-purple-500/50" />
        
        {/* Engine glow */}
        <div ref={engineRef} className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_rgba(0,255,255,0.6)]" />
          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_rgba(0,255,255,0.6)]" />
        </div>
        
        {/* Cosmic details */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full" />
        
        {/* Star patterns */}
        <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-3 right-6 w-1 h-1 bg-yellow-300 rounded-full" />
        <div className="absolute bottom-2 left-8 w-1 h-1 bg-white rounded-full" />
      </div>

      {/* Engine trail */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-transparent rounded-t-full opacity-60" />
        <div className="w-1 h-6 bg-gradient-to-t from-cyan-400 to-transparent rounded-t-full opacity-40 mt-1" />
        <div className="w-1 h-4 bg-gradient-to-t from-cyan-400 to-transparent rounded-t-full opacity-20 mt-1" />
      </div>

      {/* Floating stars around spaceship */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 40 - 20}px`,
            left: `${Math.random() * 40 - 20}px`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  )
}
