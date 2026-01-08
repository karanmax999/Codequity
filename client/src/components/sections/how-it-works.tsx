import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-orbitron font-bold mb-6">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-[#0b0b12] p-6 rounded-md">
              <h3 className="font-bold mb-3">One Blockchain. One Week. One Product.</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-2">
                <li><strong>Mon-Tue:</strong> Deep dive — architecture, tooling, live session with core team</li>
                <li><strong>Wed-Fri:</strong> Build & Ship — deploy a real product and get 10+ real users/tx</li>
                <li><strong>Sat:</strong> Demo & Document — 5-min video demo + writeup + mentor feedback</li>
                <li><strong>Sun:</strong> Reflect & Prepare — chain comparisons & next-week preview</li>
              </ol>
            </div>
          </div>

          <motion.div className="bg-[#0b0b12] p-6 rounded-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h4 className="font-bold mb-3">By week 48, you will have:</h4>
            <ul className="text-gray-300 list-disc list-inside">
              <li>48 live products across 48 chains</li>
              <li>Deep knowledge of every major ecosystem</li>
              <li>Portfolio that stands out</li>
              <li>Network across 48+ communities</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
