"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Royal primary gradient button with shimmer + hover lift
        default:
          "royal-button-primary royal-hover text-white shadow-lg hover:shadow-xl relative overflow-hidden",
        destructive:
          "bg-destructive text-white shadow-lg hover:shadow-xl focus-visible:ring-destructive/30",
        outline:
          "border border-[var(--royal-blue)] bg-transparent text-[var(--royal-blue)] hover:bg-[var(--royal-blue)] hover:text-white",
        secondary:
          "royal-button-secondary royal-hover",
        ghost:
          "bg-transparent hover:bg-[var(--royal-blue)]/10 text-[var(--royal-blue)] dark:hover:bg-[var(--royal-blue)]/20",
        link: "text-[var(--royal-blue)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  if (asChild) {
    // Only pass valid props to Slot (which renders a regular element)
    return (
      <Slot
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          variant === "default" && "animate-royal-shimmer"
        )}
        {...props}
      />
    )
  }

  // Only pass valid props to motion.button (filter out DOM drag events and conflicting animation events)
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onTransitionEnd,
    ...motionProps
  } = props

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.05 }}
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        variant === "default" && "animate-royal-shimmer"
      )}
      {...motionProps}
    />
  )
}

export { Button, buttonVariants }
