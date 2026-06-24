import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { images } from "@/data/landing";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const companyImages = [images.lux, images.vlux, images.bad, images.swap, images.mawlha];
const companyLogos: Record<string, string | undefined> = {
  "02": images.vluxLogo,
  "03": images.baddelhaLogo,
  "04": images.swapcarLogo,
};

export const CompaniesStackSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".stack-panel");
      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        gsap.to(panel, {
          scale: 0.92,
          autoAlpha: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="companies" className="relative bg-luxe-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-16">
        <span className="font-mono-luxe text-luxe-accent">{content.companies.sectionLabel}</span>
        <h2 className="font-display text-luxe-fg text-[12vw] md:text-[6vw] leading-[0.95] mt-4">{content.companies.title}</h2>
      </div>

      <div>
        {content.companies.items.map((c, i) => (
          <div
            key={c.id}
            className="stack-panel sticky top-0 h-screen w-full bg-luxe-bg origin-center"
            style={{ zIndex: i + 1 }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {c.id === "01" ? (
                <video
                  src="/images/JAECOO-video.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={c.name}
                />
              ) : (
                <img src={companyImages[i]} alt={c.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-luxe-bg via-luxe-bg/60 to-luxe-bg/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-luxe-bg/70 to-transparent" />

              <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-20 md:pb-32">
                {companyLogos[c.id] ? (
                  <img
                    src={companyLogos[c.id]}
                    alt={`${c.name} logo`}
                    className="mb-8 h-24 md:h-32 lg:h-40 w-auto object-contain"
                    loading="lazy"
                  />
                ) : null}
                <div className="flex items-center gap-6 mb-6">
                  <span className="font-mono-luxe text-luxe-accent">{c.id}</span>
                  <span className="h-px w-16 bg-luxe-accent/50" />
                  <span className="font-mono-luxe text-luxe-silver/70">{c.tag}</span>
                </div>
                <h3 className="font-display text-luxe-fg text-[16vw] md:text-[9vw] leading-[0.9]">{c.name}</h3>
                <div className="mt-8 grid md:grid-cols-12 gap-8 items-end">
                  <p className="md:col-span-6 text-luxe-silver/80 text-lg leading-relaxed max-w-lg">{c.desc}</p>
                  <div className="md:col-span-6 md:flex md:justify-end">
                    <a
                      href={c.href}
                      className="group inline-flex items-center gap-3 px-7 py-4 border border-luxe-fg/15 text-luxe-fg font-mono-luxe hover:border-luxe-accent hover:text-luxe-accent transition-colors"
                    >
                      {c.cta}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
