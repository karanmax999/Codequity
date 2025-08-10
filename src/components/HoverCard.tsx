'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  hoverClassName?: string
}

export default function HoverCard({ children, className, hoverClassName }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out transform',
        isHovered && hoverClassName,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
} 