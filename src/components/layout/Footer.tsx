import { useLocale } from "@/RTL/LocaleProvider";
import { BrandLogo } from "./BrandLogo";

export const Footer = () => {
  const { content } = useLocale();

  return (
    <footer className="relative bg-luxe-bg border-t border-luxe-fg/10 overflow-hidden">
      <div aria-hidden="true" className="absolute -bottom-32 left-1/2 w-[60vw] -translate-x-1/2 opacity-[0.04] select-none pointer-events-none">
        <BrandLogo decorative className="h-auto w-full" />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <BrandLogo className="h-auto w-64 max-w-full object-contain" />
          <p className="mt-6 text-luxe-silver/70 text-sm leading-relaxed max-w-xs">
            {content.footer.description}
          </p>
        </div>
        {content.footer.columns.map((col) => (
          <div key={col.title}>
            <div className="font-mono-luxe text-luxe-silver/60 mb-5">{col.title}</div>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="text-luxe-fg/80 hover:text-luxe-accent transition-colors text-sm">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-luxe-fg/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between gap-4 font-mono-luxe text-luxe-silver/50">
          <span>{content.footer.copyright}</span>
          <span>{content.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
};
