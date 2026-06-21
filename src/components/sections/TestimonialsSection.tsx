import { useEffect, useRef } from "react";
import gsap from "gsap";
import { testimonials } from "@/data/landing";

const rows = [
  [...testimonials, ...testimonials],
  [...testimonials.slice().reverse(), ...testimonials.slice().reverse()],
];

export const TestimonialsSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const rowsEls = root.current!.querySelectorAll<HTMLDivElement>(".marq-row");
    const tweens: gsap.core.Tween[] = [];
    rowsEls.forEach((row, i) => {
      const w = row.scrollWidth / 2;
      const tw = gsap.to(row, {
        x: i === 0 ? -w : 0,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % -w) },
      });
      if (i === 1) {
        gsap.set(row, { x: -w });
        tw.kill();
        tweens.push(gsap.to(row, { x: 0, duration: 60, ease: "none", repeat: -1 }));
      } else {
        tweens.push(tw);
      }

      row.addEventListener("mouseenter", () => tweens[i].pause());
      row.addEventListener("mouseleave", () => tweens[i].resume());
    });
    return () => { tweens.forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={root} className="relative bg-luxe-fg text-luxe-bg py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
        <span className="font-mono-luxe text-luxe-bg/50">[ 08 ] Clients</span>
        <h2 className="mt-4 font-display text-[10vw] md:text-[5vw] leading-[0.95]">Trusted across the Kingdom.</h2>
      </div>

      <div className="space-y-6">
        {rows.map((row, i) => (
          <div key={i} className="overflow-hidden">
            <div className="marq-row flex gap-6 will-change-transform">
              {row.map((t, j) => (
                <article
                  key={`${i}-${j}`}
                  className="shrink-0 w-[320px] h-[180px] p-6 bg-luxe-bg text-luxe-fg flex flex-col justify-between"
                >
                  <p className="text-sm leading-relaxed line-clamp-4 text-luxe-silver">{t.text}</p>
                  <div className="flex items-center justify-between">
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
