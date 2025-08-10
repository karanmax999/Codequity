'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  gradient: 'blue' | 'green' | 'purple' | 'pink'
  delay?: number
}

const gradientClasses = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-pink-500',
  pink: 'from-pink-500 to-rose-500'
}

export default function FeatureCard({ title, description, icon, gradient, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`glass border-white/20 text-center transition-all duration-500 hover:scale-105 hover-lift hover-glow overflow-hidden relative group ${
        isHovered ? 'border-white/40' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`} />
      
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[gradient]} opacity-0 group-hover:opacity-5 blur-xl transition-all duration-500`} />
      
      <CardHeader className="pb-4">
        <div className={`text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        {/* Hover indicator */}
        <div className={`mt-4 h-0.5 bg-gradient-to-r ${gradientClasses[gradient]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </CardContent>
      
      {/* Corner accent */}
      <div className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-r ${gradientClasses[gradient]} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100`} />
    </Card>
  )
} 