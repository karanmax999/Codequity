import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/sections/hero-section";
import CommunityStats from "@/components/sections/community-stats";
import EventsSection from "@/components/sections/events-section";
import BuilderGuildSection from "@/components/sections/builder-guild-section";
import AboutSection from "@/components/sections/about-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import ContactSection from "@/components/sections/contact-section";
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
      <Navigation />
      <HeroSection />

      {/* Visual Transition Image */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden -mt-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        <img
          src={transitionCity}
          alt="Future City"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-5xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 tracking-tighter opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            THE REALITY
          </h2>
        </div>
      </div>

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
