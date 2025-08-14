"use client"

import { useState, useEffect } from "react"
import { motion, easeInOut } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { id: 'participants', number: 500, suffix: '+', label: 'International Participants', icon: '🌍', description: 'Global developers and tech enthusiasts' },
  { id: 'flagship-events', number: 1, suffix: '', label: 'Flagship National Events', icon: '🏆', description: 'Major technology conferences' },
  { id: 'events', number: 6, suffix: '+', label: 'Major and Minor Events', icon: '🎯', description: 'Workshops, hackathons, and meetups' },
  { id: 'institutions', number: 20, suffix: '+', label: 'Institutions Reached', icon: '🏛️', description: 'Universities and colleges partnered' },
  { id: 'partners', number: 5, suffix: '+', label: 'Community Partners', icon: '🤝', description: 'Strategic technology partnerships' },
  { id: 'ambassadors', number: 10, suffix: '+', label: 'Ambassadors and Evangelists', icon: '⭐', description: 'Community leaders and advocates' },
  { id: 'states', number: 25, suffix: '+', label: 'Indian States and UTs', icon: '🇮🇳', description: 'Pan-India presence and reach' },
  { id: 'countries', number: 10, suffix: '+', label: 'Countries Reached', icon: '🌎', description: 'International community expansion' },
  { id: 'sponsors', number: 5, suffix: '+', label: 'Sponsors and Partners', icon: '💼', description: 'Industry sponsors and supporters' },
]

// Animation presets
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

const iconFloat = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: easeInOut }
  }
}

// Animated counter
function CounterAnimation({ number, suffix, trigger }: { number: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const duration = 2000
    const steps = 60
    const increment = number / steps
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [trigger, number])

  return (
    <motion.div
      className="text-4xl md:text-5xl font-bold mb-4 text-white"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={trigger ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {count}{suffix}
    </motion.div>
  )
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
              <Card
          className="bg-gray-900/50 backdrop-blur-md border border-gray-700 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-2xl"
          role="article"
          aria-label={`${stat.label} ${stat.number}${stat.suffix}`}
        >
          <CardContent className="p-8 lg:p-10">
            {/* Icon */}
            <motion.div
              className="text-4xl lg:text-5xl mb-6"
              {...iconFloat}
              whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
            >
              {stat.icon}
            </motion.div>

            {/* Counter */}
            <CounterAnimation number={stat.number} suffix={stat.suffix} trigger={true} />

            {/* Label */}
            <motion.div
              className="text-sm lg:text-base text-gray-300 leading-tight font-semibold mb-2"
              animate={{ opacity: hovered ? 1 : 0.85 }}
            >
              {stat.label}
            </motion.div>

            {/* Description (shows on hover) */}
            <motion.div
              className="text-xs text-gray-400 leading-relaxed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
            >
              {stat.description}
            </motion.div>
          </CardContent>
        </Card>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-24 px-6 relative" aria-labelledby="stats-heading">
      {/* Dark theme backdrop overlay */}
      <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 id="stats-heading" className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Building India&apos;s largest{' '}
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">tech community</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Our community has grown exponentially, reaching across borders and bringing together tech enthusiasts from around the world to create something extraordinary.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-lg text-gray-400 mb-8 font-medium">
            Join thousands of developers, designers, and innovators
          </p>
          <div className="flex justify-center space-x-6">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-white rounded-full cursor-pointer shadow-lg"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: dot * 0.5, ease: 'easeInOut' }}
                whileHover={{ scale: 1.5, opacity: 1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
