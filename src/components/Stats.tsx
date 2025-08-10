'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { number: '500+', label: 'International Participants', icon: '🌍' },
  { number: '2', label: 'Flagship National Events', icon: '🏆' },
  { number: '10+', label: 'Major and Minor Events', icon: '🎯' },
  { number: '25+', label: 'Institutions Reached', icon: '🏛️' },
  { number: '5+', label: 'Community Partners', icon: '🤝' },
  { number: '10+', label: 'Ambassadors and Evangelists', icon: '⭐' },
  { number: '25+', label: 'Indian States and UTs', icon: '🇮🇳' },
  { number: '10+', label: 'Countries Reached', icon: '🌎' },
  { number: '5+', label: 'Sponsors and Partners', icon: '💼' },
]

export default function Stats() {
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

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-24 px-6 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 glass-dark opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Building India's largest{' '}
            <span className="gradient-text-blue">tech community</span>
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Our community has grown exponentially, reaching across borders and bringing together tech enthusiasts 
            from around the world to create something extraordinary.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`glass border-white/20 text-center transition-all duration-700 hover:scale-110 hover-lift hover-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-8">
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-3 gradient-text-blue">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80 leading-tight font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional call-to-action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-white/70 mb-6">
            Join thousands of developers, designers, and innovators
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-glow" />
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  )
} 