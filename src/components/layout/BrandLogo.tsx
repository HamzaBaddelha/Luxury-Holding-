import { useLocale } from "@/RTL/LocaleProvider";

export const BrandLogo = ({ className, decorative = false }: { className?: string; decorative?: boolean }) => {
  const { content } = useLocale();

  return <img
    src="/images/Refined%20Arabic%20luxury%20logo%20update.png"
    alt={decorative ? "" : content.nav.brandName}
    className={className}
  />;
};
