"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Crown,
  Linkedin,
  Twitter,
  Github,
  Target,
  Users,
  Zap,
  Sparkles,
  Award,
  Lightbulb,
  Heart,
  TrendingUp,
} from "lucide-react"

// ---------------- Data ---------------- //
const teamMembers = [
  {
    name: "Karan Bansal",
    role: "Co-Founder & CTO",
    bio: "ASPIRING Blockchain Developer || Solidity || DSA 😎 || Web Developer helping brands grow (either mine or someone’s). Web3 enthusiast || Co-founder - @Codequity || Collaborating with communities across India!",
    avatar: "/karan-bansal.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/karan-bansal-a54648302/",
      twitter: "https://x.com/_karbansal2006",
      github: "#",
    },
  },
  {
    name: "Mayuresh Sharma",
    role: "Founder & CEO",
    bio: "Founder | Tech Entrepreneur | AWS Certified | AI Enthusiast | GGSIPU'28",
    avatar: "/mayuresh-sharma.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/mayuresh-sharma-a08526315/",
      twitter: "#",
      github: "#",
    },
  },
]

const features = [
  { icon: <Target className="w-8 h-8" />, title: "Strategic Vision", description: "Transform ideas into market-ready solutions with strategic execution." },
  { icon: <Users className="w-8 h-8" />, title: "Community First", description: "Build lasting relationships with leaders, mentors, and innovators." },
  { icon: <Zap className="w-8 h-8" />, title: "Rapid Innovation", description: "Accelerate cycles with cutting-edge tools & agile methods." },
  { icon: <Sparkles className="w-8 h-8" />, title: "Excellence", description: "Deliver products that exceed industry standards & expectations." },
]

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "50+", label: "Successful Projects" },
  { value: "25+", label: "Industry Partners" },
  { value: "95%", label: "Member Satisfaction" },
]

const achievements = [
  { icon: <Award className="w-6 h-6" />, title: "Best Tech Community 2024", description: "Recognized for fostering innovation." },
  { icon: <Lightbulb className="w-6 h-6" />, title: "50+ Projects Launched", description: "Delivering cutting-edge solutions." },
  { icon: <Heart className="w-6 h-6" />, title: "500+ Members", description: "A growing community of innovators." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "95% Satisfaction", description: "Exceeding member expectations." },
]

// ---------------- Animation Variants ---------------- //
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

export default function About() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])

  // Precompute floating particle positions (avoids recalculation every render)
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y, opacity }} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{ left: p.left, top: p.top }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
            <Crown className="w-12 h-12 text-white" />
          </motion.div>
          <h1 id="about-heading" className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Build What Deserves</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">To Exist</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We unite passionate innovators, visionary entrepreneurs, and creative minds to transform groundbreaking ideas into reality. Together, we&apos;re shaping the future of technology through collaboration, innovation, and excellence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} custom={i * 0.1} whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.3} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i * 0.1} whileHover={{ y: -5, scale: 1.03 }} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">{f.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Our Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i * 0.1} whileHover={{ scale: 1.05 }} className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-6 text-center hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">{a.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
                <p className="text-gray-400 text-sm">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }} className="mb-20">
          <Card className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 md:p-12 hover:border-blue-500/30 transition-all duration-300">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                To create an inclusive ecosystem where innovation thrives, talent meets opportunity, and groundbreaking ideas transform into impactful solutions. We&apos;re building bridges between academia and industry to drive progress and create meaningful change worldwide.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.5} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((m, i) => (
              <motion.div key={m.name} variants={fadeInUp} custom={i * 0.2} whileHover={{ y: -5, scale: 1.03 }} className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20" role="region" aria-labelledby={`team-${i}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <Image src={m.avatar} alt={`Photo of ${m.name}`} width={128} height={128} className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-blue-500/30" />
                    <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800" aria-hidden />
                  </div>
                  <h3 id={`team-${i}`} className="text-2xl font-bold text-white mb-2">{m.name}</h3>
                  <p className="text-blue-400 mb-4 font-medium">{m.role}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{m.bio}</p>
                  <div className="flex gap-4">
                    {m.socials.linkedin !== "#" && (
                      <Button asChild variant="ghost" size="sm" className="hover:bg-blue-500/20 hover:text-blue-400">
                        <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} LinkedIn`}><Linkedin className="w-5 h-5" /></a>
                      </Button>
                    )}
                    {m.socials.twitter !== "#" && (
                      <Button asChild variant="ghost" size="sm" className="hover:bg-blue-500/20 hover:text-blue-400">
                        <a href={m.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} Twitter`}><Twitter className="w-5 h-5" /></a>
                      </Button>
                    )}
                    {m.socials.github !== "#" && (
                      <Button asChild variant="ghost" size="sm" className="hover:bg-blue-500/20 hover:text-blue-400">
                        <a href={m.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} GitHub`}><Github className="w-5 h-5" /></a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.6} viewport={{ once: true }} className="text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 md:p-12 hover:border-blue-500/50 transition-all duration-300">
            <CardContent>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Build the Future?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join our community of innovators and let&apos;s create something extraordinary together. The future starts with you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">Start Building Today</Button>
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 px-8 py-4 rounded-full transition-all">Become a Partner</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
