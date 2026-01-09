import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";
import { ShaderAnimation } from "@/components/ui/shader-animation";

function currentWeek(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const diff = Math.max(0, now.getTime() - start.getTime());
  const week = Math.floor(diff / msPerWeek) + 1;
  return Math.min(Math.max(week, 1), 48);
}

export default function Hero48x48() {
  const week = useMemo(() => currentWeek("2026-02-18"), []);
  const [animatedWeek, setAnimatedWeek] = useState(week);

  useEffect(() => {
    let raf: number | null = null;
    const start = animatedWeek;
    const end = week;
    if (start === end) return;
    const step = () => {
      setAnimatedWeek((v) => {
        if (v === end) {
          if (raf !== null) cancelAnimationFrame(raf);
          return v;
        }
        return v < end ? v + 1 : v - 1;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [week]);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center py-24 md:py-32">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <img src={codeQuityLogo} alt="CodeQuity" className="w-24 h-24 rounded-full border border-white/10 mx-auto" />
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xs backdrop-blur-md border border-white/10">ETH</div>
            <div className="absolute -left-10 top-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs backdrop-blur-md border border-white/10">SOL</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-orbitron font-black text-white mb-6 tracking-tighter"
          >
            48 Weeks. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">48 Blockchains.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The world's most intensive blockchain adoption program. Master every major chain by shipping production-ready dApps — one chain per week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <a href="/apply" className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-lg rounded-none transition-all hover:scale-105 active:scale-95 overflow-hidden">
              <span className="relative z-10">APPLY FOR COHORT 1</span>
              <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </a>
            <a href="#curriculum" className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:border-white text-white font-bold text-lg rounded-none transition-all hover:bg-white/5">
              THE ROADMAP ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Starts</span>
              <span className="text-white font-bold font-orbitron tracking-wide">JAN 31, 2026</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Applications Close</span>
              <span className="text-red-400 font-bold font-orbitron tracking-wide uppercase">In 14 Days</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] mb-2">Current Sprint</div>
              <div className="text-4xl font-orbitron font-bold text-white tracking-widest">WEEK {animatedWeek}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hidden md:block">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] mb-2">Live Ecosystem</div>
              <div className="text-xl font-bold font-orbitron text-purple-400 uppercase tracking-widest italic">Ethereum</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
