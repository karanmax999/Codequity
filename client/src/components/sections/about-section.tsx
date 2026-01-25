import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";

export default function AboutSection() {
  const highlights = [
    {
      title: "On-Chain Products",
      description: "Ship real Web3 products with actual users and revenue",
      color: "text-primary",
    },
    {
      title: "Structured Pipeline",
      description: "Hackathons, sprints, and funding days to take you from demo to launch",
      color: "text-accent",
    },
    {
      title: "Builder Guild",
      description: "Deep specialization in L2s, wallets, DeFi, and Web3 infrastructure",
      color: "text-primary",
    },
    {
      title: "Fair Ownership",
      description: "On-chain equity and meaningful upside for builders and community",
      color: "text-accent",
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-card to-background overflow-hidden" data-testid="about-section">
      <DottedSurface className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">
              Our <span className="gradient-text">Vision</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p data-testid="mission-statement">
                "India's Web3 startup foundry for student builders: the best place to ship your first real on-chain product."
              </p>
              <p data-testid="community-description">
                CodeQuity is an on-chain startup launchpad and Web3 builder guild that takes student and early-stage teams from hackathon repo to live on-chain product, real users, and funding. We're built for devs who are serious about turning weekend projects into Web3 startups, not just winning prizes.
              </p>
              <p data-testid="ecosystem-description">
                Through our structured pipeline—on-chain hackathons, shipping sprints, and funding days—we help you build something people want, own meaningful upside on-chain, and graduate into serious Web3 startups.
              </p>
            </div>

            {/* Impact Highlights */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="neon-border rounded-lg p-4 bg-card/50 backdrop-blur-sm"
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
              loading="lazy"
              width="800"
              height="600"
              className="rounded-xl shadow-2xl neon-border"
              data-testid="about-hero-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>

            {/* Floating Stats */}
            <motion.div
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-card/90 backdrop-blur rounded-lg p-3 md:p-4 neon-border"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              data-testid="floating-stat-states"
            >
              <div className="text-xl md:text-2xl font-orbitron font-bold text-primary">15+</div>
              <div className="text-[10px] md:text-sm text-muted-foreground">On-Chain Products</div>
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-card/90 backdrop-blur rounded-lg p-3 md:p-4 neon-border"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              data-testid="floating-stat-ambassadors"
            >
              <div className="text-xl md:text-2xl font-orbitron font-bold text-accent">8+</div>
              <div className="text-[10px] md:text-sm text-muted-foreground">Teams Funded</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
