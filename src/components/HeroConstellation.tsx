"use client";

import { useId } from "react";

/**
 * Hero visual dekoratif: konstelasi emas + orbit, murni SVG/CSS.
 * Nuansa: node jaringan (AI) yang terhubung seperti rasi bintang,
 * dengan cincin orbit tipis (kesan radar / cyber).
 *
 * Animasi:
 *  - garis konstelasi "tergambar" sekali saat load,
 *  - orbit berputar sangat pelan, bintang berkedip lembut,
 *  - semua dimatikan kalau prefers-reduced-motion aktif.
 */

const GOLD = "#D4B06A";
const SOFT_GOLD = "#F0D79A";
const LAVENDER = "#b9a8e6";

// Titik-titik konstelasi (koordinat dalam viewBox 600x600)
const stars: { x: number; y: number; r: number; spark?: boolean; d: number }[] = [
  { x: 300, y: 300, r: 7, spark: true, d: 0 }, // inti
  { x: 168, y: 214, r: 3.2, d: 1.2 },
  { x: 236, y: 120, r: 4, spark: true, d: 2.4 },
  { x: 372, y: 96, r: 3, d: 0.6 },
  { x: 462, y: 176, r: 4.2, spark: true, d: 3.1 },
  { x: 502, y: 318, r: 3, d: 1.8 },
  { x: 436, y: 440, r: 3.6, d: 2.9 },
  { x: 318, y: 504, r: 4.4, spark: true, d: 0.9 },
  { x: 188, y: 450, r: 3.2, d: 2.1 },
  { x: 100, y: 332, r: 3.8, d: 3.6 },
];

// Pasangan indeks bintang yang dihubungkan garis
const links: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 6], [0, 8],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 1], [0, 9],
];

function spark(x: number, y: number, s: number) {
  // bintang 4 sudut (kurva cekung)
  return `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;
}

export default function HeroConstellation({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glow = `hc-glow-${uid}`;
  const line = `hc-line-${uid}`;
  const fade = `hc-fade-${uid}`;

  return (
    <div className={`hc-wrap ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 600" className="hc-svg" role="presentation" focusable="false">
        <defs>
          <radialGradient id={glow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
            <stop offset="55%" stopColor="#6d4fc2" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#0b0714" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={line} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={SOFT_GOLD} stopOpacity="0.75" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.25" />
          </linearGradient>
          {/* memudarkan tepi supaya menyatu dengan latar */}
          <radialGradient id={fade} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${fade}-m`}>
            <rect width="600" height="600" fill={`url(#${fade})`} />
          </mask>
        </defs>

        <g mask={`url(#${fade}-m)`}>
          {/* aura */}
          <circle cx="300" cy="300" r="290" fill={`url(#${glow})`} />

          {/* cincin orbit statis */}
          <circle cx="300" cy="300" r="120" className="hc-ring" />
          <circle cx="300" cy="300" r="190" className="hc-ring hc-ring-dash" />
          <circle cx="300" cy="300" r="260" className="hc-ring" />

          {/* orbit berputar + satelit */}
          <g className="hc-spin hc-spin-a">
            <circle cx="420" cy="300" r="3" fill={SOFT_GOLD} />
          </g>
          <g className="hc-spin hc-spin-b">
            <circle cx="300" cy="110" r="2.5" fill={LAVENDER} />
            <circle cx="300" cy="110" r="7" fill="none" stroke={LAVENDER} strokeOpacity="0.35" strokeWidth="0.8" />
          </g>
          <g className="hc-spin hc-spin-c">
            <path d={spark(40, 300, 7)} fill={GOLD} />
          </g>

          {/* garis konstelasi */}
          <g stroke={`url(#${line})`} strokeWidth="0.9" fill="none">
            {links.map(([a, b], i) => {
              const p = stars[a];
              const q = stars[b];
              const len = Math.hypot(q.x - p.x, q.y - p.y);
              return (
                <line
                  key={i}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  className="hc-link"
                  style={{
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    animationDelay: `${0.15 * i}s`,
                  }}
                />
              );
            })}
          </g>

          {/* bintang */}
          {stars.map((s, i) => (
            <g key={i} className="hc-star" style={{ animationDelay: `${s.d}s` }}>
              {s.spark ? (
                <path d={spark(s.x, s.y, s.r * 2.6)} fill={SOFT_GOLD} />
              ) : (
                <circle cx={s.x} cy={s.y} r={s.r} fill={GOLD} />
              )}
              <circle cx={s.x} cy={s.y} r={s.r * 0.45} fill="#fff7e0" />
            </g>
          ))}

          {/* inti: cincin kecil */}
          <circle cx="300" cy="300" r="20" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      </svg>

      <style>{`
        .hc-wrap { width: 100%; max-width: 560px; aspect-ratio: 1 / 1; }
        .hc-svg { width: 100%; height: 100%; display: block; overflow: visible; }
        .hc-ring { fill: none; stroke: ${LAVENDER}; stroke-opacity: .18; stroke-width: .8; }
        .hc-ring-dash { stroke-dasharray: 2 7; stroke-opacity: .3; }

        .hc-spin { transform-box: view-box; transform-origin: 300px 300px; }
        .hc-spin-a { animation: hc-rot 48s linear infinite; }
        .hc-spin-b { animation: hc-rot 80s linear infinite reverse; }
        .hc-spin-c { animation: hc-rot 120s linear infinite; }

        .hc-link { animation: hc-draw 1.6s cubic-bezier(.22,.7,.2,1) forwards; }
        .hc-star { transform-box: fill-box; transform-origin: center; animation: hc-twinkle 5s ease-in-out infinite; }

        @keyframes hc-rot { to { transform: rotate(360deg); } }
        @keyframes hc-draw { to { stroke-dashoffset: 0; } }
        @keyframes hc-twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .55; transform: scale(.88); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hc-spin, .hc-star { animation: none; }
          .hc-link { animation: none; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </div>
  );
}
