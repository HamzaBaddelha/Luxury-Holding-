import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  splitBy?: "words" | "chars";
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}

export const SplitTextReveal = ({
  children,
  as: Tag = "h2",
  className = "",
  splitBy = "words",
  delay = 0,
  stagger = 0.06,
  trigger = true,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  const units = splitBy === "words" ? children.split(/(\s+)/) : children.split("");

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll(".rv");
      if (!targets.length) return;

      gsap.set(targets, { yPercent: 115, autoAlpha: 0 });

      const anim = () =>
        gsap.to(targets, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger,
          delay,
        });

      if (trigger) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 85%",
          once: true,
          onEnter: anim,
        });
      } else {
        anim();
      }
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <Tag ref={ref as any} className={className}>
      {units.map((u, i) =>
        /^\s+$/.test(u) ? (
          <span key={i}>{u}</span>
        ) : (
          <span key={i} className="reveal-mask align-baseline">
            <span className="rv inline-block">{u}</span>
          </span>
        )
      )}
    </Tag>
  );
};
