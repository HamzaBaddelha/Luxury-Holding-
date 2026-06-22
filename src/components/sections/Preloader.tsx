import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Preloader = ({ onDone }: { onDone?: () => void }) => {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => { setShow(false); onDone?.(); }, 100);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    }, 0)
      .to(barRef.current, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
      .to(monoRef.current, { scale: 1.06, duration: 1.6, ease: "power2.inOut" }, 0)
      .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.05");

    return () => { tl.kill(); };
  }, [onDone]);

  if (!show) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[200] bg-luxe-bg flex flex-col items-center justify-center">
      <div ref={monoRef}>
        <img
          src="/images/Holding-logo.png"
          alt="Holding logo"
          className="w-40 md:w-56 h-auto"
        />
      </div>
      <div className="mt-12 w-48 h-px bg-luxe-fg/10 overflow-hidden">
        <div ref={barRef} className="h-px bg-luxe-accent origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      <div className="mt-6 font-mono-luxe text-luxe-silver/70">
        <span ref={countRef}>000</span>
      </div>
    </div>
  );
};
