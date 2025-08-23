'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin safely
if (typeof window !== 'undefined' && gsap) {
  gsap.registerPlugin(ScrollTrigger)
}

// ----------------------
// Animation Configs
// ----------------------
const animationConfigs: Record<
  string,
  (el: HTMLElement, opts: { delay: number; duration: number }) => gsap.core.Tween
> = {
  'fade-up': (el, { delay, duration }) =>
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        delay,
        duration,
        ease: 'power2.out',
        scrollTrigger: defaultScrollTrigger(el),
      }
    ),

  'fade-in': (el, { delay, duration }) =>
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        delay,
        duration,
        ease: 'power2.out',
        scrollTrigger: defaultScrollTrigger(el),
      }
    ),

  'scale-in': (el, { delay, duration }) =>
    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        delay,
        duration,
        ease: 'back.out(1.7)',
        scrollTrigger: defaultScrollTrigger(el),
      }
    ),

  'slide-left': (el, { delay, duration }) =>
    gsap.fromTo(
      el,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        delay,
        duration,
        ease: 'power2.out',
        scrollTrigger: defaultScrollTrigger(el),
      }
    ),

  'slide-right': (el, { delay, duration }) =>
    gsap.fromTo(
      el,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        delay,
        duration,
        ease: 'power2.out',
        scrollTrigger: defaultScrollTrigger(el),
      }
    ),
}

// Default ScrollTrigger config
function defaultScrollTrigger(element: Element): ScrollTrigger.Vars {
  return {
    trigger: element,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  }
}

// ----------------------
// Main Component
// ----------------------
export default function GSAPAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based animations
      gsap.utils.toArray<HTMLElement>('[data-gsap]').forEach((el) => {
        const type = el.dataset.gsap || ''
        const delay = parseFloat(el.dataset.delay || '0')
        const duration = parseFloat(el.dataset.duration || '1')

        animationConfigs[type]?.(el, { delay, duration })
      })

      // Parallax effects
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.5')

        gsap.to(el, {
          y: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}

// ----------------------
// Extra Utilities
// ----------------------
export const gsapUtils = {
  stagger(elements: Element[], animation: any, stagger = 0.1) {
    return gsap.fromTo(
      elements,
      animation.from || { opacity: 0, y: 30 },
      {
        ...animation.to,
        stagger,
        ease: animation.ease || 'power2.out',
        scrollTrigger: animation.scrollTrigger || defaultScrollTrigger(elements[0]),
      }
    )
  },

  textReveal(element: Element, opts: { delay?: number; duration?: number; ease?: string } = {}) {
    const { delay = 0, duration = 1, ease = 'power2.out' } = opts
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, delay, duration, ease, scrollTrigger: defaultScrollTrigger(element) }
    )
  },

  floating(element: Element, opts: { y?: number; duration?: number; ease?: string; delay?: number } = {}) {
    const { y = 10, duration = 3, ease = 'sine.inOut', delay = 0 } = opts
    return gsap.to(element, { y, duration, ease, delay, repeat: -1, yoyo: true })
  },

  pulse(element: Element, opts: { scale?: number; duration?: number; ease?: string; delay?: number } = {}) {
    const { scale = 1.1, duration = 2, ease = 'sine.inOut', delay = 0 } = opts
    return gsap.to(element, { scale, duration, ease, delay, repeat: -1, yoyo: true })
  },
}
