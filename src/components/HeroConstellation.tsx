"use client";

import { useId } from "react";

/**
 * Hero visual v2: "rasi bintang Lele"
 *  - bintang berlabel skill (AI, OSINT, FORENSICS, ...)
 *  - radar sweep emas tipis di dalam cincin tengah
 *  - debu bintang (titik kecil) mengisi ruang kosong
 *
 * Murni SVG + CSS. Tanpa gambar, tanpa library.
 * Semua animasi mati kalau prefers-reduced-motion aktif.
 * Props sama seperti versi sebelumnya: <HeroConstellation className="..." />
 */

const GOLD = "#d4d4d8";      // mid-grey (was gold)
const SOFT_GOLD = "#f4f4f6"; // near-white (was soft gold)
const LAVENDER = "#8a8a92";  // muted grey (was lavender)

// ✏️ Bintang: x,y dalam viewBox 600x600. `label` = teks skill, `pos` = di atas/bawah bintang.
// Bintang yang tidak berlabel sengaja dilewati (sisi kiri/kanan tertimpa nama CELESTYN/AURELIXIA).
const stars: {
  x: number;
  y: number;
  r: number;
  spark?: boolean;
  d: number;
  label?: string;
  pos?: "top" | "bottom";
}[] = [
  { x: 300, y: 300, r: 7, spark: true, d: 0 }, // inti
  { x: 168, y: 214, r: 3.2, d: 1.2, label: "UI DESIGN", pos: "top" },
  { x: 236, y: 120, r: 4, spark: true, d: 2.4, label: "AI", pos: "top" },
  { x: 372, y: 96, r: 3, d: 0.6, label: "OSINT", pos: "top" },
  { x: 462, y: 176, r: 4.2, spark: true, d: 3.1, label: "WEB DEV", pos: "top" },
  { x: 502, y: 318, r: 3, d: 1.8 },
  { x: 436, y: 440, r: 3.6, d: 2.9, label: "STARTUP", pos: "bottom" },
  { x: 318, y: 504, r: 4.4, spark: true, d: 0.9, label: "TEACHING", pos: "bottom" },
  { x: 188, y: 450, r: 3.2, d: 2.1, label: "ENTREPRENEURSHIP", pos: "bottom" },
  { x: 100, y: 332, r: 3.8, d: 3.6 },
];

const links: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 6], [0, 8],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 1], [0, 9],
];

// Debu bintang: pseudo-random dengan seed tetap (hasil sama di server & browser)
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DUST_COUNT = 40; // ✏️ jumlah debu bintang
const dust = (() => {
  const rnd = mulberry32(2025);
  const out: { x: number; y: number; r: number; o: number; gold: boolean; tw: boolean; dur: number; del: number }[] = [];
  while (out.length < DUST_COUNT) {
    const x = rnd() * 600;
    const y = rnd() * 600;
    if (Math.hypot(x - 300, y - 300) > 285) continue; // tetap di dalam lingkaran
    out.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      r: Math.round((0.7 + rnd() * 1.2) * 10) / 10,
      o: Math.round((0.3 + rnd() * 0.55) * 100) / 100,
      gold: rnd() > 0.45,
      tw: rnd() > 0.55,
      dur: Math.round((3 + rnd() * 5) * 10) / 10,
      del: Math.round(rnd() * 50) / 10,
    });
  }
  return out;
})();

// Area radar = bentuk rasi bintang (bintang 1..9 berurutan), dalam persen dari kotak 600x600
const RADAR_POLY = `polygon(${stars
  .slice(1)
  .map((s) => `${((s.x / 600) * 100).toFixed(2)}% ${((s.y / 600) * 100).toFixed(2)}%`)
  .join(", ")})`;

// Cincin berskala (tick marks ala kompas/astrolabe)
const SCALE_R = 240; // ✏️ radius cincin skala
const SCALE_C = 2 * Math.PI * SCALE_R;
const MINOR = `0.9 ${(SCALE_C / 72 - 0.9).toFixed(3)}`; // tick kecil tiap 5°
const MAJOR = `1.4 ${(SCALE_C / 12 - 1.4).toFixed(3)}`; // tick besar tiap 30°

