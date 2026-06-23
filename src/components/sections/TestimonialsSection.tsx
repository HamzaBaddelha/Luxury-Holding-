import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useLocale } from "@/RTL/LocaleProvider";

export const TestimonialsSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content, isArabic } = useLocale();
  const rows = useMemo(() => {
    const items = content.testimonials.items;
    return [
      [...items, ...items],
      [...items.slice().reverse(), ...items.slice().reverse()],
    ];
  }, [content.testimonials.items]);

  useEffect(() => {
    if (!root.current) return;

    const rowsEls = root.current.querySelectorAll<HTMLDivElement>(".marq-row");
    const tweens: gsap.core.Tween[] = [];
    const cleanups: Array<() => void> = [];

    rowsEls.forEach((row, i) => {
      const w = row.scrollWidth / 2;
      const startX = i === 0 ? 0 : -w;
      const endX = i === 0 ? -w : 0;

      gsap.set(row, { x: startX });

      const tween = gsap.to(row, {
        x: endX,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const value = parseFloat(x);
            return gsap.utils.wrap(-w, 0, value);
          }),
        },
      });

      tweens.push(tween);

      const onEnter = () => tween.pause();
      const onLeave = () => tween.resume();
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      tweens.forEach((tween) => tween.kill());
    };
  }, [rows]);

  return (
    <section ref={root} className="relative bg-luxe-fg text-luxe-bg py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16" dir={isArabic ? "rtl" : "ltr"}>
        <span className="font-mono-luxe text-luxe-bg/50">{content.testimonials.sectionLabel}</span>
        <h2 className="mt-4 font-display text-[10vw] md:text-[5vw] leading-[0.95]">{content.testimonials.title}</h2>
      </div>

      <div className="space-y-6">
        {rows.map((row, i) => (
          <div key={i} className="overflow-hidden">
            <div className="marq-row flex gap-6 will-change-transform" dir="ltr">
              {row.map((t, j) => (
                <article
                  key={`${i}-${j}`}
                  className="shrink-0 w-[320px] h-[180px] p-6 bg-luxe-bg text-luxe-fg flex flex-col justify-between"
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <p className="text-sm leading-relaxed line-clamp-4 text-luxe-silver">{t.text}</p>
                  <div className={`flex items-center justify-between ${isArabic ? "flex-row-reverse" : ""}`}>
                    <span className="font-display text-lg">{t.name}</span>
                    <span className="font-mono-luxe text-luxe-accent">{t.company}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
