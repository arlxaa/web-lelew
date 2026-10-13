"use client";

import { useId } from "react";

type Props = {
  /** ✏️ ukuran sisi kubus (px) */
  size?: number;
  /** ✏️ durasi satu putaran penuh (detik). Range enak: 20-30 */
  spinSeconds?: number;
  /** ✏️ durasi naik-turun melayang (detik) */
  floatSeconds?: number;
  /** ✏️ tampilkan kubus inti kecil di dalam (efek crystal) */
  core?: boolean;
  className?: string;
};

// ✏️ Shade tiap sisi (rentang #1f1f24 -> #3a3a40)
const FACES = [
  { name: "front", t: "rotateY(0deg)", a: "#34343a", b: "#2a2a30" },
  { name: "back", t: "rotateY(180deg)", a: "#1f1f24", b: "#25252a" },
  { name: "right", t: "rotateY(90deg)", a: "#3a3a40", b: "#2d2d33" },
  { name: "left", t: "rotateY(-90deg)", a: "#26262b", b: "#1f1f24" },
  { name: "top", t: "rotateX(90deg)", a: "#3a3a40", b: "#34343a" },
  { name: "bottom", t: "rotateX(-90deg)", a: "#1f1f24", b: "#222227" },
] as const;

export default function CrystalCube({
  size = 140,
  spinSeconds = 24,
  floatSeconds = 7,
  core = true,
  className = "",
}: Props) {
  const p = `cc${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const half = size / 2;
  const coreSize = size * 0.45;
  const coreHalf = coreSize / 2;

  return (
    <div
      aria-hidden
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size, perspective: size * 6 }}
    >
      <style>{`
        @keyframes ${p}-spin {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to { transform: rotateX(-22deg) rotateY(360deg); }
        }
        @keyframes ${p}-spin-rev {
          from { transform: rotateY(360deg) rotateX(45deg); }
          to { transform: rotateY(0deg) rotateX(45deg); }
        }
        @keyframes ${p}-float {
          0%, 100% { transform: translateY(-8px); }
          50% { transform: translateY(8px); }
        }
        @keyframes ${p}-shadow {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.35; }
          50% { transform: translateX(-50%) scale(0.85); opacity: 0.2; }
        }
        .${p}-float { animation: ${p}-float ${floatSeconds}s ease-in-out infinite; }
        .${p}-spin { animation: ${p}-spin ${spinSeconds}s linear infinite; }
        .${p}-core { animation: ${p}-spin-rev ${spinSeconds * 0.7}s linear infinite; }
        .${p}-shadow { animation: ${p}-shadow ${floatSeconds}s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .${p}-float, .${p}-spin, .${p}-core, .${p}-shadow { animation: none; }
          .${p}-spin { transform: rotateX(-22deg) rotateY(35deg); }
        }
      `}</style>

      <div className={`${p}-float h-full w-full`}>
        <div
          className={`${p}-spin relative h-full w-full`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {FACES.map((f) => (
            <div
              key={f.name}
              className="absolute inset-0"
              style={{
                transform: `${f.t} translateZ(${half}px)`,
                background: `linear-gradient(135deg, ${f.a}, ${f.b})`,
                border: "1px solid rgba(244,244,246,0.45)", // ✏️ ketebalan/terang edge
                boxShadow: "inset 0 0 24px rgba(244,244,246,0.06)",
                backfaceVisibility: "hidden",
              }}
            />
          ))}

          {core && (
            <div
              className={`${p}-core absolute`}
              style={{
                width: coreSize,
                height: coreSize,
                left: half - coreHalf,
                top: half - coreHalf,
                transformStyle: "preserve-3d",
              }}
            >
              {FACES.map((f) => (
                <div
                  key={f.name}
                  className="absolute inset-0"
                  style={{
                    transform: `${f.t} translateZ(${coreHalf}px)`,
                    background: "rgba(244,244,246,0.12)",
                    border: "1px solid rgba(244,244,246,0.8)",
                    boxShadow: "0 0 18px rgba(244,244,246,0.35)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bayangan lembut di bawah */}
      <div
        className={`${p}-shadow absolute left-1/2 rounded-full`}
        style={{
          bottom: -size * 0.35,
          width: size * 0.9,
          height: size * 0.12,
          background:
            "radial-gradient(ellipse, rgba(244,244,246,0.5), transparent 70%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
