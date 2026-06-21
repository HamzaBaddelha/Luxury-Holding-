import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images, stats } from "@/data/landing";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Vision2030Section = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: ".v2030-sticky",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });
      tl.to(".v2030-bg", { scale: 1.18, ease: "none" }, 0)
        .to(".v2030-big", { xPercent: -10, ease: "none" }, 0)
        .from(".v2030-stat", { yPercent: 60, autoAlpha: 0, stagger: 0.15, ease: "power2.out" }, 0.2)
        .to(".v2030-copy", { autoAlpha: 0.4, ease: "none" }, 0.6);
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="vision" className="relative bg-luxe-bg" style={{ height: "250vh" }}>
      <div className="v2030-sticky h-screen w-full overflow-hidden relative noise-overlay">
        <div className="v2030-bg absolute inset-0 will-change-transform">
          <img src={images.skyline} alt="Riyadh skyline" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-luxe-bg/70 via-luxe-bg/30 to-luxe-bg" />
        </div>

        <div className="v2030-big absolute -bottom-[10vw] left-0 right-0 text-center pointer-events-none select-none">
          <span className="font-display text-luxe-fg/[0.08] text-[36vw] md:text-[24vw] leading-none whitespace-nowrap">VISION 2030</span>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
          <span className="font-mono-luxe text-luxe-accent">[ 02 ] Aligned with the Kingdom</span>
          <SplitTextReveal as="h2" className="mt-6 font-display text-luxe-fg text-[14vw] md:text-[8vw] leading-[0.9]">
            Vision 2030.
          </SplitTextReveal>
          <p className="v2030-copy mt-10 max-w-xl text-luxe-silver/80 text-lg leading-relaxed">
            Driving the next era of Saudi mobility — through private sector growth, premium service standards, and innovation that places the Kingdom at the center of the global automotive map.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label} className="v2030-stat">
                <div className="font-display text-luxe-accent text-4xl md:text-5xl">{s.value}</div>
                <div className="mt-2 font-mono-luxe text-luxe-silver/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
