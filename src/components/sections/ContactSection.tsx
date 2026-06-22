import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/RTL/LocaleProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ContactSection = () => {
  const root = useRef<HTMLElement>(null);
  const { content } = useLocale();

  useGSAP(() => {
    gsap.fromTo(".cf-field", { y: 30, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: ".cf-form", start: "top 80%" },
    });
    gsap.to(".cf-bg", {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return (
    <section ref={root} id="contact" className="relative overflow-hidden bg-luxe-bg py-32 md:py-48">
      <div className="cf-bg absolute inset-0 opacity-30 will-change-transform">
        <img src={images.showroom} alt={content.contact.companyImageAlt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxe-bg via-luxe-bg/85 to-luxe-bg" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <span className="font-mono-luxe text-luxe-accent">{content.contact.sectionLabel}</span>
          <SplitTextReveal as="h2" className="mt-6 font-display text-luxe-fg text-[12vw] md:text-[5.5vw] leading-[0.95]">
            {content.contact.title}
          </SplitTextReveal>
          <p className="mt-8 max-w-md text-luxe-silver/80 leading-relaxed">
            {content.contact.description}
          </p>
        </div>

        <form
          className="cf-form md:col-span-7 space-y-6 md:pt-12"
          action="https://formspree.io/f/xeebqgkj"
          method="POST"
        >
          {[
            { label: content.contact.fields.nameLabel, type: "text", placeholder: content.contact.fields.namePlaceholder, name: "name" },
            { label: content.contact.fields.phoneLabel, type: "tel", placeholder: content.contact.fields.phonePlaceholder, name: "phone" },
          ].map((f) => (
            <div key={f.label} className="cf-field">
              <label className="font-mono-luxe text-luxe-silver/60">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                className="mt-2 w-full bg-transparent border-b border-luxe-fg/15 py-3 text-luxe-fg placeholder:text-luxe-silver/30 focus:outline-none focus:border-luxe-accent transition-colors"
              />
            </div>
          ))}
          <div className="cf-field">
            <label className="font-mono-luxe text-luxe-silver/60">{content.contact.fields.companyLabel}</label>
            <select name="company" className="mt-2 w-full bg-transparent border-b border-luxe-fg/15 py-3 text-luxe-fg focus:outline-none focus:border-luxe-accent">
              {content.contact.fields.companyOptions.map((c) => (
                <option key={c} className="bg-luxe-bg">{c}</option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label className="font-mono-luxe text-luxe-silver/60">{content.contact.fields.messageLabel}</label>
            <textarea
              rows={4}
              name="message"
              placeholder={content.contact.fields.messagePlaceholder}
              className="mt-2 w-full bg-transparent border-b border-luxe-fg/15 py-3 text-luxe-fg placeholder:text-luxe-silver/30 focus:outline-none focus:border-luxe-accent resize-none"
            />
          </div>
          <div className="cf-field pt-4">
            <MagneticButton type="submit" className="group inline-flex items-center gap-3 px-7 py-4 bg-luxe-fg text-luxe-bg font-mono-luxe">
              {content.contact.fields.submitLabel}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
};
