import { vehicleBrands, type VehicleBrand, type VehicleModel } from "@/data/vehicleCollection";

export const modelPath = (brand: VehicleBrand, model: VehicleModel) =>
  `/models/${brand.id}/${model.slug}`;

export const explorePath = (brand: VehicleBrand, model: VehicleModel) =>
  brand.id === "omoda" || (brand.id === "jaecoo" && ["j7", "j5"].includes(model.slug))
    ? "/models/jaecoo/j8"
    : modelPath(brand, model);

export const collectionPath = (brand: VehicleBrand, model: VehicleModel) =>
  `/?${new URLSearchParams({ brand: brand.id, model: model.id })}#vehicle-collection`;

export const findVehicle = (brandSlug?: string, modelSlug?: string) => {
  const brand = vehicleBrands.find((item) => item.id === brandSlug);
  const model = brand?.models.find((item) => item.slug === modelSlug);
  return brand && model ? { brand, model } : undefined;
};
