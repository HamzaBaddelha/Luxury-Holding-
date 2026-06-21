import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

const links = [
  { label: "Group", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Companies", href: "#companies" },
  { label: "Showcase", href: "#showcase" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const nav = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(nav.current, { y: -40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay: 1.8, ease: "expo.out" });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={nav}
        className={`fixed top-0 left-0 right-0 z-[90] transition-colors duration-500 ${scrolled ? "bg-luxe-bg/85 backdrop-blur-md border-b border-luxe-fg/5" : "bg-transparent"}`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-2xl tracking-tight text-luxe-fg">
            L<span className="text-luxe-accent">H</span>
            <span className="ml-2 font-mono-luxe text-luxe-silver/60">Luxury Holding</span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="font-mono-luxe text-luxe-silver hover:text-luxe-fg transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono-luxe text-luxe-silver/70">EN / <span className="text-luxe-fg/40">AR</span></span>
            <MagneticButton className="hidden md:inline-flex items-center gap-3 px-5 py-3 border border-luxe-fg/15 text-luxe-fg font-mono-luxe hover:border-luxe-accent hover:text-luxe-accent transition-colors">
              Book Consultation
            </MagneticButton>
            <button className="lg:hidden text-luxe-fg p-2" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[95] bg-luxe-bg transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${open ? "[clip-path:circle(150%_at_100%_0)]" : "[clip-path:circle(0%_at_100%_0)]"}`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center">
            <span className="font-display text-2xl">L<span className="text-luxe-accent">H</span></span>
            <button onClick={() => setOpen(false)} className="text-luxe-fg p-2" aria-label="Close menu"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-5xl text-luxe-fg hover:text-luxe-accent transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="font-mono-luxe text-luxe-silver/60">Riyadh · Saudi Arabia</div>
        </div>
      </div>
    </>
  );
};
