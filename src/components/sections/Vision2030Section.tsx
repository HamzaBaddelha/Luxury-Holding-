import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { VideoText } from "@/components/lightswind/VideoText";
import { images } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Vision2030Section = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  const visionVideo =
    "/images/From Klickpin.com- Try Elegant crochet project inspiration that help you create a beautiful result without overspending for your next Pinterest sa.mp4";

  const titleText = content.vision.title || "Vision 2030.";

  useGSAP(
    () => {
      gsap.from(".v2030-title", {
        y: 70,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".v2030-logo", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          once: true,
        },
      });

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
          .from(
            ".v2030-stat",
            {
              yPercent: 60,
              autoAlpha: 0,
              stagger: 0.15,
              ease: "power2.out",
            },
            0.2
          )
          .to(".v2030-copy", { autoAlpha: 0.45, ease: "none" }, 0.6);
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="vision"
      className="relative bg-luxe-bg md:h-[250vh]"
    >
      <div className="v2030-sticky relative min-h-screen w-full overflow-hidden noise-overlay md:h-screen">
        <div className="v2030-bg absolute inset-0 will-change-transform">
          <img
            src={images.skyline}
            alt={content.vision.skylineAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-luxe-bg/75 via-luxe-bg/40 to-luxe-bg" />
          <div className="absolute inset-0 bg-luxe-bg/25" />
        </div>

        <div className="v2030-big pointer-events-none absolute -bottom-[10vw] left-0 right-0 select-none text-center">
          <VideoText
            src={visionVideo}
            className="mx-auto h-[28vw] w-full max-w-[92vw] opacity-20 md:h-[20vw]"
            fontSize="30vw"
            fontWeight={400}
            fontFamily="Cormorant Garamond, serif"
          >
            {content.vision.backgroundLabel}
          </VideoText>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-12 md:py-0">
          <span className="font-mono-luxe text-xs uppercase tracking-[0.35em] text-luxe-accent md:text-sm">
            {content.vision.sectionLabel}
          </span>

          <div className="mt-8 flex w-full flex-col items-start">
            <VideoText
              src={visionVideo}
              as="h2"
              className="v2030-title inline-block h-[22vw] w-[96vw] md:h-[10vw] md:w-[72vw] lg:h-[9vw] lg:w-[64vw] xl:h-[8vw] xl:w-[58vw]"
              fontSize="9vw"
              fontWeight={500}
              fontFamily="Cormorant Garamond, serif"
            >
              {titleText}
            </VideoText>

            <img
              src={images.visionLogo}
              alt="Vision 2030 logo"
              className="v2030-logo mt-5 h-20 w-auto object-contain opacity-90 md:mt-6 md:h-28 lg:h-32 xl:h-36"
              loading="lazy"
            />
          </div>

          <p className="v2030-copy mt-8 max-w-2xl text-base leading-relaxed text-luxe-silver/80 md:text-lg">
            {content.vision.description}
          </p>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 md:mt-16 md:grid-cols-4">
            {content.vision.stats.map((s) => (
              <div key={s.label} className="v2030-stat">
                <div className="font-display text-4xl text-luxe-accent md:text-5xl">
                  {s.value}
                </div>

                <div className="mt-2 font-mono-luxe text-sm text-luxe-silver/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
