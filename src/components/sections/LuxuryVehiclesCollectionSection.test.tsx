import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { LocaleProvider, useLocale } from "@/RTL/LocaleProvider";
import { en } from "@/RTL/en";
import { ar } from "@/RTL/ar";
import { vehicleBrands } from "@/data/vehicleCollection";
import { LuxuryVehiclesCollectionSection } from "./LuxuryVehiclesCollectionSection";
import { VehicleCollectionAsset } from "./VehicleCollectionAsset";
import { MemoryRouter } from "react-router-dom";
import { modelPath } from "@/lib/vehicleNavigation";

const LanguageSwitch = () => {
  const { setLocale } = useLocale();
  return <button onClick={() => setLocale("ar")}>Arabic</button>;
};
const renderCollection = () => render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><LocaleProvider><LanguageSwitch /><LuxuryVehiclesCollectionSection /></LocaleProvider></MemoryRouter>);
const chooseBrand = (name: string) => fireEvent.mouseDown(screen.getByRole("tab", { name }), { button: 0, ctrlKey: false });

beforeEach(() => window.localStorage.clear());
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("vehicle collection", () => {
  it("offers every brand and its models, resets models on brand changes, and links to each model page", () => {
    const errors = vi.spyOn(console, "error");
    renderCollection();
    expect(screen.getAllByRole("tab")).toHaveLength(6);
    expect(screen.getByRole("tab", { name: "JAECOO" })).toHaveAttribute("aria-selected", "true");
    for (const brand of vehicleBrands) {
      chooseBrand(brand.name);
      const panel = screen.getByRole("tabpanel");
      expect(within(panel).getByRole("heading", { level: 3 })).toHaveTextContent(brand.models[0].headline.en);
      expect(within(panel).getByRole("button", { name: brand.models[0].name.en })).toHaveAttribute("aria-pressed", "true");
      for (const model of brand.models) {
        fireEvent.click(within(panel).getByRole("button", { name: model.name.en }));
        expect(within(panel).getByRole("heading", { name: model.name.en })).toBeInTheDocument();
        expect(within(panel).getByRole("heading", { level: 3 })).toHaveTextContent(model.headline.en);
        expect(panel).toHaveTextContent(model.description.en);
        expect(panel).toHaveTextContent(model.shortDescription.en);
        expect(within(panel).getByRole("img", { name: model.imageAlt.en })).toHaveAttribute("src", model.image);
        const destination = ["jaecoo-j8", "jaecoo-j7", "jaecoo-j5", "omoda-c7", "omoda-c5"].includes(model.id)
          ? "/models/jaecoo/j8"
          : modelPath(brand, model);
        expect(within(panel).getByRole("link", { name: `Explore ${brand.name}` })).toHaveAttribute("href", destination);
        expect(within(panel).getByRole("button", { name: model.name.en })).toHaveAttribute("aria-pressed", "true");
      }
    }
    chooseBrand("JAECOO");
    expect(screen.getByRole("button", { name: "JAECOO J8" })).toHaveAttribute("aria-pressed", "true");
    expect(errors).not.toHaveBeenCalled();
  });

  it("preserves the selected brand/model while translating labels and switching direction", () => {
    renderCollection();
    chooseBrand("HONGQI");
    fireEvent.click(screen.getByRole("button", { name: "HONGQI SH6" }));
    fireEvent.click(screen.getByRole("button", { name: "Arabic" }));
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    expect(screen.getByRole("heading", { name: "مجموعة العربات الفاخرة" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "HONGQI" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("button", { name: vehicleBrands[3].models[1].name.ar })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "اكتشف HONGQI" })).toHaveAttribute("href", "/models/hongqi/sh6");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(vehicleBrands[3].models[1].headline.ar);
    expect(screen.getByRole("tablist")).toHaveAccessibleName(ar.vehicleCollection.chooseBrand);
  });

  it("supports arrow and Home/End navigation, including reversed arrows in RTL", async () => {
    renderCollection();
    const first = screen.getByRole("tab", { name: "JAECOO" });
    act(() => first.focus());
    fireEvent.keyDown(first, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getByRole("tab", { name: "OMODA" })).toHaveFocus());
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    await waitFor(() => expect(screen.getByRole("tab", { name: "MHERO" })).toHaveFocus());
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    await waitFor(() => expect(first).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "Arabic" }));
    act(() => first.focus());
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    await waitFor(() => {
      expect(screen.getByRole("tab", { name: "OMODA" })).toHaveFocus();
      expect(screen.getByRole("tab", { name: "OMODA" })).toHaveAttribute("aria-selected", "true");
    });
  });

  it("replaces placeholders with supplied assets and restores fallbacks after image failures", () => {
    const brand = vehicleBrands[0];
    const originalImage = brand.models[0].image;
    const originalLogo = brand.logo;
    brand.logo = "/images/brands/test.svg";
    brand.models[0].image = "/images/cars/jaecoo/test.webp";
    try {
      renderCollection();
      const photo = screen.getByRole("img", { name: brand.models[0].imageAlt.en });
      expect(photo).toHaveAttribute("src", brand.models[0].image);
      expect(photo.parentElement).not.toHaveTextContent(en.vehicleCollection.imageComingSoon);
      fireEvent.error(photo);
      expect(screen.queryByRole("img", { name: brand.models[0].imageAlt.en })).not.toBeInTheDocument();
      fireEvent.error(screen.getByRole("img", { name: "JAECOO" }));
      expect(screen.getByRole("tab", { name: "JAECOO" })).toHaveTextContent("JAECOO");
      fireEvent.click(screen.getByRole("button", { name: "JAECOO J7" }));
      fireEvent.click(screen.getByRole("button", { name: "JAECOO J8" }));
      expect(screen.getByRole("img", { name: brand.models[0].imageAlt.en })).toBeInTheDocument();
    } finally {
      brand.logo = originalLogo;
      brand.models[0].image = originalImage;
    }
  });
});

it("does not request empty assets or retry a failed path on rerender, and resets on a new path", () => {
  const fallback = <span>Local placeholder</span>;
  const { rerender } = render(<VehicleCollectionAsset alt="Vehicle" fallback={fallback} />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  rerender(<VehicleCollectionAsset src=" " alt="Vehicle" fallback={fallback} />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  rerender(<VehicleCollectionAsset src="/first.webp" alt="Vehicle" fallback={fallback} />);
  fireEvent.error(screen.getByRole("img"));
  rerender(<VehicleCollectionAsset src="/first.webp" alt="Vehicle" fallback={fallback} />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  rerender(<VehicleCollectionAsset src="/second.webp" alt="Vehicle" fallback={fallback} />);
  expect(screen.getByRole("img")).toHaveAttribute("src", "/second.webp");
});