function spark(x: number, y: number, s: number) {
  return `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;
}

export default function HeroConstellation({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glow = `hc-glow-${uid}`;
  const line = `hc-line-${uid}`;
  const fade = `hc-fade-${uid}`;

  return (
    <div className={`hc-wrap ${className}`} aria-hidden="true">
      {/* Radar sweep (div + conic-gradient), di belakang bintang */}
      <div className="hc-radar-clip" style={{ clipPath: RADAR_POLY, WebkitClipPath: RADAR_POLY }}>
        <div className="hc-radar" />
      </div>

      <svg viewBox="0 0 600 600" className="hc-svg" role="presentation" focusable="false">
        <defs>
          <radialGradient id={glow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.26" />
            <stop offset="55%" stopColor="#5a5a62" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#060607" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={line} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={SOFT_GOLD} stopOpacity="0.75" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id={fade} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${fade}-m`}>
            <rect width="600" height="600" fill={`url(#${fade})`} />
          </mask>
        </defs>

        <g mask={`url(#${fade}-m)`}>
          <circle cx="300" cy="300" r="290" fill={`url(#${glow})`} />

          {/* debu bintang */}
          <g>
            {dust.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={p.gold ? SOFT_GOLD : LAVENDER}
                opacity={p.o}
                className={p.tw ? "hc-dust-tw" : undefined}
                style={p.tw ? { animationDuration: `${p.dur}s`, animationDelay: `${p.del}s` } : undefined}
              />
            ))}
          </g>

          {/* cincin orbit */}
          <circle cx="300" cy="300" r="120" className="hc-ring" />
          <circle cx="300" cy="300" r="190" className="hc-ring hc-ring-dash" />
          {/* cincin berskala: garis tipis + tick kecil (5°) + tick besar emas (30°) */}
          <g transform="rotate(-90 300 300)" fill="none">
            <circle cx="300" cy="300" r={SCALE_R} stroke={LAVENDER} strokeOpacity="0.22" strokeWidth="0.8" />
            <circle cx="300" cy="300" r={SCALE_R} stroke={LAVENDER} strokeOpacity="0.34" strokeWidth="5" strokeDasharray={MINOR} strokeDashoffset="0.45" />
            <circle cx="300" cy="300" r={SCALE_R} stroke={SOFT_GOLD} strokeOpacity="0.6" strokeWidth="10" strokeDasharray={MAJOR} strokeDashoffset="0.7" />
          </g>
          <text x="300" y="48" textAnchor="middle" className="hc-deg">0°</text>
          <text x="300" y="561" textAnchor="middle" className="hc-deg">180°</text>

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
                  style={{ strokeDasharray: len, strokeDashoffset: len, animationDelay: `${0.15 * i}s` }}
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
              <circle cx={s.x} cy={s.y} r={s.r * 0.45} fill="#ffffff" />
            </g>
          ))}

          {/* label skill: muncul sekali setelah garis selesai tergambar */}
          {stars.map(
            (s, i) =>
              s.label && (
                <text
                  key={`l-${i}`}
                  x={s.x}
                  y={s.pos === "top" ? s.y - 20 : s.y + 28}
                  textAnchor="middle"
                  className="hc-label"
                  style={{ animationDelay: `${2.2 + i * 0.12}s` }}
                >
                  {s.label}
                </text>
              )
          )}

          <circle cx="300" cy="300" r="20" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      </svg>

      <style>{`
        .hc-wrap { position: relative; width: 100%; max-width: 560px; aspect-ratio: 1 / 1; }
        .hc-svg { position: relative; width: 100%; height: 100%; display: block; overflow: visible; }
        .hc-ring { fill: none; stroke: ${LAVENDER}; stroke-opacity: .18; stroke-width: .8; }
        .hc-ring-dash { stroke-dasharray: 2 7; stroke-opacity: .3; }

        /* radar: pembungkus .hc-radar-clip diam lalu di-clip sebesar rasi bintang;
           isi .hc-radar yang berputar. Hasilnya penuh di dalam rasi, tidak meluber. */
        .hc-radar-clip { position: absolute; inset: 0; pointer-events: none; }
        .hc-radar {
          position: absolute; inset: 0;
          background: conic-gradient(from 0deg,
            rgba(255,255,255,0) 0deg,
            rgba(255,255,255,0) 285deg,
            rgba(255,255,255,.08) 335deg,
            rgba(255,255,255,.26) 359deg,
            rgba(255,255,255,.42) 360deg);
          -webkit-mask-image: radial-gradient(circle closest-side, transparent 4%, #000 14%);
                  mask-image: radial-gradient(circle closest-side, transparent 4%, #000 14%);
          animation: hc-rot 10s linear infinite;  /* ✏️ kecepatan sapuan */
        }

        .hc-spin { transform-box: view-box; transform-origin: 300px 300px; }
        .hc-spin-a { animation: hc-rot 48s linear infinite; }
        .hc-spin-b { animation: hc-rot 80s linear infinite reverse; }
        .hc-spin-c { animation: hc-rot 120s linear infinite; }

        .hc-link { animation: hc-draw 1.6s cubic-bezier(.22,.7,.2,1) forwards; }
        .hc-star { transform-box: fill-box; transform-origin: center; animation: hc-twinkle 5s ease-in-out infinite; }
        .hc-dust-tw { animation: hc-dust 4s ease-in-out infinite; }

        .hc-deg {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px; letter-spacing: 1.5px; fill: ${LAVENDER}; opacity: .6;
        }

        .hc-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 14px; letter-spacing: 2px;
          fill: ${SOFT_GOLD}; opacity: 0;
          animation: hc-fadein 1.2s ease forwards;
        }

        @keyframes hc-rot { to { transform: rotate(360deg); } }
        @keyframes hc-draw { to { stroke-dashoffset: 0; } }
        @keyframes hc-fadein { to { opacity: .78; } }
        @keyframes hc-twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .55; transform: scale(.88); }
        }
        @keyframes hc-dust { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }

        @media (prefers-reduced-motion: reduce) {
          .hc-spin, .hc-star, .hc-radar, .hc-dust-tw { animation: none; }
          .hc-link { animation: none; stroke-dashoffset: 0 !important; }
          .hc-label { animation: none; opacity: .78; }
        }
      `}</style>
    </div>
  );
}
