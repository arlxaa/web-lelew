"use client";

import { useEffect, useRef, useState } from "react";

export type PetMood = "idle" | "sleep" | "happy" | "wave";

// Clawd: a 14×10 pixel critter in Claude terracotta. Body cells only; eyes,
// arms and legs are separate so CSS can animate them.
const BODY: [number, number, number, number][] = [
  [2, 0, 10, 4],
  [2, 4, 10, 4],
];
const ARMS: [number, number][] = [
  [0, 4],
  [12, 4],
];
const LEGS = [2, 4, 9, 11];

/**
 * Pixel pet. `cell` is the pixel size. Eyes follow the pointer by one pixel;
 * clicking it triggers a little hop with hearts (handled by the parent via onPet).
 */
export default function Pet({
  mood = "idle",
  cell = 4,
  onPet,
  label = "Clawd, the desk pet",
}: {
  mood?: PetMood;
  cell?: number;
  onPet?: () => void;
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [look, setLook] = useState(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      setLook(Math.abs(dx) < 40 ? 0 : dx > 0 ? 1 : -1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const w = 14 * cell;
  const h = 10 * cell;
  // Rendered as a span when it sits inside another control (e.g. the chat orb).
  const Tag = onPet ? "button" : "span";
  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
      type={onPet ? "button" : undefined}
      className="pet"
      data-mood={mood}
      onClick={onPet}
      aria-label={onPet ? label : undefined}
      aria-hidden={onPet ? undefined : true}
      style={{ width: w, height: h, ["--cell" as string]: `${cell}px` }}
    >
      <svg viewBox="0 0 14 10" width={w} height={h} shapeRendering="crispEdges" aria-hidden>
        <g className="pet__sprite">
          {BODY.map(([x, y, bw, bh], i) => (
            <rect key={i} x={x} y={y} width={bw} height={bh} fill="var(--pet-body)" />
          ))}
          <rect x={2} y={7} width={10} height={1} fill="var(--pet-shade)" />
          {ARMS.map(([x, y], i) => (
            <rect key={i} className={`pet__arm pet__arm--${i}`} x={x} y={y} width={2} height={2} fill="var(--pet-body)" />
          ))}
          {LEGS.map((x, i) => (
            <rect key={x} className={`pet__leg pet__leg--${i % 2}`} x={x} y={8} width={1} height={2} fill="var(--pet-shade)" />
          ))}
          <g className="pet__eyes" style={{ transform: `translateX(${look * 0.5}px)` }}>
            <rect className="pet__eye" x={4} y={2} width={1} height={2} fill="var(--pet-eye)" />
            <rect className="pet__eye" x={9} y={2} width={1} height={2} fill="var(--pet-eye)" />
          </g>
        </g>
      </svg>
      {mood === "sleep" && (
        <span className="pet__zz" aria-hidden>
          <i>z</i>
          <i>Z</i>
        </span>
      )}
      {mood === "happy" && (
        <span className="pet__hearts" aria-hidden>
          <i>♥</i>
          <i>♥</i>
          <i>♥</i>
        </span>
      )}
    </Tag>
  );
}
