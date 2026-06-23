import { useNavigate } from "react-router-dom";
import { useLocale } from "@/RTL/LocaleProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LocationsMap } from "@/components/locations/LocationsMap";

const Locations = () => {
  const navigate = useNavigate();
  const { content, isArabic } = useLocale();
  const page = content.locationsPage;

  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative min-h-screen overflow-x-hidden bg-[#0f171c] text-[#c6c3c2]">
        <section className="relative overflow-hidden border-b border-white/8 pt-36 md:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,29,46,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />
          <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 pb-20 md:pb-28">
            <div className="max-w-4xl" dir={isArabic ? "rtl" : "ltr"}>
              <span className="font-mono-luxe text-[#e11d2e]">{page.sectionLabel}</span>
              <div className="mt-6 font-mono-luxe text-[#a09a98]">{page.eyebrow}</div>
              <SplitTextReveal
                as="h1"
                trigger={false}
                className="mt-6 max-w-5xl font-display text-[16vw] leading-[0.88] text-white md:text-[7vw]"
              >
                {page.title}
              </SplitTextReveal>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#c6c3c2] md:text-xl">
                {page.subtitle}
              </p>
              <MagneticButton
                type="button"
                onClick={() => navigate("/#contact")}
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 px-6 py-3 font-mono-luxe text-white transition-colors hover:border-[#e11d2e] hover:text-[#e11d2e]"
              >
                {page.ctaLabel}
              </MagneticButton>
            </div>
          </div>
        </section>

        <LocationsMap />

        <Footer />
      </main>
    </LenisProvider>
  );
};

export default Locations;
