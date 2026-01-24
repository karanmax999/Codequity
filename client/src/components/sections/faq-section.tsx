import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What is CodeEquity about?",
        answer: "CodeEquity is an educational community focused on blockchain and Web3 learning. We help learners and developers understand different blockchains, how they work, and how they’re used in real-world applications through structured content and discussions.",
    },
    {
        question: "What is “48 Weeks, 48 Blockchains”?",
        answer: "“48 Weeks, 48 Blockchains” is a long-term educational initiative where we explore one blockchain each week. Each week focuses on breaking down how the blockchain works, its key features, use cases, and ecosystem opportunities.",
    },
    {
        question: "Who can join the CodeEquity community?",
        answer: "Anyone interested in learning about blockchain and Web3 is welcome - beginners, students, developers, founders, and curious learners. No prior blockchain experience is required.",
    },
    {
        question: "Is the content beginner-friendly?",
        answer: "Yes. Content is designed to be clear and easy to understand, while still offering value to more advanced learners. We focus on explaining concepts step by step and avoiding unnecessary complexity.",
    },
    {
        question: "How can I stay updated or participate?",
        answer: "You can stay updated by following CodeEquity on social platforms, engaging with weekly content, joining discussions in the community, and asking questions. Participation and curiosity are encouraged.",
    },
];

export default function FAQSection() {
    return (
        <section id="faq" className="py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-orbitron font-bold mb-4 gradient-text"
                    >
                        FAQS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Everything you need to know about the community and our initiatives.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl px-6 transition-all hover:border-primary/30"
                            >
                                <AccordionTrigger className="text-left font-orbitron hover:no-underline py-6 text-lg hover:text-primary transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
