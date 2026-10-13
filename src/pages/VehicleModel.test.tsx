import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { LocaleProvider, useLocale } from "@/RTL/LocaleProvider";
import { vehicleBrands } from "@/data/vehicleCollection";
import { collectionPath, findVehicle, modelPath } from "@/lib/vehicleNavigation";
import { LuxuryVehiclesCollectionSection } from "@/components/sections/LuxuryVehiclesCollectionSection";
import VehicleModelPage from "./VehicleModel";
import { en } from "@/RTL/en";
import { ar } from "@/RTL/ar";

// Keep route tests focused on model behavior; the shared header's GSAP animation is unrelated.
vi.mock("@/components/layout/Navbar", () => ({ Navbar: () => <header>Site header</header> }));

const mappings = [
  ["jaecoo", "j8", "jaecoo-j8", "/images/jaecooj8/j8.png", "Above the Ordinary."],
  ["jaecoo", "j7", "jaecoo-j7", "/images/jaecoo7/j7-black.png", "Black Luxury. Untamed Presence."],
  ["jaecoo", "j5", "jaecoo-j5", "/images/jaecooj5/J5-CINEMATIC.png", "Everyday Life, Beautifully Framed."],
  ["omoda", "c7", "omoda-c7", "/images/OMODAC7/1.png", "Own the Night."],
  ["omoda", "c5", "omoda-c5", "/images/OMODAC5/C5.png", "A Bold First Impression."],
  ["icaur", "v27", "icaur-v27", "/images/ICAURV27/BORN-TOPLAY-SAND.png", "BORN TO PLAY."],
  ["icaur", "o3", "icaur-o3", "/images/ICAURV03/desert-water.png", "Find Your Own Escape."],
  ["hongqi", "sh5", "hongqi-sh5", "/images/honqi-sh5/hs5.png", "An Arrival of Distinction."],
  ["hongqi", "sh6", "hongqi-sh6", "/images/HONGQI-HS6/H6.png", "Elegance Along the Horizon."],
  ["dongfeng", "007", "dongfeng-007", "/images/DONGFENG/007.png", "The City, After Hours."],
  ["dongfeng", "ax7-mach", "dongfeng-ax7-mach", "/images/DONGFENG-ax7/AX7-MACH.png", "A Presence to Match the Skyline."],
  ["dongfeng", "shine", "dongfeng-shine", "/images/dongfeng-shine/dongfeng-shine-2026.png", "Chase the Golden Hour."],
  ["dongfeng", "huge", "dongfeng-huge", "/images/DONGFENG/HUGE.png", "Defined by Light and Shadow."],
  ["dongfeng", "forthing-t5-evo", "dongfeng-forthing-t5-evo", "/images/DONGFENG/Forthing-T5-EVO-2026.png", "Your Moment by the Water."],
  ["dongfeng", "zna-z9", "dongfeng-zna-z9", "/images/DongFeng-Z9-2026/ZNA.png", "Golden Light. Rugged Character."],
  ["mhero", "h1", "mhero-h1", "/images/MHERO1/MHERO-H1.webp", "A Bold Presence in Motion."],
  ["mhero", "h2", "mhero-h2", "/images/MHERO1/MHERO-H2.webp", "A Striking Arrival After Dusk."],
];

