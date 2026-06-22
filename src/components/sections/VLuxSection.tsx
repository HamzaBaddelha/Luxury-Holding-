import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { images } from "@/data/landing";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const VLuxSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  useGSAP(() => {
    gsap.fromTo(".vlux-logo", { scale: 0.85, autoAlpha: 0 }, {
      scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 60%" },
    });
    gsap.fromTo(".vlux-card", { x: 80, autoAlpha: 0 }, {
      x: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 55%" },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative z-10 min-h-[160vh] bg-luxe-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden relative">
        <img src={images.vlux} alt={content.vlux.backgroundAlt} className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-luxe-bg via-luxe-bg/85 to-luxe-bg" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 h-full grid md:grid-cols-2 items-center gap-12">
          <div className="vlux-logo">
            <div className="font-display text-luxe-fg text-[24vw] md:text-[14vw] leading-none">
              V<span className="text-luxe-accent">·</span>LUX
            </div>
            <div className="font-mono-luxe text-luxe-silver/70 mt-4">{content.vlux.subtitle}</div>
          </div>

          <div className="vlux-card md:justify-self-end">
            <div className="max-w-md p-10 backdrop-blur-xl bg-luxe-fg/[0.04] border border-luxe-fg/10">
              <SplitTextReveal as="h3" className="font-display text-luxe-fg text-4xl md:text-5xl leading-tight">
                {content.vlux.title}
              </SplitTextReveal>
              <p className="mt-6 text-luxe-silver/80 leading-relaxed">
                {content.vlux.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
