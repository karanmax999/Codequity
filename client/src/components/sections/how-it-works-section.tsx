import { FeatureSteps } from "@/components/ui/feature-section";

const features = [
    {
        step: 'Step 1',
        title: 'Join the Guild',
        content: 'Start your Web3 journey by joining our community of 500+ builders. Access exclusive resources, L2/DeFi deep dives, and mentorship.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 'Step 2',
        title: 'Ship in Hackathons',
        content: 'Build real products in 48-72 hours. Ship a testnet MVP, validate with real users, and refine your smart contracts with protocol feedback.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 'Step 3',
        title: 'Launch & Fund',
        content: 'Graduate from weekend projects to Web3 startups. Launch on mainnet, onboard users, and pitch to top VCs and accelerators at Funding Day.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop'
    },
]

export default function HowItWorksSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-black" id="how-it-works">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <FeatureSteps
                    features={features}
                    title="From Idea to On-Chain Reality"
                    autoPlayInterval={5000}
                    imageHeight="h-[450px]"
                    className="p-0 md:p-0"
                />
            </div>
        </section>
    )
}
