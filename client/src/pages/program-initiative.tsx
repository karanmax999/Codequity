import { Link } from "wouter";
import Hero48x48 from "@/components/sections/hero-48x48";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";
import { Zap, Globe, Award, Calendar, ChevronRight } from "lucide-react";

export default function ProgramInitiative() {
  useEffect(() => { document.title = "CodeQuity — 48 Weeks × 48 Blockchains Initiative"; }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navigation />

      {/* Main Content wrapper */}
      <div className="pt-20">
        {/* Hero */}
        <Hero48x48 />

        {/* Mission Statement section */}
        <section className="py-24 bg-[#050507] border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
                A New Chain. <span className="text-purple-500">Every Week.</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                The 48x48 Initiative is an unprecedented marathon of building. We're not just learning protocols; we're shipping production-grade dApps on a new ecosystem every single week.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black/50 p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 font-orbitron">Explore Ecosystems</h3>
                <p className="text-gray-400">Deep dive into 48 unique blockchain architectures. From L1s to L2s, ZK-rollups to app-chains.</p>
              </div>
              <div className="bg-black/50 p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 font-orbitron">Ship Weekly</h3>
                <p className="text-gray-400">No theory only. You build, deploy, and verify a working dApp by Friday, every single week.</p>
              </div>
              <div className="bg-black/50 p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 font-orbitron">Earn Credentials</h3>
                <p className="text-gray-400">Collect on-chain proof of your skills. Build a diversified portfolio that proves you're a polyglot dev.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Weekly Rhythm */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4">The Weekly Rhythm</h2>
              <p className="text-gray-400">The cadence of a 48x48 builder.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { day: "Monday", title: "Intel Download", desc: "Ecosystem spotlight, tooling setup, and starter kits." },
                { day: "Tue-Thu", title: "The Buildup", desc: "Heads-down coding. Challenges, office hours, and mentorship." },
                { day: "Friday", title: "Demo Day", desc: "Show your work. Receive feedback. Top teams get sponsor intros." },
                { day: "Weekend", title: "Retro & Recharge", desc: "Claim your NFT credentials. Rest up for the next chain." }
              ].map((item, i) => (
                <div key={i} className="bg-[#0b0b12] p-6 rounded-xl border-l-2 border-purple-500/30 hover:border-purple-500 transition-colors">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">{item.day}</span>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-t from-purple-900/20 to-black border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-8">Ready for Week 1?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Whether you're a builder looking to expand your stack, or an ecosystem looking for developers, this is where it happens.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/apply">
                <a className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  Join the Pilot <ChevronRight size={20} />
                </a>
              </Link>
              <a href="mailto:team@codequity.org" className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:bg-white/5 text-white font-bold text-lg rounded-full transition-all">
                Partner with Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
