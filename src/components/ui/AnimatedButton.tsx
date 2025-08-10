"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const variantClasses = {
    primary:
      "royal-button-primary royal-hover text-white shadow-lg hover:shadow-xl focus:ring-royal-gold",
    secondary:
      "royal-button-secondary royal-hover focus:ring-royal-blue",
    ghost:
      "bg-transparent border-2 border-[var(--royal-blue)] text-[var(--royal-blue)] hover:bg-[var(--royal-blue)] hover:text-white focus:ring-royal-blue"
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Shimmer effect */}
      <span
        className={cn(
          "absolute inset-0 pointer-events-none",
          !disabled && !loading && "animate-royal-shimmer"
        )}
      ></span>

      <span className="relative z-10 flex items-center justify-center">
        {loading && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.span>
        )}
        {children}
      </span>
    </motion.button>
  )
}