const Controls = () => {
  const navigate = useNavigate();
  const { setLocale } = useLocale();
  return <><button onClick={() => navigate(-1)}>Back</button><button onClick={() => navigate(1)}>Forward</button><button onClick={() => setLocale("ar")}>Arabic</button></>;
};
const renderRoute = (url: string) => render(
  <MemoryRouter initialEntries={[url]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <LocaleProvider><Controls /><Routes>
      <Route path="/" element={<LuxuryVehiclesCollectionSection />} />
      <Route path="/models/:brandSlug/:modelSlug" element={<VehicleModelPage />} />
    </Routes></LocaleProvider>
  </MemoryRouter>
);
beforeEach(() => { window.localStorage.clear(); vi.spyOn(window, "scrollTo").mockImplementation(() => {}); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("model-page routes", () => {
  it.each(mappings)("resolves /models/%s/%s to the original ID and image in both languages", (brandId, slug, id, image, headline) => {
    const vehicle = findVehicle(brandId, slug)!;
    expect(vehicle.model.id).toBe(id);
    expect(vehicle.model.image).toBe(image);
    expect(vehicle.model.headline.en).toBe(headline);
    for (const locale of ["en", "ar"] as const) {
      window.localStorage.setItem("luxury-holding-locale", locale);
      const view = renderRoute(`/models/${brandId}/${slug}`);
      const copy = locale === "en" ? en : ar;
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(vehicle.model.pageHero?.title[locale] ?? vehicle.model.name[locale]);
      if (id === "jaecoo-j8") {
        for (const paragraph of vehicle.model.pageHero!.paragraphs) {
          expect(screen.getByRole("main")).toHaveTextContent(paragraph[locale]);
        }
        const story = vehicle.model.featureStory!;
        expect(screen.getByRole("heading", { level: 2, name: story.title[locale] })).toBeInTheDocument();
        expect(screen.getByRole("main")).toHaveTextContent(story.description[locale]);
        expect(screen.getByRole("img", { name: story.imageAlt[locale] })).toHaveAttribute("src", "/images/jaecooj8/j8-see.png");
        const banner = vehicle.model.lifestyleBanner!;
        const bannerSection = screen.getByRole("region", {
          name: (name) => name.replace(/\s+,/g, ",") === banner.title[locale],
        });
        expect(bannerSection).toHaveTextContent(banner.description[locale]);
        expect(bannerSection.querySelector("img")).toHaveAttribute("src", "/images/jaecooj8/section6-product-jaecoo-j8-pic1.webp");
        const factory = vehicle.model.factorySection!;
        const factoryFigure = screen.getByRole("figure", {
          name: locale === "en" ? /^Engineered from the inside out/ : /^هندسة متقنة من الداخل إلى الخارج/,
        });
        expect(factoryFigure).toHaveTextContent(factory.description[locale]);
        expect(factoryFigure.querySelector("img")).toHaveAttribute("src", "/images/jaecoo7/FACTORY.png");
        const lineup = vehicle.model.lineupSection!;
        const lineupFigure = screen.getByRole("figure", {
          name: locale === "en" ? /^One brand/ : /^علامة واحدة/,
        });
        expect(lineupFigure).toHaveTextContent(lineup.description[locale]);
        expect(lineupFigure.querySelector("img")).toHaveAttribute("src", "/images/jaecooj8/ALL-JAECOO.png");
        expect(screen.getByRole("main")).not.toHaveTextContent(vehicle.model.description[locale]);
        expect(screen.queryByRole("img", { name: vehicle.model.imageAlt[locale] })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: copy.vehicleCollection.modelEnquiry })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(vehicle.model.headline[locale]);
        expect(screen.getByRole("main")).toHaveTextContent(vehicle.model.description[locale]);
        expect(screen.getByRole("main")).toHaveTextContent(vehicle.model.shortDescription[locale]);
        expect(screen.getByRole("img", { name: vehicle.model.imageAlt[locale] })).toHaveAttribute("src", image);
        expect(screen.getByRole("link", { name: copy.vehicleCollection.modelEnquiry })).toHaveAttribute("href", "/#contact");
      }
      expect(screen.getByRole("link", { name: copy.vehicleCollection.backToCollection })).toHaveAttribute("href", collectionPath(vehicle.brand, vehicle.model));
      expect(document.title).toBe(`${vehicle.model.name[locale]} | ${copy.vehicleCollection.pageTitleSuffix}`);
      expect(screen.getByRole("main")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      expect(screen.getByText("Site header")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
      view.unmount();
    }
  });

  it("keeps all 17 URLs unique and rejects models belonging to another brand", () => {
    const paths = vehicleBrands.flatMap((brand) => brand.models.map((model) => modelPath(brand, model)));
    expect(paths).toHaveLength(17);
    expect(new Set(paths).size).toBe(17);
    expect(findVehicle("jaecoo", "c7")).toBeUndefined();
  });

  it("shows the existing not-found page for an unknown model", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    renderRoute("/models/hongqi/unknown");
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(en.notFound.title)).toBeInTheDocument();
    expect(log).toHaveBeenCalledWith(expect.stringContaining("404 Error"), "/models/hongqi/unknown");
  });

  it("restores selection through model links, language switching, browser history and the collection return link", () => {
    renderRoute("/?brand=dongfeng&model=dongfeng-shine#vehicle-collection");
    fireEvent.click(screen.getByRole("link", { name: "Explore DONGFENG" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DONGFENG SHINE");
    fireEvent.click(screen.getByRole("button", { name: "Arabic" }));
    expect(document.title).toContain(ar.vehicleCollection.pageTitleSuffix);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("button", { name: "DONGFENG SHINE" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("tab", { name: "DONGFENG" })).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("button", { name: "Forward" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DONGFENG SHINE");
    fireEvent.click(screen.getByRole("link", { name: ar.vehicleCollection.backToCollection }));
    expect(screen.getByRole("button", { name: "DONGFENG SHINE" })).toHaveAttribute("aria-pressed", "true");
    expect(within(screen.getByRole("tabpanel")).getByRole("heading", { level: 3 })).toHaveTextContent("انطلق نحو وهج الغروب.");
  });
});
