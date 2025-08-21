'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-blue-400/30 rounded-full'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particlesRef.current.appendChild(particle)

        // Animate particle
        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          ease: 'none',
          delay: Math.random() * 2
        })
      }
    }

    // Create geometric shapes
    const createShapes = () => {
      if (!shapesRef.current) return
      
      const shapes = ['circle', 'square', 'triangle']
      const colors = ['rgba(59, 130, 246, 0.1)', 'rgba(255, 255, 255, 0.05)', 'rgba(147, 51, 234, 0.1)']
      
      for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div')
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        shape.className = 'absolute'
        shape.style.left = Math.random() * 100 + '%'
        shape.style.top = Math.random() * 100 + '%'
        shape.style.width = (20 + Math.random() * 60) + 'px'
        shape.style.height = (20 + Math.random() * 60) + 'px'
        shape.style.background = color
        shape.style.borderRadius = shapeType === 'circle' ? '50%' : '0'
        shape.style.transform = `rotate(${Math.random() * 360}deg)`
        
        if (shapeType === 'triangle') {
          shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }
        
        shapesRef.current.appendChild(shape)

        // Animate shape
        gsap.to(shape, {
          rotation: 360,
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          scale: 0.5 + Math.random() * 0.5,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: Math.random() * 2
        })
      }
    }

    // Create floating orbs
    const createOrbs = () => {
      if (!containerRef.current) return
      
      for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div')
        orb.className = 'absolute rounded-full blur-sm'
        orb.style.width = (80 + Math.random() * 120) + 'px'
        orb.style.height = (80 + Math.random() * 120) + 'px'
        orb.style.left = Math.random() * 100 + '%'
        orb.style.top = Math.random() * 100 + '%'
        orb.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)`
        containerRef.current.appendChild(orb)

        // Animate orb
        gsap.to(orb, {
          x: Math.random() * 300 - 150,
          y: Math.random() * 300 - 150,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.3 + Math.random() * 0.4,
          duration: 10 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: Math.random() * 3
        })
      }
    }

    // Create grid lines
    const createGrid = () => {
      if (!containerRef.current) return
      
      const grid = document.createElement('div')
      grid.className = 'absolute inset-0 opacity-10'
      grid.style.backgroundImage = `
        linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
      `
      grid.style.backgroundSize = '50px 50px'
      containerRef.current.appendChild(grid)

      // Animate grid
      gsap.to(grid, {
        backgroundPosition: '50px 50px',
        duration: 20,
        repeat: -1,
        ease: 'none'
      })
    }

    // Initialize all animations
    createParticles()
    createShapes()
    createOrbs()
    createGrid()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      
      gsap.to(containerRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      
      gsap.to(containerRef.current, {
        y: rate,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20" />
      
      {/* Animated elements */}
      <div ref={particlesRef} className="absolute inset-0" />
      <div ref={shapesRef} className="absolute inset-0" />
      
      {/* Additional visual effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
    </div>
  )
}
