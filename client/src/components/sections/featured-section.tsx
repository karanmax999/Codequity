import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFeaturedSection } from "@/hooks/use-featured-section";
import { Link } from "wouter";
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
        <section className="relative py-32 bg-white border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 border-b border-gray-200"
                >
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black pb-8">
                        FEATURED
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Featured Articles */}
                    {loading ? (
                        [1, 2].map((i) => (
                            <div key={i} className={`h-auto min-h-[20rem] lg:h-80 border-gray-200 border-b lg:border-b-0 ${i === 1 ? 'lg:border-r border-dotted' : ''} p-8 animate-pulse bg-gray-50`} />
                        ))
                    ) : (
                        articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`group relative p-8 h-auto min-h-[20rem] lg:h-80 flex flex-col border-gray-200 border-b lg:border-b-0 lg:border-r border-dotted`}
                            >
                                <Link href={article.link || '#'}>
                                    <div className="cursor-pointer h-full flex flex-col">
                                        <h3 className="text-xl xs:text-2xl sm:text-[2.2rem] leading-tight font-medium text-black mb-4 group-hover:text-primary transition-colors tracking-tight">
                                            {article.title}
                                        </h3>

                                        <p className="text-[#606060] text-sm mb-10 flex-grow leading-relaxed line-clamp-3">
                                            {article.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {article.tags?.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-4 py-1.5 text-[0.7rem] font-bold text-gray-400 bg-white border border-gray-200 rounded-full hover:border-black hover:text-black transition-all uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}

                    {/* Newsletter Card (The 3rd Column) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="h-auto min-h-[20rem] lg:h-80"
                    >
                        <div className="bg-[#A0E2EF] p-10 h-full flex flex-col justify-between">
                            <div>
                                <span className="inline-block text-[0.65rem] font-black uppercase tracking-[0.2em] text-black mb-6">
                                    newsletter
                                </span>

                                <h3 className="text-xl xs:text-2xl sm:text-[1.8rem] leading-none font-medium text-black mb-4">
                                    web3 with Codequity: Your guide to the next internet
                                </h3>

                                <p className="text-black/70 text-xs mb-8 leading-relaxed">
                                    A weekly briefing on the protocols, builders, and technologies shaping the decentralized future.
                                </p>
                            </div>

                            {/* Newsletter Form */}
                            <form onSubmit={handleSubscribe} className="relative flex items-center bg-white rounded-full p-1 pl-6 shadow-sm">
                                <input
                                    id="newsletter-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your email"
                                    className="flex-grow bg-transparent border-none text-black placeholder:text-gray-400 focus:ring-0 text-sm outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={submittingNewsletter}
                                    className="bg-black hover:bg-black/90 text-white font-bold text-[0.7rem] uppercase tracking-widest px-8 py-3 rounded-full transition-all disabled:opacity-50"
                                >
                                    {submittingNewsletter ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        "subscribe"
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

