import { Link } from "wouter";
import Hero48x48 from "@/components/sections/hero-48x48";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";
import { Zap, Globe, Award, Calendar, ChevronRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export default function ProgramInitiative() {
  useEffect(() => { document.title = "CodeQuity — 48 Weeks × 48 Blockchains Initiative"; }, []);
  const screenSize = useScreenSize();

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

              {/* Luma Calendar Embed */}
              <motion.div variants={itemVariants} className="mt-16 max-w-4xl mx-auto border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://luma.com/embed/calendar/cal-HLmaVtbFChuV8sJ/events"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  style={{ border: "1px solid #bfcbda88", borderRadius: "8px", background: "white" }}
                  allowFullScreen={true}
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={["#f3e8ff", "#d8b4fe", "#a855f7"]}
                  variant="default"
                />
                <div className="absolute top-0 right-0 p-32 bg-purple-500/5 blur-[80px] group-hover:bg-purple-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all relative z-10">
                  <Globe size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron relative z-10">Explore Ecosystems</h3>
                <p className="text-gray-400 leading-relaxed text-lg relative z-10">Deep dive into 48 unique blockchain architectures. From L1s to L2s, ZK-rollups to app-chains.</p>
              </div>

              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={["#dbeafe", "#93c5fd", "#3b82f6"]}
                  variant="default"
                />
                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all relative z-10">
                  <Zap size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron relative z-10">Ship Weekly</h3>
                <p className="text-gray-400 leading-relaxed text-lg relative z-10">No theory only. You build, deploy, and verify a working dApp by Friday, every single week.</p>
              </div>

              <div className="bg-[#0a0a0c] p-10 rounded-3xl border border-white/5 hover:border-green-500/30 transition-all group relative overflow-hidden">
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={["#d1fae5", "#6ee7b7", "#10b981"]}
                  variant="default"
                />
                <div className="absolute top-0 right-0 p-32 bg-green-500/5 blur-[80px] group-hover:bg-green-500/10 transition-all duration-500"></div>
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all relative z-10">
                  <Award size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-4 font-orbitron relative z-10">Earn Credentials</h3>
                <p className="text-gray-400 leading-relaxed text-lg relative z-10">Collect on-chain proof of your skills. Build a diversified portfolio that proves you're a polyglot dev.</p>
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
                <div key={i} className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-purple-500/40 transition-all group relative overflow-hidden">
                  <PixelCanvas
                    gap={8}
                    speed={20}
                    colors={["#f3e8ff", "#d8b4fe", "#a855f7"]}
                    variant="icon"
                  />
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] block mb-4 group-hover:translate-x-1 transition-transform relative z-10">{item.day}</span>
                  <h3 className="font-bold text-xl mb-3 font-orbitron text-white group-hover:text-purple-300 transition-colors uppercase relative z-10">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Ultra Modern with PixelTrail */}
        <section className="relative overflow-hidden min-h-[600px] bg-gradient-to-br from-purple-900 via-black to-blue-900">
          {/* PixelTrail Interactive Background */}
          <div className="absolute inset-0 z-0">
            <PixelTrail
              pixelSize={screenSize.lessThan("md") ? 48 : 80}
              fadeDuration={0}
              delay={1200}
              pixelClassName="rounded-full bg-primary/60"
            />
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full"></div>

          {/* Content */}
          <div className="container mx-auto px-6 py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-12">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-bold tracking-wider uppercase text-primary">Limited Spots Available</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-8xl font-black font-orbitron tracking-tighter leading-none"
              >
                READY FOR{" "}
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400 animate-pulse">
                  WEEK 1?
                </span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                Join the elite circle of builders. Whether you're a dev looking to expand your stack, or an ecosystem seeking pioneers,{" "}
                <span className="text-white font-bold">this is the destination.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
              >
                <Link href="/apply">
                  <LiquidButton size="xxl" className="text-xl font-bold" as="div">
                    <span className="flex items-center gap-3">
                      JOIN THE PILOT
                      <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </LiquidButton>
                </Link>
                <Link href="/contact">
                  <MetalButton variant="primary" className="px-12 py-6 text-xl font-bold" as="div">
                    <span className="flex items-center gap-3">
                      PARTNER WITH US
                      <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </MetalButton>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black font-orbitron text-primary mb-2">48</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black font-orbitron text-primary mb-2">48</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Blockchains</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black font-orbitron text-primary mb-2">∞</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Possibilities</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
