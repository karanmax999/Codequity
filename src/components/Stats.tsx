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
    <section id="stats-section" className="py-24 px-6 relative royal-section-primary">
      {/* Royal background overlay */}
      <div className="absolute inset-0 royal-glass opacity-40" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Building India's largest{' '}
            <span className="royal-gradient-text">tech community</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Our community has grown exponentially, reaching across borders and bringing together tech enthusiasts 
            from around the world to create something extraordinary.
          </p>
          
          {/* Royal crown accent */}
          <div className="flex justify-center mt-8">
            <div className="text-4xl animate-royal-float">👑</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`royal-card text-center transition-all duration-700 royal-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-10">
                <div className="text-5xl mb-4 animate-royal-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-4 royal-gradient-blue">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 leading-tight font-semibold">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Royal call-to-action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-slate-500 mb-8 font-medium">
            Join thousands of developers, designers, and innovators
          </p>
          <div className="flex justify-center space-x-6">
            <div className="royal-accent-dot animate-royal-pulse" />
            <div className="royal-accent-dot animate-royal-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="royal-accent-dot animate-royal-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  )
} 