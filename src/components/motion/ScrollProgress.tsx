import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(ref.current, { scaleX: self.progress });
      },
    });
    return () => { st.kill(); };
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[80] h-px w-full bg-luxe-fg/5">
      <div ref={ref} className="h-px w-full origin-left bg-luxe-accent" style={{ transform: "scaleX(0)" }} />
    </div>
  );
};
