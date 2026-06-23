import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "@/RTL/LocaleProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Navbar = () => {
  const nav = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, content } = useLocale();
  const links = content.nav.links;

  const handleNavigation = (href: string) => {
    setOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(`/${href}`);
      }
      return;
    }

    navigate(href);
  };

  const scrollToContact = () => {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/#contact");
  };

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
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img
              src="/images/3d-logo.png"
              alt={content.nav.brandName}
              className="h-20 md:h-24 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href.startsWith("#") && location.pathname !== "/" ? `/${l.href}` : l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(l.href);
                }}
                className="font-mono-luxe text-luxe-silver hover:text-luxe-fg transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:inline-flex items-center gap-2 font-mono-luxe text-sm">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`transition-colors ${locale === "en" ? "text-luxe-fg" : "text-luxe-silver/50"}`}
              >
                {content.nav.languageLabels.en}
              </button>
              <span className="text-luxe-silver/40">/</span>
              <button
                type="button"
                onClick={() => setLocale("ar")}
                className={`transition-colors ${locale === "ar" ? "text-luxe-fg" : "text-luxe-silver/50"}`}
              >
                {content.nav.languageLabels.ar}
              </button>
            </div>
            <MagneticButton
              type="button"
              onClick={scrollToContact}
              className="hidden md:inline-flex items-center gap-3 px-5 py-3 border border-luxe-fg/15 text-luxe-fg font-mono-luxe hover:border-luxe-accent hover:text-luxe-accent transition-colors"
            >
              {content.nav.consultationCta}
            </MagneticButton>
            <button className="lg:hidden text-luxe-fg p-2" onClick={() => setOpen(true)} aria-label={content.nav.openMenuLabel}>
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
            <button onClick={() => setOpen(false)} className="text-luxe-fg p-2" aria-label={content.nav.closeMenuLabel}><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href.startsWith("#") && location.pathname !== "/" ? `/${l.href}` : l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(l.href);
                }}
                className="font-display text-5xl text-luxe-fg hover:text-luxe-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mb-6 inline-flex items-center gap-2 font-mono-luxe text-sm">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`transition-colors ${locale === "en" ? "text-luxe-fg" : "text-luxe-silver/50"}`}
            >
              {content.nav.languageLabels.en}
            </button>
            <span className="text-luxe-silver/40">/</span>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`transition-colors ${locale === "ar" ? "text-luxe-fg" : "text-luxe-silver/50"}`}
            >
              {content.nav.languageLabels.ar}
            </button>
          </div>
          <div className="font-mono-luxe text-luxe-silver/60">{content.nav.mobileLocation}</div>
        </div>
      </div>
    </>
  );
};
