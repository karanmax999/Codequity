import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/sections/hero-section";
import CommunityStats from "@/components/sections/community-stats";
import EventsSection from "@/components/sections/events-section";
import BuilderGuildSection from "@/components/sections/builder-guild-section";
import AboutSection from "@/components/sections/about-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import ContactSection from "@/components/sections/contact-section";
import FeaturedSection from "@/components/sections/featured-section";
import RealityTransition from "@/components/sections/reality-transition";
import Footer from "@/components/ui/footer";
import transitionCity from "@/assets/transition-city.jpg";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CodeQuity - Building the Next Generation of Web3 Founders</title>
        <meta name="description" content="Join India's premier Web3 startup foundry. We help student builders turn hackathon projects into funded on-chain businesses." />
        <link rel="canonical" href="https://codequity.org/" />
      </Helmet>
      <Navigation />
      <HeroSection />
      <FeaturedSection />
      <RealityTransition />


      <CommunityStats />
      <EventsSection />
      <BuilderGuildSection />
      <AboutSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
