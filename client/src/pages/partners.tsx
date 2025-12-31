import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Handshake, Zap, Globe, Cpu } from "lucide-react";

const partners = [
    {
        category: "Ecosystems",
        icon: Globe,
        desc: "Foundations supporting our cohort with grants & guidance.",
        items: [
            { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025" },
            { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025" },
            { name: "Aptos", logo: "https://cryptologos.cc/logos/aptos-apt-logo.png?v=025" },
            { name: "Celo", logo: "https://cryptologos.cc/logos/celo-celo-logo.png?v=025" },
            { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=025" }
        ]
    },
    {
        category: "Infrastructure",
        icon: Cpu,
        desc: "Powering the stack with free credits and premium support.",
        items: [
            { name: "QuickNode", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Rk1lOjkP8QYy5H6_5Qn4_8_8_8_8_8_8&s" }, // Placeholder logic for now, using text in UI mainly
            { name: "Spheron", logo: "" },
            { name: "Push Protocol", logo: "" },
            { name: "Huddle01", logo: "" },
            { name: "Graph", logo: "" }
        ]
    },
    {
        category: "Venture Capital",
        icon: Zap,
        desc: "Our network of investors ready to back the next unicorn.",
        items: [
            { name: "Hashed", logo: "" },
            { name: "Coinbase Ventures", logo: "" },
            { name: "Binance Labs", logo: "" },
            { name: "a16z Crypto", logo: "" }
        ]
    }
];

export default function Partners() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
            <Navigation />

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-6 text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-tight">
                        Our <span className="gradient-text">Allies</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        CodeQuity is backed by the strongest networks in Web3. We bring the ecosystem to you.
                    </p>
                </div>

                <div className="container mx-auto px-6 max-w-6xl space-y-24">
                    {partners.map((section, idx) => (
                        <div key={idx} className="relative">
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                    <section.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-orbitron font-bold mb-2">{section.category}</h2>
                                <p className="text-muted-foreground">{section.desc}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {section.items.map((partner, pIdx) => (
                                    <div key={pIdx} className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center aspect-square hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                                        <div className="w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                            {/* Using text fallback for now to avoid broken images, but styled like logos */}
                                            <span className="font-bold text-lg md:text-xl font-orbitron text-center">{partner.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="container mx-auto px-6 py-24 text-center">
                    <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-orbitron font-bold mb-6">Want to support the next gen?</h2>
                        <div className="flex justify-center flex-wrap gap-4">
                            <Button className="h-12 px-8 bg-white text-black hover:bg-gray-200 font-bold rounded-full">
                                Become a Partner
                            </Button>
                            <Button variant="outline" className="h-12 px-8 border-white/20 hover:bg-white/10 rounded-full">
                                Contact Team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
