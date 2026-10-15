"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** ✏️ gaya masuk: fade=naik+fade, pop=slide+skala, left/right=geser samping, zoom=membesar, blur=fokus, wipe=usapan clip-path */
  variant?: "fade" | "pop" | "left" | "right" | "zoom" | "blur" | "wipe";
};

const VARIANT_CLASS: Record<NonNullable<Props["variant"]>, string> = {
  fade: "reveal",
  pop: "reveal-pop",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  blur: "reveal-blur",
  wipe: "reveal-wipe",
};

export default function Reveal({ children, className = "", delay = 0, variant = "fade" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // NOTE (wipe): the wipe starts fully clipped (inset 100%), which reports zero
  // visible area — an IntersectionObserver on the clipped node itself would
  // never fire. So the observer watches an unclipped wrapper and only the
  // inner node carries the clip animation.
  if (variant === "wipe") {
    return (
      <div ref={ref} className={className}>
        <div
          className={`reveal-wipe ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${VARIANT_CLASS[variant]} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
