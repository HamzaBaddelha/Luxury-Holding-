import { useState } from "react";
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
import { BaddelhaSection } from "@/components/sections/BaddelhaSection";
import { HorizontalShowcaseSection } from "@/components/sections/HorizontalShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const Index = () => {
  const [, setReady] = useState(false);

  return (
    <LenisProvider>
      <Preloader onDone={() => setReady(true)} />
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
        <BaddelhaSection />
        <HorizontalShowcaseSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </LenisProvider>
  );
};

export default Index;
