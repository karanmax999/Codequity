import { motion } from "framer-motion";
import { Shield, Boxes, Wallet, Coins, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuilderGuildSection() {
  const tracks = [
    {
      icon: Boxes,
      title: "L2s & Scaling",
      description: "Build on Optimism, Arbitrum, Base, and other Layer 2 solutions",
      color: "text-primary",
    },
    {
      icon: Wallet,
      title: "Wallets & AA",
      description: "Master account abstraction, smart wallets, and user onboarding",
      color: "text-accent",
    },
    {
      icon: Coins,
      title: "DeFi Protocols",
      description: "AMMs, lending protocols, yield farming, and liquidity management",
      color: "text-primary",
    },
    {
      icon: Lock,
      title: "Security & Audits",
      description: "Smart contract security, auditing, and best practices",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Infrastructure",
      description: "Node operations, indexing, oracles, and backend services",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Tokenomics",
      description: "Token design, distribution, governance, and economic models",
      color: "text-accent",
    },
  ];

  const benefits = [
    "Mentorship from ecosystem partners",
    "Access to infra grants and bounties",
    "Credits from chains and protocols",
    "Direct placement opportunities",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Web3 <span className="gradient-text">Builder Guild</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A structured path for developers who want to go deep on Web3 infrastructure and protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              className="neon-border rounded-xl p-8 bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <track.icon className={`w-12 h-12 ${track.color} mb-4`} />
              <h3 className="text-xl font-orbitron font-semibold mb-3">{track.title}</h3>
              <p className="text-muted-foreground">{track.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-4xl mx-auto bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-orbitron font-bold mb-6 text-center">Guild Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button className="bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 neon-border">
              Join Builder Guild
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
