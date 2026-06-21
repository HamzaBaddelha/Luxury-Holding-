import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dEl = dot.current!;
    const rEl = ring.current!;
    const dx = gsap.quickTo(dEl, "x", { duration: 0.15, ease: "power3" });
    const dy = gsap.quickTo(dEl, "y", { duration: 0.15, ease: "power3" });
    const rx = gsap.quickTo(rEl, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(rEl, "y", { duration: 0.5, ease: "power3" });

    const move = (e: MouseEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a,button,[data-cursor='hover']");
      if (t) gsap.to(rEl, { scale: 2.2, borderColor: "rgba(155,111,76,0.8)", duration: 0.3 });
      else gsap.to(rEl, { scale: 1, borderColor: "rgba(247,247,244,0.4)", duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-luxe-fg hidden md:block" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-luxe-fg/40 hidden md:block" />
    </>
  );
};
