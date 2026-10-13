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
  fontUrl?: string;
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
  fontUrl,
  as = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");

  const content = useMemo(() => Children.toArray(children).join(""), [children]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const responsiveFontSize = typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    const updateMask = (embeddedFont = "") => {
      if (cancelled) return;
      const newSvgMask = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      ${embeddedFont}
      <text x="50%" y="50%"
            font-size="${responsiveFontSize}"
            font-weight="${fontWeight}"
            text-anchor="${textAnchor}"
            dominant-baseline="${dominantBaseline}"
            font-family="${fontFamily}"
            fill="black">${content}</text>
    </svg>`;

      setSvgMask(newSvgMask);
    };

    updateMask();
    if (fontUrl) {
      // SVG image masks cannot inherit the page's @font-face; embed the local font.
      void fetch(fontUrl, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error("Font unavailable");
          return response.arrayBuffer();
        })
        .then((buffer) => {
          const encoded = btoa(Array.from(new Uint8Array(buffer), (byte) => String.fromCharCode(byte)).join(""));
          updateMask(`<style>@font-face { font-family: '${fontFamily.split(",")[0].trim()}'; src: url(data:font/otf;base64,${encoded}) format('opentype'); font-weight: ${fontWeight}; }</style>`);
        })
        .catch(() => { /* Retain the readable system-font mask if loading fails. */ });
    }
    return () => { cancelled = true; controller.abort(); };
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily, fontUrl]);

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
