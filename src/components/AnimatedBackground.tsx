'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  // === Utility helpers ===
  const rand = (min: number, max: number) => Math.random() * (max - min) + min
  const randInt = (min: number, max: number) => Math.floor(rand(min, max))

  useEffect(() => {
    if (!containerRef.current) return

    const createdElements: HTMLElement[] = [] // store created DOM nodes for cleanup

    // === Particles ===
    const createParticles = () => {
      if (!particlesRef.current) return

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-blue-400/30 rounded-full'
        particle.style.left = `${rand(0, 100)}%`
        particle.style.top = `${rand(0, 100)}%`
        particlesRef.current.appendChild(particle)
        createdElements.push(particle)

        gsap.to(particle, {
          y: rand(-300, -100),
          x: rand(-50, 50),
          opacity: 0,
          duration: rand(3, 7),
          repeat: -1,
          ease: 'none',
          delay: rand(0, 2)
        })
      }
    }

    // === Shapes ===
    const createShapes = () => {
      if (!shapesRef.current) return

      const shapes = ['circle', 'square', 'triangle'] as const
      const colors = [
        'rgba(59, 130, 246, 0.1)',
        'rgba(255, 255, 255, 0.05)',
        'rgba(147, 51, 234, 0.1)'
      ]

      for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div')
        const shapeType = shapes[randInt(0, shapes.length)]
        const color = colors[randInt(0, colors.length)]

        shape.className = 'absolute'
        shape.style.left = `${rand(0, 100)}%`
        shape.style.top = `${rand(0, 100)}%`
        shape.style.width = `${rand(20, 80)}px`
        shape.style.height = `${rand(20, 80)}px`
        shape.style.background = color
        shape.style.borderRadius = shapeType === 'circle' ? '50%' : '0'
        shape.style.transform = `rotate(${rand(0, 360)}deg)`
        if (shapeType === 'triangle') {
          shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }

        shapesRef.current.appendChild(shape)
        createdElements.push(shape)

        gsap.to(shape, {
          rotation: 360,
          x: rand(-100, 100),
          y: rand(-100, 100),
          scale: rand(0.5, 1),
          duration: rand(8, 12),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: rand(0, 2)
        })
      }
    }

    // === Orbs ===
    const createOrbs = () => {
      if (!containerRef.current) return

      for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div')
        orb.className = 'absolute rounded-full blur-sm'
        orb.style.width = `${rand(80, 200)}px`
        orb.style.height = `${rand(80, 200)}px`
        orb.style.left = `${rand(0, 100)}%`
        orb.style.top = `${rand(0, 100)}%`
        orb.style.background = `
          radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, 
          rgba(147, 51, 234, 0.05) 50%, 
          transparent 100%)
        `

        containerRef.current.appendChild(orb)
        createdElements.push(orb)

        gsap.to(orb, {
          x: rand(-150, 150),
          y: rand(-150, 150),
          scale: rand(0.8, 1.2),
          opacity: rand(0.3, 0.7),
          duration: rand(10, 15),
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: rand(0, 3)
        })
      }
    }

    // === Grid ===
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
      createdElements.push(grid)

      gsap.to(grid, {
        backgroundPosition: '50px 50px',
        duration: 20,
        repeat: -1,
        ease: 'none'
      })
    }

    // === Init animations ===
    createParticles()
    createShapes()
    createOrbs()
    createGrid()

    // === Mouse interaction ===
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

    // === Parallax scroll ===
    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.5
      gsap.to(containerRef.current, {
        y: rate,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
    window.addEventListener('scroll', handleScroll)

    // === Cleanup ===
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      createdElements.forEach(el => el.remove()) // remove all generated elements
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
    </div>
  )
}
