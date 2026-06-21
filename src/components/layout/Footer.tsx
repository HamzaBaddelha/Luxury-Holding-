export const Footer = () => {
  return (
    <footer className="relative bg-luxe-bg border-t border-luxe-fg/10 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 font-display text-luxe-fg/[0.04] text-[28vw] leading-none select-none pointer-events-none">
        LH
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="font-display text-4xl">L<span className="text-luxe-accent">H</span></div>
          <p className="mt-6 text-luxe-silver/70 text-sm leading-relaxed max-w-xs">
            A premium Saudi holding company building the future of automotive services.
          </p>
        </div>
        {[
          { title: "Companies", links: ["Luxury Vehicles", "V-LUX Accessories", "Baddelha", "Swap Car"] },
          { title: "Group", links: ["About", "Vision 2030", "Careers", "Press"] },
          { title: "Contact", links: ["Riyadh, Saudi Arabia", "hello@luxuryholding.sa", "+966 11 000 0000"] },
        ].map((col) => (
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
          <span>© 2026 Luxury Holding</span>
          <span>Aligned with Vision 2030</span>
        </div>
      </div>
    </footer>
  );
};
