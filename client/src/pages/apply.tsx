import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";

// Validation Schemas
const step1Schema = z.object({
    teamName: z.string().min(2, "Team name is required"),
    leadName: z.string().min(2, "Lead name is required"),
    email: z.string().email("Invalid email"),
    github: z.string().url("Valid GitHub URL required"),
});

const step2Schema = z.object({
    projectName: z.string().min(2, "Project name is required"),
    description: z.string().min(50, "Please provide at least 50 characters"),
    stage: z.string().min(1, "Select a stage"),
    category: z.string().min(1, "Select a category"),
});

const step3Schema = z.object({
    videoUrl: z.string().url("Valid Demo/Loom URL required"),
    motivation: z.string().min(20, "Please tell us why you want to join"),
});

type FormValues = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

export default function Apply() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<FormValues>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Forms for each step
    const form1 = useForm<z.infer<typeof step1Schema>>({ resolver: zodResolver(step1Schema), defaultValues: formData });
    const form2 = useForm<z.infer<typeof step2Schema>>({ resolver: zodResolver(step2Schema), defaultValues: formData });
    const form3 = useForm<z.infer<typeof step3Schema>>({ resolver: zodResolver(step3Schema), defaultValues: formData });

    const onNextStep1 = (data: z.infer<typeof step1Schema>) => {
        setFormData({ ...formData, ...data });
        setStep(2);
    };

    const onNextStep2 = (data: z.infer<typeof step2Schema>) => {
        setFormData({ ...formData, ...data });
        setStep(3);
    };

    const onSubmit = async (data: z.infer<typeof step3Schema>) => {
        if (!supabase) {
            alert("Database connection not configured. Please set your VITE_SUPABASE environment variables.");
            return;
        }

        setIsSubmitting(true);
        const finalData = { ...formData, ...data };

        try {
            const { error } = await supabase
                .from('applications')
                .insert([{
                    team_name: finalData.teamName,
                    lead_name: finalData.leadName,
                    email: finalData.email,
                    github: finalData.github,
                    project_name: finalData.projectName,
                    description: finalData.description,
                    category: finalData.category,
                    stage: finalData.stage,
                    video_url: finalData.videoUrl,
                    motivation: finalData.motivation
                }]);

            if (error) throw error;

            setIsSuccess(true);
        } catch (error: any) {
            console.error("Submission error:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { title: "Team Info", desc: "Who are you?" },
        { title: "Project", desc: "What are you building?" },
        { title: "Pitch", desc: "Show us the magic" },
    ];

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white/5 border border-primary/30 rounded-3xl p-8 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-orbitron font-bold mb-4">Application Received!</h2>
                        <p className="text-muted-foreground mb-8">
                            Your application for Cohort 3 looks solid. Our team will review it and get back to you within 48 hours via email.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild className="bg-white/10 hover:bg-white/20">
                                <Link href="/">Back Home</Link>
                            </Button>
                            <Button asChild className="bg-primary hover:bg-primary/90 text-black">
                                <a href="https://discord.gg/codequity" target="_blank" rel="noopener noreferrer">Join Discord</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navigation />

            <div className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
                        Join <span className="gradient-text">Cohort 3</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Applications close in 5 days. Build your legacy on-chain.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 relative flex justify-between items-center max-w-xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />

                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 bg-black
                        ${step > i + 1 ? 'border-primary text-primary' : step === i + 1 ? 'border-primary text-white scale-110' : 'border-white/10 text-muted-foreground'}
                    `}>
                                {i + 1}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${step === i + 1 ? 'text-white' : 'text-muted-foreground'}`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={form1.handleSubmit(onNextStep1)}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold font-orbitron">Team Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Team Name</label>
                                        <input
                                            {...form1.register("teamName")}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                            placeholder="e.g. AlgoRhythm"
                                        />
                                        {form1.formState.errors.teamName && <p className="text-red-400 text-xs">{form1.formState.errors.teamName.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Team Lead</label>
                                        <input
                                            {...form1.register("leadName")}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                            placeholder="Your full name"
                                        />
                                        {form1.formState.errors.leadName && <p className="text-red-400 text-xs">{form1.formState.errors.leadName.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                                    <input
                                        {...form1.register("email")}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="you@example.com"
                                    />
                                    {form1.formState.errors.email && <p className="text-red-400 text-xs">{form1.formState.errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">GitHub Profile / Org</label>
                                    <input
                                        {...form1.register("github")}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="github.com/username"
                                    />
                                    {form1.formState.errors.github && <p className="text-red-400 text-xs">{form1.formState.errors.github.message}</p>}
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-xl px-8 py-6 font-bold text-base flex items-center gap-2">
                                        Next Step <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.form>
                        )}

                        {step === 2 && (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={form2.handleSubmit(onNextStep2)}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold font-orbitron">What are you building?</h2>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Project Name</label>
                                    <input
                                        {...form2.register("projectName")}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="Name of your dApp"
                                    />
                                    {form2.formState.errors.projectName && <p className="text-red-400 text-xs">{form2.formState.errors.projectName.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Category</label>
                                        <select
                                            {...form2.register("category")}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white appearance-none"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="defi">DeFi</option>
                                            <option value="infra">Infrastructure</option>
                                            <option value="gaming">Gaming/NFT</option>
                                            <option value="social">Social</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {form2.formState.errors.category && <p className="text-red-400 text-xs">{form2.formState.errors.category.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Current Stage</label>
                                        <select
                                            {...form2.register("stage")}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white appearance-none"
                                        >
                                            <option value="">Select Stage</option>
                                            <option value="idea">Idea Phase</option>
                                            <option value="prototype">Prototype / MVP</option>
                                            <option value="testnet">Live on Testnet</option>
                                            <option value="mainnet">Live on Mainnet</option>
                                        </select>
                                        {form2.formState.errors.stage && <p className="text-red-400 text-xs">{form2.formState.errors.stage.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Description</label>
                                    <textarea
                                        {...form2.register("description")}
                                        rows={4}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="Describe your solution in 2-3 sentences..."
                                    />
                                    {form2.formState.errors.description && <p className="text-red-400 text-xs">{form2.formState.errors.description.message}</p>}
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <Button type="button" onClick={() => setStep(1)} variant="ghost" className="text-gray-400 hover:text-white px-0 hover:bg-transparent">
                                        <ChevronLeft className="w-5 h-5 mr-2" /> Back
                                    </Button>
                                    <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-xl px-8 py-6 font-bold text-base flex items-center gap-2">
                                        Next Step <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.form>
                        )}

                        {step === 3 && (
                            <motion.form
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={form3.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold font-orbitron">Final Pitch</h2>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Demo / Pitch Video URL</label>
                                    <input
                                        {...form3.register("videoUrl")}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="Loom, Youtube, or Drive link"
                                    />
                                    <p className="text-xs text-muted-foreground">Please record a 2-min walkthrough of your team/project.</p>
                                    {form3.formState.errors.videoUrl && <p className="text-red-400 text-xs">{form3.formState.errors.videoUrl.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Why CodeQuity?</label>
                                    <textarea
                                        {...form3.register("motivation")}
                                        rows={3}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                        placeholder="What help do you need most? (Funding, Tech, GTM)"
                                    />
                                    {form3.formState.errors.motivation && <p className="text-red-400 text-xs">{form3.formState.errors.motivation.message}</p>}
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <Button type="button" onClick={() => setStep(2)} variant="ghost" className="text-gray-400 hover:text-white px-0 hover:bg-transparent">
                                        <ChevronLeft className="w-5 h-5 mr-2" /> Back
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-black rounded-xl px-8 py-6 font-bold text-base flex items-center gap-2 min-w-[160px] justify-center">
                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                                    </Button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
}
