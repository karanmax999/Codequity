import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion } from "framer-motion";

export default function Founder() {
    return (
        <div className="min-h-screen bg-black overflow-x-hidden font-sans selection:bg-primary/30">
            <Navigation />

            <div className="pt-24 pb-20 container mx-auto px-4 min-h-[calc(100vh-80px)] flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                >
                    <div className="w-full h-full flex-grow rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#191919]">
                        <iframe
                            src="https://adjoining-dungeon-ab4.notion.site/ebd//59bc07b9c72c4f78985f40f1fee80214"
                            className="w-full h-[85vh] md:h-[80vh] border-0"
                            title="Karan Bansal Profile"
                            allow="clipboard-write; encrypted-media; picture-in-picture"
                        />
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
