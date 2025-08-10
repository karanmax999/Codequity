'use client'

import { useState, useEffect } from 'react'
import FeatureCard from './FeatureCard'

const features = [
  {
    title: 'Innovation Hub',
    description: 'Connect with cutting-edge developers and explore the latest technologies in our innovation ecosystem.',
    icon: '🚀',
    gradient: 'blue' as const
  },
  {
    title: 'Community Events',
    description: 'Participate in hackathons, workshops, and meetups that bring together tech enthusiasts worldwide.',
    icon: '🎯',
    gradient: 'green' as const
  },
  {
    title: 'Learning Resources',
    description: 'Access curated learning materials, tutorials, and mentorship programs to accelerate your growth.',
    icon: '📚',
    gradient: 'purple' as const
  },
  {
    title: 'Global Network',
    description: 'Join a diverse community spanning multiple countries, cultures, and technical backgrounds.',
    icon: '🌍',
    gradient: 'pink' as const
  }
]

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('features-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features-section" className="py-24 px-6 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 glass-dark opacity-40" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="gradient-text-blue">CodeQuity</span>
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Discover the unique advantages that make our community the premier destination for tech enthusiasts, 
            developers, and innovators worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.2}s`
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
        
        {/* Bottom accent */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 text-white/60">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm">Join thousands of developers worldwide</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  )
} 