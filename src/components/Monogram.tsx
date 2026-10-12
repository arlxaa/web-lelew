"use client";

import { useId } from "react";

/**
 * Avatar monogram tipografis (bukan foto): huruf emas di atas ungu.
 *   <Monogram />                      -> "CA"
 *   <Monogram letters="L" size={96} /> -> "L"
 *
 * Font: pakai CSS variable dari next/font (--font-space-grotesk).
 * Kalau variabelnya belum kamu set, otomatis jatuh ke 'Space Grotesk' / sans-serif.
 */

type MonogramProps = {
  letters?: "CA" | "L";
  size?: number;
  className?: string;
  /** Label aksesibilitas */
  title?: string;
};

export default function Monogram({
  letters = "CA",
  size = 120,
  className,
  title = "Monogram Celestyn Aurelixia",
}: MonogramProps) {
  const uid = useId().replace(/:/g, "");
  const bg = `mg-bg-${uid}`;
  const gold = `mg-gold-${uid}`;
  const rim = `mg-rim-${uid}`;

  const isSingle = letters.length === 1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b1230" />
          <stop offset="100%" stopColor="#0b0714" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0D79A" />
          <stop offset="100%" stopColor="#D4B06A" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4B06A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#b9a8e6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D4B06A" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* badan */}
      <rect x="2" y="2" width="116" height="116" rx="30" fill={`url(#${bg})`} />
      <rect x="2.75" y="2.75" width="114.5" height="114.5" rx="29.5" fill="none" stroke={`url(#${rim})`} strokeWidth="1.5" />

      {/* garis orbit tipis di belakang huruf */}
      <circle cx="60" cy="60" r="44" fill="none" stroke="#b9a8e6" strokeOpacity="0.16" strokeWidth="0.8" strokeDasharray="1.5 5" />

      {/* huruf */}
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), 'Space Grotesk', system-ui, sans-serif"
        fontWeight={600}
        fontSize={isSingle ? 62 : 44}
        letterSpacing={isSingle ? 0 : -1.5}
        fill={`url(#${gold})`}
      >
        {letters}
      </text>

      {/* bintang kecil di pojok */}
      <path d="M96 22q0 4-4 4 4 0 4 4 0-4 4-4-4 0-4-4z" fill="#F0D79A" />
    </svg>
  );
}
