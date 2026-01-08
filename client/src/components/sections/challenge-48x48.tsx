export default function Challenge48x48() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-orbitron font-bold mb-6">The Brutal Truth About Web3 Builders</h2>
        <p className="text-gray-300 text-lg mb-6">Most developers know 1-2 chains deeply. They miss 95% of the Web3 opportunity.</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
          <li className="bg-[#0b0b12] p-6 rounded-md">❌ Build only on Ethereum → Miss Solana's speed</li>
          <li className="bg-[#0b0b12] p-6 rounded-md">❌ Master Solana → Miss Cosmos interoperability</li>
          <li className="bg-[#0b0b12] p-6 rounded-md">❌ Know EVM → Can't ship on Move (Aptos/Sui)</li>
          <li className="bg-[#0b0b12] p-6 rounded-md">❌ Understand L1s → Ignore L2 scaling solutions</li>
        </ul>

        <p className="text-gray-300 mt-6">The best founders are chain-agnostic builders who can evaluate and ship on ANY blockchain. <strong>48/48 makes you that builder.</strong></p>
      </div>
    </section>
  )
}
