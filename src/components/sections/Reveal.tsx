"use client";

import { useEffect, useRef } from "react";

/**
 * Adds data-in once the element scrolls into view; CSS ([data-reveal]) does
 * the animation. Content stays visible without JS (see sections.css).
 */
export default function Reveal({
  as: Tag = "div",
  className,
  children,
  threshold = 0.15,
  ...rest
}: {
  as?: "div" | "section" | "header" | "p" | "ul" | "ol" | "article" | "footer";
  className?: string;
  children: React.ReactNode;
  threshold?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "";
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  // All allowed tags are plain HTMLElements; type it as a div for the ref.
  const T = Tag as "div";
  return (
    <T ref={ref as React.Ref<HTMLDivElement>} className={className} data-reveal="" {...rest}>
      {children}
    </T>
  );
}

export function SectionHeader({ index, title, lede }: { index: string; title: string; lede?: string }) {
  return (
    <Reveal as="header" className="sec-head">
      <div className="sec-head__row">
        <span className="sec-head__idx">{index}</span>
        <h2 className="sec-head__title">{title}</h2>
        <span className="sec-head__rule" aria-hidden />
      </div>
      {lede && <p className="sec-head__lede">{lede}</p>}
    </Reveal>
  );
}
