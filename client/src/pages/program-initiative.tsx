import { Link } from "wouter";
import Hero48x48 from "@/components/sections/hero-48x48";

import { useEffect } from "react";

export default function ProgramInitiative() {
  useEffect(() => { document.title = "CodeQuity — 48 Weeks × 48 Blockchains Initiative"; }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050507] to-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <Hero48x48 />

        {/* Quick Overview */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Core Idea</h3>
            <p className="text-gray-300">Weekly, hands-on challenges across a rotating set of blockchains — delivering repeatable, measurable outcomes for builders and ecosystems.</p>
          </div>

          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Duration</h3>
            <p className="text-gray-300">48 weeks focused on one chain each week; includes spotlights, challenges, mentorship, and demo days.</p>
          </div>

          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Outcome</h3>
            <p className="text-gray-300">Proof of shipping, partnerships with ecosystems, grant and jobs placement, and demo day exposure to investors.</p>
          </div>
        </section>

        {/* Program Structure */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Program Structure</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li><strong>Mon:</strong> Ecosystem spotlight + tooling and starter kit</li>
            <li><strong>Tue–Thu:</strong> Challenge brief, office hours, mentor office hours</li>
            <li><strong>Fri:</strong> Demos & feedback; top teams get sponsor intros</li>
            <li><strong>Weekly:</strong> Badges/NFT credentials & CRM tracking of builder progress</li>
          </ol>
        </section>

        {/* Core Roles & Templates */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Core Roles</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Program Lead — ecosystem BD & strategy</li>
              <li>Content Lead — spotlights, social, and sessions</li>
              <li>Community Manager — Discord/TG moderation & builder support</li>
              <li>Technical Mentors — rotating pool for office hours</li>
            </ul>
          </div>

          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Reusable Content</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Ecosystem spotlight blog</li>
              <li>Twitter/LinkedIn threads</li>
              <li>Challenge brief template & starter code</li>
              <li>Demo day recap and case studies</li>
            </ul>
          </div>
        </section>

        {/* Go-to-Market */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Go-to-Market Roadmap</h2>
          <div className="text-gray-300 space-y-3">
            <p><strong>Phase 1 (Weeks 1–12):</strong> Pilot with 12 ecosystems and 50 pilot builders. Capture testimonials.</p>
            <p><strong>Phase 2 (Weeks 13–36):</strong> Scale to 200–500 active builders and start sponsor placements & grants.</p>
            <p><strong>Phase 3 (Weeks 37–48):</strong> Establish CodeQuity as the ecosystem standard and run a capstone demo day.</p>
          </div>
        </section>

        {/* Revenue */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Revenue Model</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Ecosystem sponsorships</li>
              <li>Chain grants & accelerator referral fees</li>
              <li>Premium builder memberships and event sponsorships</li>
            </ul>
          </div>

          <div className="bg-[#0b0b12] p-6 rounded-md border border-white/5">
            <h3 className="font-bold text-xl mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Lock 12 ecosystems for Q1 (outreach this week)</li>
              <li>Build MVP content & tools by end of January</li>
              <li>Recruit 50 pilot builders & run Week 1 by February</li>
            </ol>
          </div>
        </section>

        {/* CTA / Contact */}
        <section className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to run Week 1?</h3>
          <p className="text-gray-300 mb-6">If you want to partner, sponsor, or join as a mentor — reach out and let's make the pilot happen.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:team@codequity.org" className="px-8 py-3 bg-white text-black font-bold rounded-md">Contact Us</a>
            <Link href="/apply"><a className="px-6 py-3 border border-white/10 text-white rounded-md">Apply as Builder</a></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
