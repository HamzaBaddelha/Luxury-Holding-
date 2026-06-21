import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { images } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // image scale in
    gsap.fromTo(imgRef.current, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "expo.out", delay: 1.8 });

    // big 2030 parallax on scroll
    gsap.to(bigRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });

    // hero content fade out
    gsap.to(".hero-content", {
      yPercent: -20,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 30%", scrub: true },
    });

    // image parallax on mouse
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(imgRef.current, { x, y, duration: 1.2, ease: "power3.out" });
    };
    window.addEventListener("mousemove", onMove);

    // CTA stagger
    gsap.fromTo(
      ctaRef.current?.children || [],
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.12, delay: 2.5 }
    );

    // scroll indicator bob
    gsap.to(scrollIndRef.current, { y: 8, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return () => window.removeEventListener("mousemove", onMove);
  }, { scope: root });

  return (
    <section ref={root} id="hero" className="relative min-h-screen overflow-hidden bg-luxe-bg noise-overlay">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={images.hero}
          alt="Riyadh skyline — Luxury Holding"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxe-bg/85 via-luxe-bg/55 to-luxe-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxe-bg/80 via-transparent to-luxe-bg/50" />
      </div>

      {/* Big 2030 background text */}
      <div ref={bigRef} className="absolute bottom-[-6vw] left-0 right-0 text-center pointer-events-none select-none">
        <span className="font-display text-luxe-fg/[0.06] text-[40vw] md:text-[28vw] leading-none">2030</span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-end pb-32 pt-32">
        <div className="hero-content max-w-4xl">
          <div className="overflow-hidden mb-8">
            <SplitTextReveal as="span" trigger={false} delay={2} className="font-mono-luxe text-luxe-accent block">
              Luxury Holding — Riyadh, Saudi Arabia
            </SplitTextReveal>
          </div>

          <SplitTextReveal
            as="h1"
            trigger={false}
            delay={2.1}
            stagger={0.04}
            className="font-display text-luxe-fg text-[10vw] md:text-[6.5vw] leading-[0.95] tracking-tight"
          >
            Building a premium automotive ecosystem.
          </SplitTextReveal>

          <div className="mt-10 max-w-xl overflow-hidden">
            <SplitTextReveal as="p" trigger={false} delay={2.6} stagger={0.015} className="text-luxe-silver/80 text-lg leading-relaxed">
              Luxury Holding unites leading automotive companies, premium services and innovative customer experiences — aligned with Saudi Vision 2030.
            </SplitTextReveal>
          </div>

          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <MagneticButton className="group inline-flex items-center gap-3 px-7 py-4 bg-luxe-fg text-luxe-bg font-mono-luxe">
              Explore the Group
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>
            <MagneticButton className="inline-flex items-center gap-3 px-7 py-4 border border-luxe-fg/20 text-luxe-fg font-mono-luxe hover:border-luxe-accent">
              Our Companies
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="font-mono-luxe text-luxe-silver/60">Scroll</span>
        <ArrowDown className="w-4 h-4 text-luxe-accent" />
      </div>
    </section>
  );
};
