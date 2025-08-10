import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
}

export function ModernCard({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}: ModernCardProps) {
  const baseClasses = "rounded-2xl p-6 transition-all duration-500";
  
  const variantClasses = {
    default: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg",
    glass: "royal-glass border border-white/10",
    gradient: "royal-border"
  };
  
  const hoverClasses = hover ? "hover:scale-[1.02] hover:shadow-2xl" : "";
  
  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
}
