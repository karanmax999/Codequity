import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/sections/hero-section";
import CommunityStats from "@/components/sections/community-stats";
import EventsSection from "@/components/sections/events-section";
import BuilderGuildSection from "@/components/sections/builder-guild-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/ui/footer";

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
      <CommunityStats />
      <EventsSection />
      <BuilderGuildSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
