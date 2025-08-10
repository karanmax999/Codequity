'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FeatureCard from './FeatureCard'

const features = [
  {
    id: 'innovation-hub',
    title: 'Innovation Hub',
    description: 'Connect with cutting-edge developers and explore the latest technologies in our innovation ecosystem.',
    icon: '👑',
    gradient: 'blue' as const
  },
  {
    id: 'community-events',
    title: 'Community Events',
    description: 'Participate in hackathons, workshops, and meetups that bring together tech enthusiasts worldwide.',
    icon: '🏆',
    gradient: 'gold' as const
  },
  {
    id: 'learning-resources',
    title: 'Learning Resources',
    description: 'Access curated learning materials, tutorials, and mentorship programs to accelerate your growth.',
    icon: '💎',
    gradient: 'royal' as const
  },
  {
    id: 'global-network',
    title: 'Global Network',
    description: 'Join a diverse community spanning multiple countries, cultures, and technical backgrounds.',
    icon: '🌟',
    gradient: 'navy' as const
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const pulseVariants = {
  pulse: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.1, 1]
  }
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section 
      ref={ref}
      className="py-24 px-6 relative royal-section-secondary"
      aria-labelledby="features-heading"
    >
      {/* Enhanced Royal background with subtle animations */}
      <div className="absolute inset-0 royal-glass-dark opacity-30" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-amber-500/5"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59,130,246,0.05), rgba(245,158,11,0.05))',
            'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(59,130,246,0.05))',
            'linear-gradient(225deg, rgba(59,130,246,0.05), rgba(245,158,11,0.05))',
            'linear-gradient(315deg, rgba(245,158,11,0.05), rgba(59,130,246,0.05))'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-20"
          variants={headerVariants}
        >
          <motion.h2 
            id="features-heading"
            className="text-5xl md:text-7xl font-bold mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Why Choose{' '}
            <motion.span 
              className="royal-gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              CodeQuity
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover the unique advantages that make our community the premier destination for tech enthusiasts, 
            developers, and innovators worldwide.
          </motion.p>
          
          {/* Enhanced Royal divider */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="royal-divider w-32" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={gridVariants}
          role="list"
          aria-label="CodeQuity features"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              role="listitem"
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced Royal bottom accent with interactive elements */}
        <motion.div 
          className="text-center mt-16"
          variants={footerVariants}
        >
          <motion.div 
            className="inline-flex items-center space-x-4 text-slate-500"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div 
              className="royal-accent-dot"
              variants={pulseVariants}
              animate="pulse"
            />
            <span className="text-lg font-medium">Join thousands of developers worldwide</span>
            <motion.div 
              className="royal-accent-dot"
              variants={pulseVariants}
              animate="pulse"
              transition={{ delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 royal-gradient-blue opacity-10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 royal-gradient-gold opacity-10 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </motion.div>
    </section>
  )
}
