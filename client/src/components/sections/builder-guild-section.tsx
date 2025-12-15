import { motion } from "framer-motion";
import { Shield, Boxes, Wallet, Coins, Lock, Zap, ArrowRight, Server, Link as LinkIcon, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuilderGuildSection() {
  const tracks = [
    {
      icon: Server,
      title: "Infra Track",
      description: "L2s, Scaling, & AA",
      outcomes: [
        "Build on Optimism/Base",
        "Implement Account Abstraction",
        "Run Indexers & Oracles"
      ],
      color: "text-blue-400",
      border: "hover:border-blue-400/50"
    },
    {
      icon: Coins,
      title: "DeFi Track",
      description: "Protocols & Tokenomics",
      outcomes: [
        "Design AMM & Lending logic",
        "Architect Token Economies",
        "Yield Strategy Integrations"
      ],
      color: "text-green-400",
      border: "hover:border-green-400/50"
    },
    {
      icon: Shield,
      title: "Security Track",
      description: "Audits & Best Practices",
      outcomes: [
        "Smart Contract Auditing",
        "Fuzzing & Formal Verification",
        "Gas Optimization"
      ],
      color: "text-red-400",
      border: "hover:border-red-400/50"
    }
  ];

  const benefits = [
    { text: "₹50k+ Infrastructure Credits", sub: "(AWS, Alchemy, QuickNode)" },
    { text: "Priority for Protocol Bounties", sub: "(Avg $500 - $2k per bounty)" },
    { text: "Direct Accelerator Referrals", sub: "(YC, Tachyon, LongHash)" },
    { text: "1:1 Mentorship from OGs", sub: "(Weekly Office Hours)" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Web3 <span className="gradient-text">Builder Guild</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Specialized tracks for developers who want to go deep. Don't just learn syntax; master the stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              className={`neon-border rounded-2xl p-8 bg-card/30 backdrop-blur-sm transition-all duration-300 group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                <track.icon className={`w-7 h-7 ${track.color}`} />
              </div>

              <h3 className="text-2xl font-orbitron font-bold mb-2 group-hover:text-white transition-colors">{track.title}</h3>
              <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">{track.description}</p>

              <ul className="space-y-3 mb-6">
                {track.outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <ArrowRight className={`w-4 h-4 mt-0.5 ${track.color}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-5xl mx-auto bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-orbitron font-bold mb-6 text-white">Guild <span className="gradient-text">Benefits</span></h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                This isn't just a course. It's a professional network and resource hub designed to accelerate your Web3 career.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80 group text-lg font-semibold">
                View Sample Schedule <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_var(--primary)]"></div>
                  <div>
                    <div className="text-white font-medium">{benefit.text}</div>
                    <div className="text-sm text-muted-foreground">{benefit.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-10 text-center">
            <Button className="bg-primary text-primary-foreground px-10 py-6 text-lg font-bold hover:bg-primary/90 neon-border rounded-full animate-pulse-glow">
              Apply to Guild
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
