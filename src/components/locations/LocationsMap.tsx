import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LocationItem = {
  id: number;
  name: string;
  city: string;
  area: string;
  description: string;
  x: number;
  y: number;
  mapsUrl: string;
};

// Edit this array to update location names, descriptions, x/y map positions, or maps links.
const locations: LocationItem[] = [
  {
    id: 1,
    name: "Luxury Holding - Khurais Road",
    city: "Riyadh",
    area: "Khurais Road",
    description: "Main automotive location serving customers across Riyadh.",
    x: 26,
    y: 58,
    mapsUrl: "https://maps.app.goo.gl/685jku218QnjPxSaA?g_st=aw",
  },
  {
    id: 2,
    name: "Luxury Holding - Al Kairouan",
    city: "Riyadh",
    area: "Al Kairouan",
    description: "Premium branch supporting the company's growing automotive network.",
    x: 48,
    y: 34,
    mapsUrl: "https://www.google.com/maps/place/Al+Qirawan,+Riyadh/data=!4m2!3m1!1s0x3e2ee685a4de00d3:0x25b4a0b2a3b56908!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjI0LjQYACDXggMqiwEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc2MSwxMDA3OTY1MzUsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwNzkyNTcyQgJTQQ%3D%3D&skid=ad5a3609-41c6-4b6d-9136-490f91e4e7b3&g_st=aw",
  },
  {
    id: 3,
    name: "Luxury Holding - Al Qadisiyah",
    city: "Riyadh",
    area: "Al Qadisiyah",
    description: "Showroom location designed to serve customers in eastern Riyadh.",
    x: 74,
    y: 50,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Al+Qadisiyah+Riyadh",
  },
];

const routeStops = [0.08, 0.48, 0.82];
const routePath = "M260 406 C 330 382 410 286 480 238 S 660 286 740 350";

export const LocationsMap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const pinRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const { content, isArabic } = useLocale();
  const page = content.locationsPage;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const map = mapRef.current;
      const path = pathRef.current;
      const glowPath = glowPathRef.current;
      const pins = pinRefs.current.filter(Boolean) as HTMLDivElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

      if (!section || !map || !path || !glowPath || !pins.length || !cards.length) return;

      const length = path.getTotalLength();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set([path, glowPath], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(pins, {
        autoAlpha: 0,
        scale: 0.4,
        y: 20,
        transformOrigin: "50% 50%",
      });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 30,
        filter: "blur(8px)",
      });

      if (prefersReducedMotion) {
        gsap.set([path, glowPath], { strokeDashoffset: 0 });
        gsap.set(pins, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      const mm = gsap.matchMedia();

      const createTimeline = (scrub: number, pinMap: boolean, endValue: string) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: endValue,
            scrub,
            pin: pinMap ? map : false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to([path, glowPath], { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);

        routeStops.forEach((position, index) => {
          timeline.to(
            pins[index],
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.14,
              ease: "power3.out",
            },
            position
          );

          timeline.to(
            cards[index],
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.18,
              ease: "power3.out",
            },
            position + 0.03
          );
        });
      };

      mm.add("(min-width: 1024px)", () => {
        createTimeline(1.2, true, "+=2200");
      });

      mm.add("(max-width: 1023px)", () => {
        createTimeline(0.6, false, "bottom bottom");
      });

      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [isArabic] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f171c] text-[#c6c3c2] md:min-h-[300vh]"
      aria-labelledby="locations-map-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,29,46,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_35%)]" />

      <div ref={mapRef} className="relative flex min-h-screen items-start py-14 md:items-center md:py-10">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12">
          <div className="relative mx-auto flex max-w-[1260px] flex-col gap-8 md:gap-10">
            <div className="max-w-2xl" dir={isArabic ? "rtl" : "ltr"}>
              <div className="font-mono-luxe text-[#e11d2e]">{page.routeLabel}</div>
              <h2 id="locations-map-title" className="mt-4 font-display text-4xl leading-[0.95] text-white md:text-6xl">
                {page.mapTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#a09a98] md:text-lg">
                {page.description}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[920px]">
              <div className="relative aspect-[10/8] overflow-hidden rounded-[28px] border border-white/10 bg-[#11161b] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
                <div className="absolute inset-[6%] rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
                <div className="absolute inset-[8%] rounded-[22px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_25%),radial-gradient(circle_at_70%_65%,rgba(225,29,46,0.10),transparent_30%)]" />

                <svg viewBox="0 0 1000 700" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <filter id="route-glow">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M125 130 C245 96 360 114 455 176 S655 300 842 236"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M118 498 C220 414 335 416 420 474 S628 582 820 522"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M180 210 C250 282 330 304 430 298 S615 242 720 286 S826 400 842 466"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1.5"
                  />

                  <path
                    ref={glowPathRef}
                    d={routePath}
                    fill="none"
                    stroke="#e11d2e"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.26"
                    filter="url(#route-glow)"
                  />
                  <path
                    ref={pathRef}
                    d={routePath}
                    fill="none"
                    stroke="#e11d2e"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {locations.map((location, index) => (
                  <div
                    key={location.id}
                    ref={(element) => {
                      pinRefs.current[index] = element;
                    }}
                    className="absolute z-20 will-change-transform"
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e11d2e]/20 blur-md" />
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-[#e11d2e] shadow-[0_0_24px_rgba(225,29,46,0.55)]">
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div>
                    <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-white/8 px-3 py-1 font-mono-luxe text-[10px] text-[#c6c3c2] backdrop-blur-xl">
                      {location.area}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {locations.map((location, index) => (
                <article
                  key={location.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-5 text-left shadow-[0_25px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:min-h-[280px]"
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div className="font-mono-luxe text-[#e11d2e]">0{location.id}</div>
                  <h3 className="mt-4 text-2xl font-display leading-tight text-white">{location.name}</h3>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#a09a98]">
                    <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1">
                      {page.areaLabel}: {location.area}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1">
                      {page.cityLabel}: {location.city}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[#c6c3c2]">{location.description}</p>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#e11d2e]/35 px-4 py-2 font-mono-luxe text-[11px] text-white transition-colors hover:border-[#e11d2e] hover:bg-[#e11d2e]/10"
                  >
                    {page.openMapsLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
