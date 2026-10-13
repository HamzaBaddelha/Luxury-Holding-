import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { useLocale } from "@/RTL/LocaleProvider";
import { vehicleBrands, type VehicleBrand, type VehicleModel } from "@/data/vehicleCollection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleCollectionAsset } from "./VehicleCollectionAsset";
import { explorePath } from "@/lib/vehicleNavigation";
import { LocalizedVehicleText } from "@/components/vehicles/LocalizedVehicleText";
import "./LuxuryVehiclesCollectionSection.css";

const VehicleVisual = ({ brand, model, thumbnail = false }: {
  brand: VehicleBrand; model: VehicleModel; thumbnail?: boolean;
}) => {
  const { locale, content } = useLocale();
  return (
    <div className={`collection-visual ${thumbnail ? "collection-thumbnail" : "collection-featured"}`}>
      <VehicleCollectionAsset
        key={model.id}
        src={model.image}
        alt={thumbnail ? "" : model.imageAlt[locale]}
        className="absolute inset-0 h-full w-full object-contain p-4 md:p-8"
        fallback={
          <div className="collection-placeholder">
            <span className="collection-wordmark" dir="ltr">{brand.name}</span>
            <span className="collection-placeholder-model"><bdi>{model.name[locale]}</bdi></span>
            <span className="collection-coming-soon">{content.vehicleCollection.imageComingSoon}</span>
          </div>
        }
      />
    </div>
  );
};

export const LuxuryVehiclesCollectionSection = () => {
  const { locale, content, isArabic } = useLocale();
  const copy = content.vehicleCollection;
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const selectedBrand = vehicleBrands.find((item) => item.id === params.get("brand")) ?? vehicleBrands[0];
  const selectedModel = selectedBrand.models.find((item) => item.id === params.get("model")) ?? selectedBrand.models[0];
  const brandId = selectedBrand.id;
  const modelId = selectedModel.id;

  const selectModel = (brand: VehicleBrand, model: VehicleModel) => {
    const search = new URLSearchParams(location.search);
    search.set("brand", brand.id);
    search.set("model", model.id);
    navigate({ pathname: location.pathname, search: search.toString(), hash: location.hash }, { replace: true, preventScrollReset: true });
  };

  const selectBrand = (id: string) => {
    const brand = vehicleBrands.find((item) => item.id === id);
    if (!brand) return;
    selectModel(brand, brand.models[0]);
  };

  return (
    <section id="vehicle-collection" aria-labelledby="vehicle-collection-title" dir={isArabic ? "rtl" : "ltr"}
      className="vehicle-collection relative z-20 bg-luxe-bg py-24 md:py-36 scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <span className="font-mono-luxe text-luxe-accent"><bdi dir="ltr">[ 06 ]</bdi> {copy.eyebrow}</span>
            <h2 id="vehicle-collection-title" className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] text-luxe-fg md:text-7xl">{copy.title}</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-luxe-silver/80">{copy.introduction}</p>
        </div>

        <Tabs value={brandId} onValueChange={selectBrand} dir={isArabic ? "rtl" : "ltr"} className="mt-12 md:mt-16">
          <TabsList aria-label={copy.chooseBrand} className="collection-brands grid h-auto w-full grid-cols-3 lg:grid-cols-6 rounded-none border-y border-luxe-fg/15 bg-transparent p-0">
            {vehicleBrands.map((brand) => (
              <TabsTrigger key={brand.id} value={brand.id} className="collection-brand relative min-w-0 rounded-none px-1 py-5 md:py-7">
                <span className="flex h-8 w-full items-center justify-center md:h-10">
                  <VehicleCollectionAsset src={brand.logo} alt={brand.name} className="h-full w-full max-w-32 object-contain px-2"
                    fallback={<span className="collection-brand-name" dir="ltr">{brand.name}</span>} />
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {vehicleBrands.map((brand) => {
            const model = brand.models.find((item) => item.id === modelId) ?? brand.models[0];
            return (
              <TabsContent key={brand.id} value={brand.id} className="mt-6 md:mt-8">
                <div className="collection-presentation grid border border-luxe-fg/10 lg:grid-cols-[1.65fr_1fr]">
                  <VehicleVisual brand={brand} model={model} />
                  <div className="collection-story flex min-w-0 flex-col bg-luxe-fg/[0.025] p-6 md:p-9">
                    <span className="font-mono-luxe text-luxe-accent" dir="ltr">{brand.name}</span>
                    <h3 className="collection-headline mt-5 font-display text-3xl md:text-4xl leading-[1.15] text-luxe-fg"><LocalizedVehicleText>{model.headline[locale]}</LocalizedVehicleText></h3>
                    <p className="collection-description mt-5 text-sm leading-relaxed text-luxe-silver/80"><LocalizedVehicleText>{model.description[locale]}</LocalizedVehicleText></p>
                    <div className="mt-8 border-t border-luxe-fg/10 pt-6" aria-live="polite" aria-atomic="true">
                      {model.isMock && <span className="font-mono-luxe text-luxe-silver/70">{copy.demonstration}</span>}
                      <h4 className="mt-3 text-xl text-luxe-fg"><bdi>{model.name[locale]}</bdi></h4>
                      <p className="collection-model-description mt-3 text-sm leading-relaxed text-luxe-silver/80"><LocalizedVehicleText>{model.shortDescription[locale]}</LocalizedVehicleText></p>
                    </div>
                    <Button asChild variant="outline" className="mt-8 h-auto min-h-12 w-full justify-between whitespace-normal rounded-none border-luxe-accent/60 bg-transparent px-4 py-4 text-start text-luxe-fg hover:bg-luxe-accent/15 motion-reduce:transition-none">
                      <Link to={explorePath(brand, model)}><span><LocalizedVehicleText>{copy.exploreBrand.replace("{brand}", brand.name)}</LocalizedVehicleText></span><ArrowUpRight aria-hidden="true" className={isArabic ? "-scale-x-100" : ""} /></Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <h4 className="font-mono-luxe text-luxe-silver">{copy.chooseModel}</h4>
                  {brand.models.some((item) => item.isMock) && <span className="text-xs text-luxe-silver/70">{copy.demoNote}</span>}
                </div>
                <div role="group" aria-label={copy.chooseModel} className={`mt-4 grid grid-cols-2 gap-3 md:gap-5 ${brand.models.length > 2 ? "md:grid-cols-3 md:max-w-5xl" : "md:max-w-2xl"}`}>
                  {brand.models.map((item) => (
                    <button key={item.id} type="button" aria-pressed={model.id === item.id} aria-label={item.name[locale]}
                      onClick={() => selectModel(brand, item)} className="collection-model min-w-0 border border-luxe-fg/15 text-start">
                      <div aria-hidden="true"><VehicleVisual brand={brand} model={item} thumbnail /></div>
                      <span className="flex min-h-14 items-center justify-between gap-2 border-t border-luxe-fg/10 px-3 py-3 text-xs text-luxe-fg md:text-sm">
                        <bdi>{item.name[locale]}</bdi>
                        <Check aria-hidden="true" className={`h-4 w-4 shrink-0 text-luxe-accent ${model.id === item.id ? "opacity-100" : "opacity-0"}`} />
                      </span>
                    </button>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
