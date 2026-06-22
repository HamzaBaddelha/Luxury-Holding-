import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocale } from "@/RTL/LocaleProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";

export const AboutHoldingSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  useGSAP(() => {
    gsap.fromTo(".about-mono", { x: 80, autoAlpha: 0 }, {
      x: 0, autoAlpha: 1, duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 70%" },
    });
  }, { scope: root });

  return (
    <section ref={root} id="about" className="relative bg-luxe-fg text-luxe-bg py-32 md:py-48">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-2">
          <span className="font-mono-luxe text-luxe-bg/50">{content.about.sectionLabel}</span>
        </div>
        <div className="md:col-span-7">
          <SplitTextReveal as="h2" className="font-display text-[12vw] md:text-[6.5vw] leading-[0.95] text-luxe-bg">
            {content.about.title}
          </SplitTextReveal>
          <div className="mt-12 max-w-xl">
            <SplitTextReveal as="p" stagger={0.012} className="text-luxe-bg/70 text-lg md:text-xl leading-relaxed font-light">
              {content.about.description}
            </SplitTextReveal>
          </div>
        </div>
        <div className="md:col-span-3 flex md:justify-end items-start">
          <div className="about-mono font-display text-[18vw] md:text-[12vw] leading-none text-luxe-bg/10">
            LH
          </div>
        </div>
      </div>
    </section>
  );
};
