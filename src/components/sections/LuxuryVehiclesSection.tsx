import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { images } from "@/data/landing";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const LuxuryVehiclesSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  useGSAP(() => {
    gsap.to(".lv-bg", {
      yPercent: 10, scale: 1.1, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-luxe-bg">
      <div className="lv-bg absolute inset-0 will-change-transform">
        <img src={images.lux} alt={content.luxuryVehicles.imageAlt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-luxe-bg/55" />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 min-h-screen grid md:grid-cols-2 gap-12 items-center py-32">
        <div>
          <span className="font-mono-luxe text-luxe-accent">{content.luxuryVehicles.sectionLabel}</span>
          <SplitTextReveal as="h2" className="font-display text-luxe-fg text-[12vw] md:text-[5.5vw] leading-[0.95] mt-6">
            {content.luxuryVehicles.title}
          </SplitTextReveal>
          <p className="mt-8 max-w-md text-luxe-silver/85 text-lg leading-relaxed">
            {content.luxuryVehicles.description}
          </p>
        </div>
        <div className="md:justify-self-end">
          <div className="font-display text-luxe-fg/15 text-[18vw] md:text-[14vw] leading-none">LV</div>
        </div>
      </div>
    </section>
  );
};
