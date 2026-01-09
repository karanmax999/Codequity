import { Link } from "wouter";
import Hero48x48 from "@/components/sections/hero-48x48";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";
import { Zap, Globe, Award, Calendar, ChevronRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export default function ProgramInitiative() {
  useEffect(() => { document.title = "CodeQuity — 48 Weeks × 48 Blockchains Initiative"; }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navigation />

      <div className="pt-20">
        <Hero48x48 />

        {/* Scroll Animation Section */}
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold font-orbitron mb-4">
                The Ultimate <br />
                <span className="text-purple-500">Builder Marathon</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                48 Weeks. 48 Blockchains. Infinite Possibilities. Witness the scale of India's biggest dev initiative.
              </p>
            </div>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
            alt="Web3 Digital Ecosystem"
            className="mx-auto rounded-2xl object-cover h-full w-full object-center"
            draggable={false}
          />
        </ContainerScroll>

        {/* Mission Statement section */}
        <section className="py-24 bg-[#050507] border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.span variants={itemVariants} className="text-purple-500 font-mono text-sm tracking-[0.4em] uppercase mb-6 block">
                // MISSION_CORE
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold font-orbitron mb-8">
                A New Chain. <span className="text-purple-500">Every Week.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                The 48x48 Initiative is an unprecedented marathon of building. We're not just learning protocols; we're shipping production-grade dApps on a new ecosystem every single week.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-purple-500/5 blur-[80px] group-hover:bg-purple-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                  <Globe size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron">Explore Ecosystems</h3>
                <p className="text-gray-400 leading-relaxed text-lg">Deep dive into 48 unique blockchain architectures. From L1s to L2s, ZK-rollups to app-chains.</p>
              </div>

              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <Zap size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron">Ship Weekly</h3>
                <p className="text-gray-400 leading-relaxed text-lg">No theory only. You build, deploy, and verify a working dApp by Friday, every single week.</p>
              </div>

              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-green-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-green-500/5 blur-[80px] group-hover:bg-green-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all">
                  <Award size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron">Earn Credentials</h3>
                <p className="text-gray-400 leading-relaxed text-lg">Collect on-chain proof of your skills. Build a diversified portfolio that proves you're a polyglot dev.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Weekly Rhythm */}
        <section className="py-24 bg-[#050507] relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase mb-4 block">PROCESS_FLOW</span>
              <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">The Weekly Rhythm</h2>
              <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { day: "Monday", title: "Intel Download", desc: "Ecosystem spotlight, tooling setup, and starter kits." },
                { day: "Tue-Thu", title: "The Buildup", desc: "Heads-down coding. Challenges, office hours, and mentorship." },
                { day: "Friday", title: "Demo Day", desc: "Show your work. Receive feedback. Top teams get sponsor intros." },
                { day: "Weekend", title: "Retro & Recharge", desc: "Claim your NFT credentials. Rest up for the next chain." }
              ].map((item, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-purple-500/40 transition-all group">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] block mb-4 group-hover:translate-x-1 transition-transform">{item.day}</span>
                  <h3 className="font-bold text-xl mb-3 font-orbitron text-white group-hover:text-purple-300 transition-colors uppercase">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Ultra Modern */}
        <section className="py-32 relative overflow-hidden bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold font-orbitron mb-12 tracking-tighter">
              READY FOR <br />
              <span className="text-primary italic">WEEK 1?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Join the elite circle of builders. Whether you're a dev looking to expand your stack, or an ecosystem seeking pioneers, this is the destination.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link href="/apply">
                <a className="group relative px-12 py-5 bg-white text-black font-bold text-xl rounded-none transition-all hover:scale-105 active:scale-95 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    JOIN THE PILOT <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </a>
              </Link>
              <a href="mailto:team@codequity.org" className="px-12 py-5 border border-white/20 hover:border-white text-white font-bold text-xl rounded-none transition-all hover:bg-white hover:text-black">
                PARTNER WITH US
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
