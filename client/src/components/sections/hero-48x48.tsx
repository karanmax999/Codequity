import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";

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
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F2E] to-[#1a1f3a] -z-10" />
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="relative inline-block mb-8">
            <img src={codeQuityLogo} alt="CodeQuity" className="w-24 h-24 rounded-full border border-white/10 mx-auto" />
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xs">ETH</div>
            <div className="absolute -left-10 top-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs">SOL</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4">48 Weeks. 48 Blockchains. 48 Real Products.</h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6">The world's most intensive blockchain adoption program. Master every major chain by shipping production-ready dApps, tools, and protocols — one chain per week for an entire year.</p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="/apply" className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold rounded-md">Apply for Cohort 1 — 50 Spots</a>
            <a href="#curriculum" className="px-6 py-3 border border-white/10 text-white rounded-md">See the 48-Chain Roadmap ↓</a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg">
              <span className="text-gray-400 font-medium">Starting:</span>
              <span className="text-white font-bold font-orbitron tracking-wide">Jan 31, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg">
              <span className="text-gray-400 font-medium">Applications close:</span>
              <span className="text-red-400 font-bold font-orbitron tracking-wide">Feb 31, 2026</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="bg-white/5 p-6 rounded-md">
              <div className="text-sm text-gray-400">Week</div>
              <div className="text-3xl font-orbitron font-bold">{animatedWeek} / 48</div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 p-6 rounded-md hidden md:block"
            >
              <div className="text-sm text-gray-400">Live Chain</div>
              <div className="text-lg font-bold">Ethereum</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative floating orbits (simple) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-10 top-10 w-80 h-80 rounded-full border border-white/5 opacity-30 animate-spin-slow" />
      </div>
    </section>
  );
}
