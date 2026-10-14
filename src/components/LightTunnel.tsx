"use client";

import { useId, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  /** ✏️ durasi pulse titik cahaya (detik). Range enak: 4-6 */
  pulseSeconds?: number;
  /** ✏️ durasi sway garis perspektif (detik). Makin besar = makin pelan */
  driftSeconds?: number;
  /** ✏️ posisi vertikal titik cahaya (% dari atas) */
  focusY?: number;
};

/**
 * Hero backdrop "lorong cahaya" monokrom. Taruh sebagai wrapper hero:
 * <LightTunnel className="min-h-screen"> ...konten hero... </LightTunnel>
 */
export default function LightTunnel({
  children,
  className = "",
  pulseSeconds = 5,
  driftSeconds = 40,
  focusY = 46,
}: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = `lt${uid}`;
  const gradL = `${p}gl`;
  const gradR = `${p}gr`;

  // ✏️ Warna garis perspektif (alpha) & kerapatan (derajat per garis)
  const lineAlpha = 0.12;
  const lineGap = 5;

  const rays = `repeating-conic-gradient(from 0deg at 50% ${focusY}%, rgba(244,244,246,${lineAlpha}) 0deg 0.35deg, transparent 0.35deg ${lineGap}deg)`;
  const rings = `repeating-radial-gradient(ellipse 60% 45% at 50% ${focusY}%, rgba(244,244,246,0.06) 0px 1px, transparent 1px 64px)`;
  const mask = `radial-gradient(ellipse 75% 70% at 50% ${focusY}%, transparent 0%, #000 12%, #000 55%, transparent 100%)`;

  return (
    <div className={`light-tunnel relative isolate overflow-hidden bg-navy-950 ${className}`}>
      <style>{`
        @keyframes ${p}-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes ${p}-sway {
          0% { transform: rotate(-2.5deg) scale(1.15); }
          100% { transform: rotate(2.5deg) scale(1.15); }
        }
        @keyframes ${p}-pull {
          0% { transform: scale(1.4); opacity: 0; }
          16% { opacity: 0.5; }
          100% { transform: scale(0.3); opacity: 0; }
        }
        .${p}-pulse { animation: ${p}-pulse ${pulseSeconds}s ease-in-out infinite; }
        .${p}-sway { animation: ${p}-sway ${driftSeconds}s ease-in-out infinite alternate; }
        .${p}-pull { animation: ${p}-pull 7s cubic-bezier(.4,0,.5,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .${p}-pulse, .${p}-sway, .${p}-pull { animation: none; }
          .${p}-pull { opacity: 0.18; transform: scale(0.9); }
        }
      `}</style>

      {/* Garis perspektif + ring kedalaman */}
      <div
        aria-hidden
        className={`${p}-sway pointer-events-none absolute inset-0 -z-10`}
        style={{
          backgroundImage: `${rays}, ${rings}`,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />

      {/* Ring konsentris yang ditarik ke dalam (efek lorong hidup) */}
      <div
        aria-hidden
        className={`${p}-pull pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full`}
        style={{
          border: "1px solid rgba(244,244,246,0.25)",
          boxShadow: "0 0 0 1px rgba(244,244,246,0.06), inset 0 0 60px rgba(244,244,246,0.05)",
        }}
      />

      {/* Bukit gelombang kiri-kanan (SVG) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          {/* ✏️ stop warna: hitam -> abu */}
          <linearGradient id={gradL} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#060607" />
            <stop offset="55%" stopColor="#0c0c0e" />
            <stop offset="100%" stopColor="#2a2a30" />
          </linearGradient>
          <linearGradient id={gradR} x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#060607" />
            <stop offset="55%" stopColor="#0c0c0e" />
            <stop offset="100%" stopColor="#2a2a30" />
          </linearGradient>
        </defs>
        <path
          d="M0 600 L0 210 C 140 190 300 260 430 360 C 510 420 560 520 620 600 Z"
          fill={`url(#${gradL})`}
        />
        <path
          d="M1440 600 L1440 210 C 1300 190 1140 260 1010 360 C 930 420 880 520 820 600 Z"
          fill={`url(#${gradR})`}
        />
        {/* edge highlight tipis */}
        <path
          d="M0 210 C 140 190 300 260 430 360 C 510 420 560 520 620 600"
          fill="none"
          stroke="rgba(244,244,246,0.22)"
          strokeWidth="1"
        />
        <path
          d="M1440 210 C 1300 190 1140 260 1010 360 C 930 420 880 520 820 600"
          fill="none"
          stroke="rgba(244,244,246,0.22)"
          strokeWidth="1"
        />
      </svg>

      {/* Titik cahaya pusat */}
      <div
        aria-hidden
        className={`${p}-pulse pointer-events-none absolute left-1/2 -z-10 h-[38vmin] w-[38vmin] rounded-full`}
        style={{
          top: `${focusY}%`,
          background:
            "radial-gradient(circle, rgba(244,244,246,0.95) 0%, rgba(244,244,246,0.35) 12%, rgba(154,154,162,0.12) 38%, transparent 68%)",
        }}
      />

      {/* Vignette bawah/atas biar nyatu sama section berikutnya */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #060607 0%, transparent 18%, transparent 70%, #060607 100%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
