"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full w-12 h-12 p-0 
                       backdrop-blur-md bg-white/20 dark:bg-gray-900/30 
                       border border-white/20 shadow-lg 
                       hover:scale-110 hover:shadow-xl 
                       hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 
                       transition-all duration-300 text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
