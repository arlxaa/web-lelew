"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { achievements } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Icon, { type IconName } from "./Icon";
import CertificateViewer from "./CertificateViewer";

// Ikon per prestasi berdasarkan rank-nya.
function iconForRank(rank: string): IconName {
  const r = rank.toLowerCase();
  if (r.includes("1st") || r.includes("gold")) return "trophy";
  if (r.includes("2nd") || r.includes("medal") || r.includes("semi")) return "medal";
  return "medal";
}

export default function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<{ images: string[]; title: string } | null>(
    null,
  );

  // Determine which card is closest to the horizontal center of the viewport.
  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      track.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[i] as HTMLElement | undefined;
    if (!el) return;
    const left = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
  };

  const nudge = (dir: -1 | 1) =>
    scrollToIndex(Math.min(Math.max(active + dir, 0), achievements.length - 1));

  return (
    <section id="achievements" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Milestones" title="Achievements" />
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.5rem,calc((100vw-20rem)/2))] py-10"
      >
        {achievements.map((a, i) => {
          const isActive = i === active;
          return (
            <article
              key={a.title}
              onClick={() => scrollToIndex(i)}
              className={`bento flex w-80 flex-none cursor-pointer snap-center flex-col justify-between p-7 transition-all duration-500 ${
                isActive
                  ? "scale-105 border-glow/50 opacity-100 shadow-glow-lg"
                  : "scale-90 opacity-50 hover:opacity-75"
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-glow/30 bg-glow/10 text-glow-soft">
                    <Icon name={iconForRank(a.rank)} size={20} title={a.rank} />
                  </span>
                  <span className="mono inline-block rounded-full border border-glow/30 bg-glow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-glow-soft">
                    {a.rank}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                  {a.title}
                </h3>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm text-slate-300">{a.org}</p>
                <p className="mono mt-1 text-xs text-slate-500">{a.year}</p>
                {a.certificates && a.certificates.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewer({ images: a.certificates!, title: a.title });
                    }}
                    className="mono mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-glow-soft transition-colors hover:text-glow"
                  >
                    View certificate
                    {a.certificates.length > 1 && ` (${a.certificates.length})`}
                    <Icon name="arrow" size={14} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6">
        <button
          aria-label="Previous"
          onClick={() => nudge(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-glow/50 disabled:opacity-30 motion-reduce:hover:scale-100"
          disabled={active === 0}
        >
          ‹
        </button>

        <div className="flex gap-2">
          {achievements.map((a, i) => (
            <button
              key={a.title}
              aria-label={`Go to achievement ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-glow shadow-glow" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          aria-label="Next"
          onClick={() => nudge(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-glow/50 disabled:opacity-30 motion-reduce:hover:scale-100"
          disabled={active === achievements.length - 1}
        >
          ›
        </button>
      </div>

      {viewer && (
        <CertificateViewer
          images={viewer.images}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
