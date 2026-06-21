import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cards = [
  { title: "Luxury Vehicles", tag: "Showroom", image: images.lux },
  { title: "V-LUX Accessories", tag: "Customization", image: images.vlux },
  { title: "Baddelha", tag: "Trade-In", image: images.bad },
  { title: "Swap Car", tag: "Mobility", image: images.swap },
  { title: "Vision 2030", tag: "Alignment", image: images.skyline },
  { title: "Riyadh Showroom", tag: "Flagship", image: images.showroom },
];

export const HorizontalShowcaseSection = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!track.current) return;
      const total = track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -total,
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
  }, { scope: root });

  return (
    <section ref={root} id="showcase" className="relative bg-luxe-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-16">
        <span className="font-mono-luxe text-luxe-accent">[ 07 ] Showcase</span>
        <h2 className="mt-4 font-display text-luxe-fg text-[10vw] md:text-[5vw] leading-[0.95]">The ecosystem, in motion.</h2>
      </div>

      <div className="relative" style={{ perspective: "1200px" }}>
        <div ref={track} className="flex gap-8 md:gap-12 px-6 md:px-12 pb-32 will-change-transform">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className="relative shrink-0 w-[80vw] md:w-[40vw] aspect-[3/4] overflow-hidden bg-luxe-soft group"
              style={{ transform: `rotateY(${i % 2 === 0 ? -3 : 3}deg)` }}
            >
              <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
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
