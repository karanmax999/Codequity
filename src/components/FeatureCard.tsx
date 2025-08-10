'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  gradient: 'blue' | 'gold' | 'royal' | 'navy'
  delay?: number
}

const gradientClasses = {
  blue: 'from-blue-500 to-blue-600',
  gold: 'from-amber-400 to-yellow-500',
  royal: 'from-blue-600 to-amber-500',
  navy: 'from-blue-800 to-blue-900'
}

export default function FeatureCard({ title, description, icon, gradient, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`royal-card text-center transition-all duration-500 royal-hover overflow-hidden relative group ${
        isHovered ? 'border-blue-300' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Royal gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`} />
      
      {/* Royal background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-5 blur-2xl transition-all duration-500`} />
      
      <CardHeader className="pb-4">
        <div className={`text-6xl mb-6 transition-transform duration-500 group-hover:scale-110 animate-royal-float`}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-blue-800 transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 font-medium">
          {description}
        </p>
        
        {/* Royal hover indicator */}
        <div className={`mt-6 h-1 bg-gradient-to-r ${gradientClasses[gradient]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full`} />
      </CardContent>
      
      {/* Royal corner accent */}
      <div className={`absolute top-4 right-4 w-4 h-4 bg-gradient-to-r ${gradientClasses[gradient]} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 animate-royal-pulse`} />
    </Card>
  )
} 