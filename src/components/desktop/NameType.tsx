"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { unbounded } from "@/app/fonts";

// rubens.design background type: each glyph stretched to fill its cell, the
// hovered glyph widens (+30%) while its neighbours give up the space.
const LINES = [
  { text: "CELESTYN", weight: 0.28 },
  { text: "AURELIXIA", weight: 0.28 },
  { text: "COMPUTER", weight: 0.22 },
  { text: "SCIENCE", weight: 0.22 },
];
const HOVER_BOOST = 0.3;

type Box = { x: number; y: number; w: number; h: number };
// Rough cap-height boxes so SSR has something sane before measuring.
const FALLBACK: Box = { x: 0, y: -72, w: 80, h: 72 };

export default function NameType() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<Record<string, Box> | null>(null);
  const [hot, setHot] = useState<string | null>(null);

  // Measure the ink box of every glyph once the font is ready.
  useEffect(() => {
    let alive = true;
    const family = unbounded.style.fontFamily;
    const font = `900 100px ${family}`;
    document.fonts.load(font).then(() => {
      if (!alive) return;
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = font;
      const out: Record<string, Box> = {};
      new Set(LINES.map((l) => l.text).join("")).forEach((ch) => {
        const m = ctx.measureText(ch);
        out[ch] = {
          x: -m.actualBoundingBoxLeft,
          y: -m.actualBoundingBoxAscent,
          w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
          h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
        };
      });
      setBoxes(out);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Hit-test the pointer against glyph rects (windows sit on top, so we
  // can't rely on :hover).
  useEffect(() => {
    const host = rootRef.current?.parentElement;
    if (!host) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find((n) => n instanceof HTMLElement && n.dataset.glyph);
        setHot((el as HTMLElement | undefined)?.dataset.glyph ?? null);
      });
    };
    const onLeave = () => setHot(null);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lines = useMemo(
    () =>
      LINES.map((l, li) => ({
        ...l,
        glyphs: l.text.split("").map((ch, ci) => ({ ch, key: `${li}-${ci}` })),
      })),
    [],
  );

  return (
    <div className="nametype" ref={rootRef} aria-hidden data-ready={boxes ? "" : undefined}>
      {lines.map((line) => (
        <div key={line.text} className="nametype__line" style={{ flexGrow: line.weight }}>
          {line.glyphs.map(({ ch, key }) => {
            const b = boxes?.[ch] ?? FALLBACK;
            const grow = b.w * (hot === key ? 1 + HOVER_BOOST : 1);
            return (
              <span
                key={key}
                className="nametype__glyph"
                data-glyph={key}
                data-hot={hot === key || undefined}
                style={{ flexGrow: grow }}
              >
                <svg viewBox={`${b.x} ${b.y} ${b.w} ${b.h}`} preserveAspectRatio="none">
                  <text x="0" y="0" style={{ fontFamily: unbounded.style.fontFamily }} fontSize="100" fontWeight="900">
                    {ch}
                  </text>
                </svg>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
