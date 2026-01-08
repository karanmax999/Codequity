import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import PopupBanner from "@/components/ui/popup-banner";

export default function Portal() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <PopupBanner />
            <Navigation />
            <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-20">
                <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h1 className="text-3xl font-bold font-orbitron mb-6 text-center text-white">
                        Portal Access
                    </h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Please sign in to access your dashboard.
                    </p>
                    <button className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                        Sign In
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
