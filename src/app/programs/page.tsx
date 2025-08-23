"use client"

import { motion } from "framer-motion"
import PageLayout from "@/components/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Users, Calendar, Award, BookOpen, Coffee } from "lucide-react"

const programs = [
  {
    title: "Hackathons",
    description: "Intensive coding competitions where developers collaborate to build innovative solutions within a limited timeframe.",
    icon: Code,
    features: ["24-48 hour events", "Industry challenges", "Expert mentorship", "Cash prizes & swag"],
    cta: "View Upcoming Hackathons",
    link: "#hackathons"
  },
  {
    title: "Workshops",
    description: "Hands-on learning sessions focused on specific technologies, tools, and best practices.",
    icon: BookOpen,
    features: ["Expert-led sessions", "Practical exercises", "Small group sizes", "Take-home resources"],
    cta: "Browse Workshops",
    link: "#workshops"
  },
  {
    title: "Bootcamps",
    description: "Comprehensive training programs designed to accelerate your skills in specific tech domains.",
    icon: Award,
    features: ["Multi-week programs", "Project-based learning", "Career guidance", "Certification"],
    cta: "Explore Bootcamps",
    link: "#bootcamps"
  },
  {
    title: "Meetups",
    description: "Casual networking events to connect with fellow developers, share knowledge, and build relationships.",
    icon: Coffee,
    features: ["Monthly gatherings", "Guest speakers", "Networking sessions", "Community building"],
    cta: "Join Next Meetup",
    link: "#meetups"
  }
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <PageLayout
          title="Our Programs"
          description="Discover our comprehensive range of programs designed to accelerate your growth, connect with like-minded individuals, and build the future of technology together."
          breadcrumbItems={[{ label: "Programs" }]}
        >
          <div className="max-w-7xl mx-auto">
            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-cosmic-card border-cosmic hover:border-cyan-400 transition-all duration-300 cosmic-shimmer">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full mb-4 cosmic-glow">
                          <program.icon className="w-8 h-8 text-cosmic-cyan" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{program.title}</h3>
                        <p className="text-white/70 text-sm mb-4 leading-relaxed">{program.description}</p>
                        
                        <ul className="space-y-2 mb-6">
                          {program.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-xs text-white/60 flex items-center">
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button className="btn-cosmic-primary w-full">
                          {program.cta}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-cosmic-card border-cosmic rounded-2xl p-8 md:p-12 cosmic-shimmer">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to <span className="text-cosmic-gradient">Level Up</span>?
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who have transformed their skills and careers through our programs. 
                  Whether you're a beginner or an experienced developer, we have something for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-cosmic-secondary px-8 py-3 text-lg">
                    View All Programs
                  </Button>
                  <Button size="lg" className="btn-cosmic-primary px-8 py-3 text-lg">
                    Get Started Today
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </PageLayout>
      </motion.div>
    </main>
  )
}
