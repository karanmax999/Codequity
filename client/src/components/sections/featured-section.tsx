import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFeaturedSection } from "@/hooks/use-featured-section";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function FeaturedSection() {
    const { articles, loading, submittingNewsletter, subscribeToNewsletter } = useFeaturedSection();
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        const result = await subscribeToNewsletter(email);
        if (result.success) {
            toast({
                title: "Success!",
                description: result.message,
            });
            setEmail("");
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
    };

    return (
        <section className="relative py-20 bg-gradient-to-b from-black via-[#0A0A0F] to-black overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
                        FEATURED
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Featured Articles */}
                    {loading ? (
                        [1, 2].map((i) => (
                            <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
                        ))
                    ) : (
                        articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm h-full flex flex-col">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-400 mb-6 flex-grow leading-relaxed line-clamp-3">
                                        {article.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {article.tags?.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:border-primary/30 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More Link */}
                                    <a
                                        href={article.link}
                                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link"
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    )}

                    {/* Newsletter Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl opacity-50" />

                        <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-8 h-full flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/20 text-white rounded-full mb-4">
                                    newsletter
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">
                                web3 with a16z: Your guide to the next internet
                            </h3>

                            <p className="text-white/90 mb-6 flex-grow leading-relaxed">
                                A weekly newsletter on crypto, blockchains, and the technologies underpinning the next generation of the internet
                            </p>

                            {/* Newsletter Form */}
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your email"
                                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/50 h-12"
                                />
                                <Button
                                    type="submit"
                                    disabled={submittingNewsletter}
                                    className="w-full bg-black hover:bg-black/90 text-white font-bold h-12 rounded-lg"
                                >
                                    {submittingNewsletter ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        "subscribe"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

