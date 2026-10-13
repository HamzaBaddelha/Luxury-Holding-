import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/sections/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutHoldingSection } from "@/components/sections/AboutHoldingSection";
import { Vision2030Section } from "@/components/sections/Vision2030Section";
import { CompaniesStackSection } from "@/components/sections/CompaniesStackSection";
import { LuxuryVehiclesSection } from "@/components/sections/LuxuryVehiclesSection";
import { VLuxSection } from "@/components/sections/VLuxSection";
import { LuxuryVehiclesCollectionSection } from "@/components/sections/LuxuryVehiclesCollectionSection";
import { BaddelhaSection } from "@/components/sections/BaddelhaSection";
import { HorizontalShowcaseSection } from "@/components/sections/HorizontalShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const Index = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !location.hash) return;

    const id = location.hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, ready]);

  return (
    <LenisProvider>
      <Preloader onDone={handleReady} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AboutHoldingSection />
        <Vision2030Section />
        <CompaniesStackSection />
        <LuxuryVehiclesSection />
        <VLuxSection />
        <LuxuryVehiclesCollectionSection />
        <BaddelhaSection />
        <BaddelhaSection sectionKey="materaEvents" />
        <HorizontalShowcaseSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </LenisProvider>
  );
};

export default Index;
