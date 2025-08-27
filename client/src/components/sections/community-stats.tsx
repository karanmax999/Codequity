import { Code, Lightbulb, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityStats() {
  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "6+", label: "Major Events" },
    { value: "25+", label: "Indian States" },
    { value: "10+", label: "Countries" },
  ];

  const features = [
    {
      icon: Code,
      title: "Connect",
      description: "Connect with developers across India and beyond through our vibrant community platforms.",
    },
    {
      icon: Lightbulb,
      title: "Inspire",
      description: "Get inspired through cutting-edge tech events, workshops, and learning experiences.",
    },
    {
      icon: GraduationCap,
      title: "Educate",
      description: "Learn with hands-on experiences and empower the next generation of tech leaders.",
    },
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-background to-card" data-testid="community-stats-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Our <span className="gradient-text">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join India's fastest-growing tech community that brings together passionate hackers, 
            innovative developers, creative designers, and visionary entrepreneurs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card neon-border rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-lg font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="neon-border rounded-xl p-8 bg-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`feature-card-${feature.title.toLowerCase()}`}
            >
              <div className="text-3xl text-primary mb-4">
                <feature.icon />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
