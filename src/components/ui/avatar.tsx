"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: "sm" | "md" | "lg"
}

export function Avatar({
  className,
  size = "md",
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full border border-[var(--royal-blue)] shadow-lg royal-hover transition-all duration-300",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    </motion.div>
  )
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full royal-gradient-text font-semibold text-sm backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}
