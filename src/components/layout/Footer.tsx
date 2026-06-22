import { useLocale } from "@/RTL/LocaleProvider";

export const Footer = () => {
  const { content } = useLocale();

  return (
    <footer className="relative bg-luxe-bg border-t border-luxe-fg/10 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 font-display text-luxe-fg/[0.04] text-[28vw] leading-none select-none pointer-events-none">
        LH
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <img
            src="/images/3d-logo.png"
            alt={content.nav.brandName}
            className="h-20 md:h-28 w-auto"
          />
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
