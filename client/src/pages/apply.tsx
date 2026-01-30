import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2, Cpu, Globe, Gamepad2, Layers, Milestone, Rocket, Lightbulb, Puzzle } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

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

    const submitApplication = useMutation(api.applications.submit);

    // Forms for each step
    const form1 = useForm<z.infer<typeof step1Schema>>({ resolver: zodResolver(step1Schema), defaultValues: formData });
    const form2 = useForm<z.infer<typeof step2Schema>>({ resolver: zodResolver(step2Schema), defaultValues: formData });
    const form3 = useForm<z.infer<typeof step3Schema>>({ resolver: zodResolver(step3Schema), defaultValues: formData });

    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem("applyFormData");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(parsed);
                // Also update form instances
                form1.reset(parsed);
                form2.reset(parsed);
                form3.reset(parsed);
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
    }, []);

    // Save data whenever it changes
    useEffect(() => {
        localStorage.setItem("applyFormData", JSON.stringify(formData));
    }, [formData]);

    const onNextStep1 = (data: z.infer<typeof step1Schema>) => {
        const updated = { ...formData, ...data };
        setFormData(updated);
        localStorage.setItem("applyFormData", JSON.stringify(updated));
        setStep(2);
        window.scrollTo(0, 0);
    };

    const onNextStep2 = (data: z.infer<typeof step2Schema>) => {
        const updated = { ...formData, ...data };
        setFormData(updated);
        localStorage.setItem("applyFormData", JSON.stringify(updated));
        setStep(3);
        window.scrollTo(0, 0);
    };

    const onSubmit = async (data: z.infer<typeof step3Schema>) => {
        setIsSubmitting(true);
        const finalData = { ...formData, ...data };

        // Ensure all required fields are present before submitting
        // TS partial types mean we have to be careful, but the step flow guarantees them mostly
        if (!finalData.teamName || !finalData.email) {
            alert("Missing required fields. Please restart application.");
            setIsSubmitting(false);
            return;
        }

        try {
            await submitApplication({
                team_name: finalData.teamName!,
                lead_name: finalData.leadName!,
                email: finalData.email!,
                github_url: finalData.github,
                project_name: finalData.projectName,
                description: finalData.description,
                category: finalData.category,
                stage: finalData.stage,
                video_url: finalData.videoUrl,
                motivation: finalData.motivation
            });

            localStorage.removeItem("applyFormData");
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
                        className="max-w-md w-full bg-[#0A0A0A] border border-primary/20 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-10 text-primary border border-primary/20 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-orbitron font-black mb-6 uppercase tracking-tight">Transmission <br /><span className="text-primary italic">Received</span></h2>
                        <p className="text-gray-500 mb-10 font-medium leading-relaxed">
                            Your application for Cohort 3 is officially on-chain. Our review team will verify your credentials and respond via secure channels within 48 hours.
                        </p>
                        <div className="flex flex-col w-full gap-4">
                            <Button asChild className="bg-primary text-black font-black uppercase tracking-widest h-14 rounded-full hover:scale-105 transition-all">
                                <a href="https://discord.com/invite/XnhwAAGe" target="_blank" rel="noopener noreferrer">Join the Hive</a>
                            </Button>
                            <Button asChild variant="ghost" className="text-gray-500 hover:text-white font-bold uppercase tracking-widest">
                                <Link href="/">Back to Mission</Link>
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
            <Helmet>
                <title>Apply for Cohort 3 - CodeQuity</title>
                <meta name="description" content="Submit your application for CodeQuity's next cohort. Get funding, mentorship, and technical support for your Web3 startup." />
                <link rel="canonical" href="https://codequity.org/apply" />
            </Helmet>
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
                <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
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
                                        <label htmlFor="teamName" className="text-sm font-bold uppercase tracking-widest text-gray-400">Team Name</label>
                                        <input
                                            id="teamName"
                                            {...form1.register("teamName")}
                                            autoComplete="organization"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                            placeholder="e.g. AlgoRhythm"
                                        />
                                        {form1.formState.errors.teamName && <p className="text-red-400 text-xs">{form1.formState.errors.teamName.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="leadName" className="text-sm font-bold uppercase tracking-widest text-gray-400">Team Lead</label>
                                        <input
                                            id="leadName"
                                            {...form1.register("leadName")}
                                            autoComplete="name"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                            placeholder="Your full name"
                                        />
                                        {form1.formState.errors.leadName && <p className="text-red-400 text-xs">{form1.formState.errors.leadName.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input
                                        id="email"
                                        {...form1.register("email")}
                                        autoComplete="email"
                                        type="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                        placeholder="you@example.com"
                                    />
                                    {form1.formState.errors.email && <p className="text-red-400 text-xs">{form1.formState.errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="github" className="text-sm font-bold uppercase tracking-widest text-gray-400">GitHub Profile / Org</label>
                                    <input
                                        id="github"
                                        {...form1.register("github")}
                                        autoComplete="url"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
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

                                <div className="space-y-4">
                                    <label htmlFor="projectName" className="text-sm font-bold uppercase tracking-widest text-gray-400">Project Name</label>
                                    <input
                                        id="projectName"
                                        {...form2.register("projectName")}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                        placeholder="Name of your dApp"
                                    />
                                    {form2.formState.errors.projectName && <p className="text-red-400 text-xs">{form2.formState.errors.projectName.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Project Category</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: 'defi', label: 'DeFi', icon: Layers },
                                                { id: 'infra', label: 'Infra', icon: Cpu },
                                                { id: 'gaming', label: 'Gaming/NFT', icon: Gamepad2 },
                                                { id: 'social', label: 'Social', icon: Globe },
                                            ].map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => form2.setValue('category', cat.id)}
                                                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${form2.watch('category') === cat.id
                                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                                                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:bg-white/[0.08]'
                                                        }`}
                                                >
                                                    <cat.icon className={`w-6 h-6 ${form2.watch('category') === cat.id ? 'text-primary' : 'text-gray-600 group-hover:text-gray-400'} transition-colors`} />
                                                    <span className="text-[10px] font-black uppercase tracking-tight">{cat.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {form2.formState.errors.category && <p className="text-red-400 text-xs">{form2.formState.errors.category.message}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Current Stage</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: 'idea', label: 'Idea', icon: Lightbulb },
                                                { id: 'prototype', label: 'MVP', icon: Puzzle },
                                                { id: 'testnet', label: 'Testnet', icon: Milestone },
                                                { id: 'mainnet', label: 'Mainnet', icon: Rocket },
                                            ].map((stg) => (
                                                <button
                                                    key={stg.id}
                                                    type="button"
                                                    onClick={() => form2.setValue('stage', stg.id)}
                                                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${form2.watch('stage') === stg.id
                                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                                                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:bg-white/[0.08]'
                                                        }`}
                                                >
                                                    <stg.icon className={`w-6 h-6 ${form2.watch('stage') === stg.id ? 'text-primary' : 'text-gray-600 group-hover:text-gray-400'} transition-colors`} />
                                                    <span className="text-[10px] font-black uppercase tracking-tight">{stg.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {form2.formState.errors.stage && <p className="text-red-400 text-xs">{form2.formState.errors.stage.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="description" className="text-sm font-bold uppercase tracking-widest text-gray-400">Project Description</label>
                                    <textarea
                                        id="description"
                                        {...form2.register("description")}
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                        placeholder="What mission-critical problem are you solving?"
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

                                <div className="space-y-4">
                                    <label htmlFor="videoUrl" className="text-sm font-bold uppercase tracking-widest text-gray-400">Demo / Pitch Video URL</label>
                                    <input
                                        id="videoUrl"
                                        {...form3.register("videoUrl")}
                                        autoComplete="url"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
                                        placeholder="Loom, Youtube, or Drive link"
                                    />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Please record a 2-min walkthrough of your team/project.</p>
                                    {form3.formState.errors.videoUrl && <p className="text-red-400 text-xs">{form3.formState.errors.videoUrl.message}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="motivation" className="text-sm font-bold uppercase tracking-widest text-gray-400">Why CodeQuity?</label>
                                    <textarea
                                        id="motivation"
                                        {...form3.register("motivation")}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-700"
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
