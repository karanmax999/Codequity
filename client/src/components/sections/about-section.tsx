import { motion } from "framer-motion";

export default function AboutSection() {
  const highlights = [
    {
      title: "Inclusive Community",
      description: "Open to developers of all skill levels and backgrounds",
      color: "text-primary",
    },
    {
      title: "Real Impact",
      description: "Hands-on projects and career advancement opportunities",
      color: "text-accent",
    },
    {
      title: "Global Network",
      description: "Connect with developers worldwide and access international opportunities",
      color: "text-primary",
    },
    {
      title: "Innovation Focus",
      description: "Cutting-edge technology and forward-thinking solutions",
      color: "text-accent",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-card to-background" data-testid="about-section">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p data-testid="mission-statement">
                "Building India's largest tech community through innovation, collaboration, and excellence."
              </p>
              <p data-testid="community-description">
                CodeQuity is India's fastest-growing tech community that brings together passionate hackers, 
                innovative developers, creative designers, and visionary entrepreneurs to create the future 
                of technology together.
              </p>
              <p data-testid="ecosystem-description">
                We're building a supportive ecosystem where developers of all skill levels can learn, 
                grow, and contribute to India's technological advancement.
              </p>
            </div>

            {/* Impact Highlights */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="neon-border rounded-lg p-4 bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`highlight-${highlight.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <h4 className={`font-orbitron font-semibold mb-2 ${highlight.color}`}>
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Tech team collaboration"
              className="rounded-xl shadow-2xl neon-border"
              data-testid="about-hero-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            
            {/* Floating Stats */}
            <motion.div
              className="absolute top-6 right-6 bg-card/90 backdrop-blur rounded-lg p-4 neon-border"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              data-testid="floating-stat-states"
            >
              <div className="text-2xl font-orbitron font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-6 bg-card/90 backdrop-blur rounded-lg p-4 neon-border"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              data-testid="floating-stat-ambassadors"
            >
              <div className="text-2xl font-orbitron font-bold text-accent">10+</div>
              <div className="text-sm text-muted-foreground">Ambassadors</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
