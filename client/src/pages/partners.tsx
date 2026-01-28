import Navigation from "@/components/ui/navigation";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Handshake, Zap, Globe, Cpu, Loader2 } from "lucide-react";
import { usePartners } from "@/hooks/use-partners";

const categoryIcons: Record<string, any> = {
    "Ecosystems": Globe,
    "Infrastructure": Cpu,
    "Venture Capital": Zap,
    "Community": Handshake
};

export default function Partners() {
    const { partners, loading } = usePartners();

    // Group partners by category for the UI
    const groupedPartners = partners.reduce((acc: any[], partner) => {
        const categoryName = partner.category || "Other";
        let category = acc.find(c => c.category === categoryName);
        if (!category) {
            category = {
                category: categoryName,
                icon: categoryIcons[categoryName] || Globe,
                desc: getCategoryDesc(categoryName),
                items: []
            };
            acc.push(category);
        }
        category.items.push(partner);
        return acc;
    }, []);

    function getCategoryDesc(cat: string) {
        if (cat === "Ecosystems") return "Foundations supporting our cohort with grants & guidance.";
        if (cat === "Infrastructure") return "Powering the stack with free credits and premium support.";
        if (cat === "Venture Capital") return "Our network of investors ready to back the next unicorn.";
        return "Supporting the CodeQuity community.";
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
            <Helmet>
                <title>Partners | CodeQuity Network</title>
                <meta name="description" content="Explore the foundations, infrastructure providers, and VCs supporting the CodeQuity ecosystem." />
            </Helmet>
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
                    {loading ? (
                        <div className="flex flex-col items-center py-20">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-gray-500 font-orbitron uppercase tracking-widest text-sm">Synchronizing Alliance Data...</p>
                        </div>
                    ) : groupedPartners.length === 0 ? (
                        <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5">
                            <Handshake className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-orbitron font-bold mb-2">No Allies Found</h2>
                            <p className="text-gray-500">The alliance network is currently being established.</p>
                        </div>
                    ) : (
                        groupedPartners.map((section, idx) => (
                            <div key={idx} className="relative">
                                <div className="flex flex-col items-center mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                        <section.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-orbitron font-bold mb-2">{section.category}</h2>
                                    <p className="text-muted-foreground">{section.desc}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {section.items.map((partner: any, pIdx: number) => (
                                        <div key={pIdx} className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center aspect-square hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                                            <div className="w-full h-full flex flex-col items-center justify-center transition-all">
                                                {partner.logo_url ? (
                                                    <img src={partner.logo_url} alt={partner.name} className="max-h-12 w-auto mb-4 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100" />
                                                ) : null}
                                                <span className="font-bold text-lg md:text-xl font-orbitron text-center group-hover:text-primary transition-colors">{partner.name}</span>
                                                {partner.perk_title && (
                                                    <span className="text-[10px] uppercase font-black text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{partner.perk_title}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
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
