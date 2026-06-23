import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import type { SiteCopy } from "@/RTL/en";
import { images } from "@/data/landing";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MateraSectionKey = "baddelha" | "materaEvents";

export const BaddelhaSection = ({ sectionKey = "baddelha" }: { sectionKey?: MateraSectionKey }) => {
  const root = useRef<HTMLElement>(null);
  const { content, isArabic } = useLocale();
  const section = content[sectionKey] as SiteCopy["baddelha"];
  const isMateraEvents = sectionKey === "materaEvents";

  useGSAP(() => {
    gsap.fromTo(".bad-img", { clipPath: "inset(0 0 100% 0)" }, {
      clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 70%" },
    });
    gsap.fromTo(".bad-step", { y: 30, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: ".bad-steps", start: "top 80%" },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative z-30 bg-[#f0e6da] text-luxe-bg py-32 md:py-48">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 ${isMateraEvents ? "md:[direction:ltr]" : ""}`}>
        <div className={`md:col-span-5 ${isMateraEvents ? "md:order-2" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
          <span className="font-mono-luxe text-luxe-bg/50">{section.sectionLabel}</span>
          <img
            src="/images/matera-logo.png"
            alt="Matera logo"
            className="mt-6 h-20 md:h-24 w-auto"
          />
          <SplitTextReveal as="h2" className="mt-6 font-display text-luxe-bg text-[12vw] md:text-[5.5vw] leading-[0.95]">
            {section.title}
          </SplitTextReveal>
          <p className="mt-8 max-w-md text-luxe-bg/70 text-lg leading-relaxed">
            {section.description}
          </p>

          <div className="bad-steps mt-12 space-y-6">
            {section.steps.map((s) => (
              <div key={s.n} className="bad-step flex items-start gap-6 border-t border-luxe-bg/10 pt-6">
                <span className="font-mono-luxe text-luxe-accent">{s.n}</span>
                <div>
                  <div className="font-display text-2xl">{s.t}</div>
                  <div className="text-luxe-bg/60 mt-1">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`md:col-span-7 ${isMateraEvents ? "md:order-1" : ""}`}>
          <div className="bad-img relative w-full aspect-[4/5] overflow-hidden">
            {isMateraEvents ? (
              <video
                src="/images/matera_catering.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={section.imageAlt}
              />
            ) : (
              <img src={images.matera} alt={section.imageAlt} className="w-full h-full object-cover" loading="lazy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
