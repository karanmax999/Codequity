import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { MissionControl } from "@/components/ui/mission-control";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function calculateDaysLeft(deadline: string) {
  if (!deadline) return "TBA";
  const diff = new Date(deadline).getTime() - new Date().getTime();
  if (diff < 0) return "CLOSED";
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `IN ${days} DAYS`;
}

export default function Hero48x48() {
  const weeks = useQuery(api.mission.getWeeks);
  const settings = useQuery(api.settings.getSettings);

  const activeWeekData = weeks?.find(w => w.status === 'active') || weeks?.[0];

  const cohortStart = settings?.find(s => s.key === 'cohort_start_date')?.value || "JAN 31, 2026";
  const appDeadline = settings?.find(s => s.key === 'application_deadline')?.value;

  const [showMissionControl, setShowMissionControl] = useState(false);

  // Fallback to week 1 if not loaded, or active week number
  const currentWeekNum = activeWeekData?.week || 1;
  const [animatedWeek, setAnimatedWeek] = useState(1);

  useEffect(() => {
    if (!activeWeekData) return;
    setAnimatedWeek(activeWeekData.week);
  }, [activeWeekData]);

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

            <MetalButton
              onClick={() => setShowMissionControl(true)}
              variant="default"
              className="w-full sm:w-auto px-10 py-6 min-w-[200px]"
            >
              MISSION CONTROL ↓
            </MetalButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Starts</span>
              <span className="text-white font-bold font-orbitron tracking-wide">{cohortStart}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Applications Close</span>
              <span className="text-red-400 font-bold font-orbitron tracking-wide uppercase">{calculateDaysLeft(appDeadline)}</span>
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
              <div className="text-4xl font-orbitron font-bold text-white tracking-widest">WEEK {currentWeekNum}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hidden md:block">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] mb-2">Live Ecosystem</div>
              <div className="text-xl font-bold font-orbitron text-purple-400 uppercase tracking-widest italic">{activeWeekData?.ecosystem || "ETHEREUM"}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <MissionControl
        isOpen={showMissionControl}
        onClose={() => setShowMissionControl(false)}
      />
    </section>
  );
}
