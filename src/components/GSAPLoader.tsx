'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GSAPLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const particles = gsap.utils.toArray('.loader-particle')
      particles.forEach((particle: any, i) => {
        gsap.to(particle, {
          y: -20,
          rotation: 360,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        })
      })

      // Animate progress bar
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 3,
        ease: 'power2.inOut',
        onComplete: () => {
          // Main loader animation sequence
          gsap.timeline()
            .to('.loader-text', {
              y: -50,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to('.loader-content', {
              scale: 0.8,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            }, '-=0.4')
            .to(loaderRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => {
                onComplete()
              }
            })
        }
      })
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md"
    >
      <div className="loader-content relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="loader-text mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            CodeQuity
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Loading the future of tech community...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full w-0 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="loader-particle absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 
                  ? 'rgba(0, 212, 255, 0.6)' 
                  : i % 3 === 1 
                  ? 'rgba(255, 107, 157, 0.6)' 
                  : 'rgba(255, 215, 0, 0.6)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-pink-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-purple-400/10 blur-3xl" />
        </div>
      </div>
    </div>
  )
}
