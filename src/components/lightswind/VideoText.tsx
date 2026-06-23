import { Children, type ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type VideoTextTag = "div" | "span" | "section" | "article" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type VideoTextProps = {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  as?: VideoTextTag;
};

export function VideoText({
  src,
  children,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");

  const content = useMemo(() => Children.toArray(children).join(""), [children]);

  useEffect(() => {
    const responsiveFontSize = typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    const newSvgMask = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <text x="50%" y="50%"
            font-size="${responsiveFontSize}"
            font-weight="${fontWeight}"
            text-anchor="${textAnchor}"
            dominant-baseline="${dominantBaseline}"
            font-family="${fontFamily}"
            fill="black">${content}</text>
    </svg>`;

    setSvgMask(newSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  const Component = as;

  if (!svgMask) {
    return (
      <Component className={cn("relative size-full", className)}>
        <span className="sr-only">{content}</span>
      </Component>
    );
  }

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <Component className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </Component>
  );
}
