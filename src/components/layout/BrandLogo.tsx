import { useLocale } from "@/RTL/LocaleProvider";

export const BrandLogo = ({ className, decorative = false }: { className?: string; decorative?: boolean }) => {
  const { content } = useLocale();

  return <img
    src="/images/luxury-vehicles-group-logo.png"
    alt={decorative ? "" : content.nav.brandName}
    className={className}
  />;
};
