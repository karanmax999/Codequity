"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="mb-8"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="font-medium hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <AnimatePresence key={index}>
            <motion.li
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.13, delay: index * 0.07 }}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden />
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{item.label}</span>
              )}
            </motion.li>
          </AnimatePresence>
        ))}
      </ol>
    </nav>
  )
}
