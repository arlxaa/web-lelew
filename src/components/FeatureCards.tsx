"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export type IconName = "layers" | "spark" | "code" | "grid" | "cpu" | "shield";

export type FeatureItem = {
  icon: IconName;
  title: string;
  desc: string;
};

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  /** ✏️ jumlah kolom di layar besar */
  cols?: 2 | 3 | 4;
  /** ✏️ jeda antar kartu saat reveal (milidetik — sesuai komponen Reveal proyek) */
  stagger?: number;
};

// Ikon monokrom: stroke currentColor, tanpa warna lain
const ICONS: Record<IconName, ReactNode> = {
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17.5 9 5 9-5" opacity=".5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      <path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" opacity=".5" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" opacity=".5" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" opacity=".5" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" opacity=".6" />
    </>
  ),
};

const COLS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

export default function FeatureCards({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  cols = 3,
  stagger = 120,
}: Props) {
  return (
    <section id={id} className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow && (
              <p className="mono mb-4 text-xs uppercase tracking-[0.28em] text-glow-pink">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl font-semibold text-glow-soft md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 font-sans text-sm leading-relaxed text-glow-pink md:text-base">
                {subtitle}
              </p>
            )}
          </header>
        </Reveal>

        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${COLS[cols]}`}>
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * stagger}
              variant={i % 2 === 0 ? "left" : "right"}
            >
              <article className="fx-tilt bento group h-full rounded-2xl border border-navy-700 bg-navy-800/60 p-6 transition duration-300 hover:border-white/30 motion-reduce:transition-none">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-700 bg-navy-900 text-glow-violet transition duration-300 group-hover:rotate-[8deg] group-hover:scale-110 group-hover:text-glow-soft motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {ICONS[item.icon]}
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-glow">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-glow-pink">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
