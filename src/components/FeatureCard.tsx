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
      className={`bg-gray-900/50 backdrop-blur-md border border-gray-700 text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden relative group shadow-xl hover:shadow-2xl ${
        isHovered ? 'border-blue-400' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`} />
      
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`} />
      
      <CardHeader className="pb-4">
        <div className={`text-6xl mb-6 transition-transform duration-500 group-hover:scale-110`}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-medium">
          {description}
        </p>
        
        {/* Hover indicator */}
        <div className={`mt-6 h-1 bg-gradient-to-r ${gradientClasses[gradient]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full`} />
      </CardContent>
      
      {/* Corner accent */}
      <div className={`absolute top-4 right-4 w-4 h-4 bg-gradient-to-r ${gradientClasses[gradient]} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100`} />
    </Card>
  )
} 