import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/RTL/LocaleProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { VehicleCollectionAsset } from "@/components/sections/VehicleCollectionAsset";
import { LocalizedVehicleText } from "@/components/vehicles/LocalizedVehicleText";
import { collectionPath, findVehicle } from "@/lib/vehicleNavigation";
import NotFound from "./NotFound";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VehicleModelPage = () => {
  const page = useRef<HTMLElement>(null);
  const featureSection = useRef<HTMLElement>(null);
  const { brandSlug, modelSlug } = useParams();
  const { locale, content, isArabic } = useLocale();
  const copy = content.vehicleCollection;
  const vehicle = findVehicle(brandSlug, modelSlug);
  const name = vehicle?.model.name[locale];

  useGSAP(() => {
    if (!page.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      featureSection.current?.querySelectorAll<HTMLElement>("[data-feature-reveal]").forEach((element) => {
        gsap.fromTo(element, { x: () => Math.min(64, window.innerWidth * 0.08), opacity: 0 }, {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            end: "top 65%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      if (vehicle?.model.id === "jaecoo-j8") {
        page.current?.querySelectorAll<HTMLElement>("[data-text-reveal]").forEach((element) => {
          gsap.fromTo(element, { y: 32, opacity: 0 }, {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              // Allow negative positions so text already above the reveal range
              // is fully visible at scroll zero instead of collapsing both bounds to zero.
              start: "top 92%",
              end: "top 65%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    });
    return () => media.revert();
  }, { scope: page, dependencies: [vehicle?.model.id, locale], revertOnUpdate: true });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${name ?? content.notFound.title} | ${copy.pageTitleSuffix}`;
    return () => { document.title = previousTitle; };
  }, [name, content.notFound.title, copy.pageTitleSuffix]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("model-page-title")?.focus({ preventScroll: true });
  }, [brandSlug, modelSlug]);

  if (!vehicle) return <NotFound />;
  const { brand, model } = vehicle;
  const pageHero = model.pageHero;
  const featureStory = model.featureStory;
  const lifestyleBanner = model.lifestyleBanner;
  const factorySection = model.factorySection;
  const lineupSection = model.lineupSection;

  return (
    <>
      <Navbar />
      <main ref={page} className="min-h-screen bg-luxe-bg pb-20 pt-28 md:pb-32 md:pt-36" dir={isArabic ? "rtl" : "ltr"}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <Link to={collectionPath(brand, model)} className="inline-flex min-h-12 items-center gap-3 text-sm text-luxe-silver hover:text-luxe-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxe-accent focus-visible:outline-offset-4">
            <ArrowLeft aria-hidden="true" className={`h-4 w-4 ${isArabic ? "-scale-x-100" : ""}`} />
            {copy.backToCollection}
          </Link>
          <header className={pageHero ? "mx-auto flex min-h-[65svh] max-w-4xl flex-col items-center justify-center py-12 text-center md:py-20" : "my-8 md:my-12"}>
            <span className="font-mono-luxe text-luxe-accent" dir="ltr">{brand.name}</span>
            <h1 id="model-page-title" tabIndex={-1} className="mt-4 break-words font-display text-4xl leading-tight text-luxe-fg outline-none sm:text-5xl lg:text-7xl"><bdi>{pageHero ? pageHero.title[locale] : model.name[locale]}</bdi></h1>
            {pageHero && <div className="mt-8 space-y-6 text-base leading-relaxed text-luxe-silver/85 md:text-lg">
              {pageHero.paragraphs.map((paragraph, index) => <p data-text-reveal key={index}><LocalizedVehicleText>{paragraph[locale]}</LocalizedVehicleText></p>)}
            </div>}
          </header>
          {featureStory && <section ref={featureSection} aria-labelledby="model-feature-title" dir="ltr"
            className="mt-8 grid items-center gap-8 overflow-hidden border-t border-luxe-fg/10 pt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:pt-16">
            <figure data-feature-reveal className="relative aspect-[1376/768] min-w-0 overflow-hidden border border-luxe-fg/10 bg-luxe-fg/[0.025]">
              <VehicleCollectionAsset src={featureStory.image} alt={featureStory.imageAlt[locale]}
                className="absolute inset-0 h-full w-full object-contain"
                fallback={<div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-luxe-silver" dir={isArabic ? "rtl" : "ltr"}>{copy.imageComingSoon}</div>} />
            </figure>
            <div data-feature-reveal className="min-w-0 text-start" dir={isArabic ? "rtl" : "ltr"}>
              <h2 id="model-feature-title" className="font-display text-3xl leading-tight text-luxe-fg md:text-4xl"><LocalizedVehicleText>{featureStory.title[locale]}</LocalizedVehicleText></h2>
              <p className="mt-6 text-base leading-relaxed text-luxe-silver/80"><LocalizedVehicleText>{featureStory.description[locale]}</LocalizedVehicleText></p>
            </div>
          </section>}
          {!pageHero && <article className="grid items-start gap-8 lg:grid-cols-[1.65fr_1fr] lg:gap-12" aria-labelledby="model-story-title">
            <figure className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden border border-luxe-fg/10 bg-luxe-fg/[0.025]">
                <VehicleCollectionAsset key={model.id} src={model.image} alt={model.imageAlt[locale]}
                  className="absolute inset-0 h-full w-full object-contain p-4 md:p-8"
                  fallback={<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"><bdi className="text-2xl text-luxe-fg">{model.name[locale]}</bdi><span className="text-sm text-luxe-silver">{copy.imageComingSoon}</span></div>} />
              </div>
              <figcaption className="mt-5 text-sm leading-relaxed text-luxe-silver"><LocalizedVehicleText>{model.shortDescription[locale]}</LocalizedVehicleText></figcaption>
            </figure>
            <div className="min-w-0 py-2">
              <h2 id="model-story-title" className="break-words font-display text-3xl leading-tight text-luxe-fg md:text-4xl"><LocalizedVehicleText>{model.headline[locale]}</LocalizedVehicleText></h2>
              <p className="mt-6 text-base leading-relaxed text-luxe-silver/80"><LocalizedVehicleText>{model.description[locale]}</LocalizedVehicleText></p>
              <Button asChild variant="outline" className="mt-8 h-auto min-h-12 w-full justify-between whitespace-normal rounded-none border-luxe-accent/60 bg-transparent px-5 py-4 text-start hover:bg-luxe-accent/15 motion-reduce:transition-none">
                <Link to="/#contact">{copy.modelEnquiry}<ArrowUpRight aria-hidden="true" className={isArabic ? "-scale-x-100" : ""} /></Link>
              </Button>
            </div>
          </article>}
        </div>
        {lifestyleBanner && <section aria-labelledby="model-lifestyle-title"
          className="relative mt-16 flex min-h-[380px] w-full items-center justify-center overflow-hidden bg-luxe-bg px-6 py-20 text-center md:mt-24 md:min-h-[520px] md:px-12 lg:min-h-[620px]">
          <div aria-hidden="true" className="absolute inset-0">
            <VehicleCollectionAsset src={lifestyleBanner.image} alt=""
              className="h-full w-full object-cover object-center" fallback={null} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative mx-auto max-w-4xl">
            <h2 data-text-reveal id="model-lifestyle-title" className="font-display text-4xl leading-tight text-luxe-fg md:text-5xl lg:text-6xl"><LocalizedVehicleText>{lifestyleBanner.title[locale]}</LocalizedVehicleText></h2>
            <p data-text-reveal className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-luxe-fg/90"><LocalizedVehicleText>{lifestyleBanner.description[locale]}</LocalizedVehicleText></p>
          </div>
        </section>}
        {factorySection && <figure aria-labelledby="model-factory-description"
          className="relative mt-16 flex min-h-[380px] w-full items-center justify-center overflow-hidden bg-luxe-bg px-6 py-20 text-center md:mt-24 md:min-h-[520px] md:px-12 lg:min-h-[620px]">
          <div aria-hidden="true" className="absolute inset-0">
            <VehicleCollectionAsset src={factorySection.image} alt=""
              className="h-full w-full object-cover object-center" fallback={null} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <figcaption data-text-reveal id="model-factory-description" className="relative mx-auto max-w-4xl text-xl leading-relaxed text-luxe-fg md:text-3xl md:leading-relaxed">
            <LocalizedVehicleText>{factorySection.description[locale]}</LocalizedVehicleText>
          </figcaption>
        </figure>}
        {lineupSection && <figure aria-labelledby="model-lineup-description"
          className="relative mt-16 flex min-h-[380px] w-full items-center justify-center overflow-hidden bg-luxe-bg px-6 py-20 text-center md:mt-24 md:min-h-[520px] md:px-12 lg:min-h-[620px]">
          <div aria-hidden="true" className="absolute inset-0">
            <VehicleCollectionAsset src={lineupSection.image} alt=""
              className="h-full w-full object-cover object-center" fallback={null} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <figcaption data-text-reveal id="model-lineup-description" className="relative mx-auto max-w-4xl text-xl leading-relaxed text-luxe-fg md:text-3xl md:leading-relaxed">
            <LocalizedVehicleText>{lineupSection.description[locale]}</LocalizedVehicleText>
          </figcaption>
        </figure>}
      </main>
      <Footer />
    </>
  );
};

export default VehicleModelPage;
