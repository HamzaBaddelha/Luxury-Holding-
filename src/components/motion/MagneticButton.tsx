import { useRef, ButtonHTMLAttributes } from "react";
import gsap from "gsap";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export const MagneticButton = ({ children, strength = 0.35, className = "", ...rest }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const ensureTo = () => {
    if (!ref.current) return;
    if (!xTo.current) xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
    if (!yTo.current) yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });
  };

  return (
    <button
      ref={ref}
      {...rest}
      onMouseMove={(e) => {
        ensureTo();
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        xTo.current?.(x);
        yTo.current?.(y);
      }}
      onMouseLeave={() => {
        xTo.current?.(0);
        yTo.current?.(0);
      }}
      className={className}
    >
      {children}
    </button>
  );
};
