import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { images } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cardImages = [images.lux, images.vlux, images.bad, images.swap, images.showcaseLuxury];

export const HorizontalShowcaseSection = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { content, locale } = useLocale();
  const isArabic = locale === "ar";

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!track.current) return;
      const total = track.current.scrollWidth - window.innerWidth;
      gsap.set(track.current, { x: 0 });
      gsap.to(track.current, {
        x: isArabic ? total : -total,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [isArabic] });

  return (
    <section ref={root} id="showcase" className="relative bg-luxe-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-16">
        <span className="font-mono-luxe text-luxe-accent">{content.showcase.sectionLabel}</span>
        <h2 className="mt-4 font-display text-luxe-fg text-[10vw] md:text-[5vw] leading-[0.95]">{content.showcase.title}</h2>
      </div>

      <div className="relative md:[perspective:1200px]">
        <div ref={track} className={`flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-12 pb-32 will-change-transform ${isArabic ? "md:flex-row-reverse" : ""}`}>
          {content.showcase.cards.map((c, i) => (
            <article
              key={`${c.title}-${i}`}
              className="relative shrink-0 w-full md:w-[40vw] aspect-[3/4] overflow-hidden bg-luxe-soft group"
              style={{ transform: `rotateY(${i % 2 === 0 ? -3 : 3}deg)` }}
            >
              <img src={cardImages[i]} alt={c.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxe-bg via-luxe-bg/20 to-transparent" />
              <div className="absolute left-0 right-0 bottom-0 p-8">
                <div className="font-mono-luxe text-luxe-accent">{c.tag}</div>
                <div className="font-display text-luxe-fg text-3xl md:text-4xl mt-2">{c.title}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
