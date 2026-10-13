"use client";

import { useState } from "react";
import { achievements } from "@/lib/content";

/**
 * Carousel kartu 3D ala KAMUI — MONOKROM, CSS murni, tanpa aset gambar.
 * - 3 kartu terlihat: tengah menonjol, kiri/kanan mengecil & meredup.
 * - Kartu tengah bisa di-klik untuk FLIP (depan: rank + judul, belakang: detail).
 * - Navigasi Previous / Next + indikator dots.
 * Semua animasi transform; mati halus saat prefers-reduced-motion.
 */
export default function CardCarousel() {
  const n = achievements.length;
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (dir: number) => {
    setFlipped(false);
    setActive((a) => (a + dir + n) % n);
  };

  return (
    <section id="cards" className="relative bg-navy-950 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mono mb-4 text-xs uppercase tracking-[0.28em] text-glow-pink">
          Achievements
        </p>
        <h2 className="font-display text-3xl font-semibold text-glow-soft md:text-5xl">
          Collect the wins
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-glow-pink md:text-base">
          Click the center card to flip it. Browse with Previous / Next.
        </p>

        {/* Panggung kartu 3D */}
        <div
          className="relative mx-auto mt-16 flex h-[26rem] items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          {achievements.map((a, i) => {
            // posisi relatif terhadap kartu aktif (-.. 0 ..+), dibungkus melingkar
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;

            const isCenter = off === 0;
            const abs = Math.abs(off);
            if (abs > 2) return null; // cuma render 2 kartu di tiap sisi

            const translateX = off * 56; // % jarak antar kartu
            const scale = isCenter ? 1 : abs === 1 ? 0.82 : 0.66;
            const opacity = isCenter ? 1 : abs === 1 ? 0.55 : 0.25;
            const rotateY = off * -18; // kartu samping miring ke tengah
            const z = 100 - abs;

            return (
              <div
                key={i}
                className="absolute left-1/2 top-0 h-full w-[16rem] cc-anim"
                style={{
                  transform: `translateX(-50%) translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: z,
                  pointerEvents: isCenter ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  aria-label={isCenter ? "Flip card" : a.title}
                  onClick={() => isCenter && setFlipped((f) => !f)}
                  className="group relative block h-full w-full cursor-pointer rounded-2xl focus:outline-none"
                  style={{ transformStyle: "preserve-3d" }}
                  tabIndex={isCenter ? 0 : -1}
                >
                  {/* wrapper flip */}
                  <div
                    className="relative h-full w-full cc-flip"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isCenter && flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* DEPAN */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br from-navy-800 to-navy-900 p-6 text-left"
                      style={{ backfaceVisibility: "hidden", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.9), inset 0 0 40px rgba(244,244,246,0.04)" }}
                    >
                      {/* ornamen sudut */}
                      <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/10" />
                      <span className="mono text-[0.65rem] uppercase tracking-[0.25em] text-glow-pink">
                        {a.year}
                      </span>

                      {/* emblem tengah */}
                      <div className="mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5">
                        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-glow-soft" aria-hidden>
                          <circle cx="12" cy="9" r="5.5" />
                          <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
                        </svg>
                      </div>

                      <div>
                        <p className="font-display text-sm font-semibold leading-tight text-glow-soft">
                          {a.rank}
                        </p>
                        <p className="mt-1 line-clamp-3 font-sans text-xs leading-snug text-glow-pink">
                          {a.title}
                        </p>
                      </div>
                    </div>

                    {/* BELAKANG */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/20 bg-gradient-to-br from-navy-700 to-navy-900 p-6 text-left"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.9)" }}
                    >
                      <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/10" />
                      <span className="mono text-[0.65rem] uppercase tracking-[0.25em] text-glow-pink">
                        Detail
                      </span>
                      <div className="space-y-2">
                        <p className="font-display text-sm font-semibold leading-tight text-glow-soft">
                          {a.title}
                        </p>
                        <p className="font-sans text-xs leading-snug text-glow-pink">
                          {a.org}
                        </p>
                        <p className="mono text-[0.65rem] text-glow-pink/80">{a.year}</p>
                      </div>
                      <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-glow-pink/70">
                        Click to flip
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Navigasi */}
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="mono flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-glow-soft transition hover:border-white/50 hover:bg-white/5"
          >
            ‹ Previous
          </button>

          <div className="flex items-center gap-2">
            {achievements.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => {
                  setFlipped(false);
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-7 bg-glow-soft" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="mono flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-glow-soft transition hover:border-white/50 hover:bg-white/5"
          >
            Next ›
          </button>
        </div>
      </div>

      <style>{`
        .cc-anim { transition: transform 0.6s cubic-bezier(.22,.7,.2,1), opacity 0.6s ease; }
        .cc-flip { transition: transform 0.7s cubic-bezier(.4,0,.2,1); }
        @media (prefers-reduced-motion: reduce) {
          .cc-anim, .cc-flip { transition: none; }
        }
      `}</style>
    </section>
  );
}
