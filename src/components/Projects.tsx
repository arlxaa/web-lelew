"use client";

import Reveal from "./Reveal";

type Category = "assignment" | "for-fun" | "startup" | "client";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  categories: Category[];
  cover?: string; // ✏️ path screenshot cover (opsional). Kosong = placeholder monokrom.
  demo?: string;
  repo?: string;
};

// ✏️ Label + warna tiap kategori (aksen warna-warni, dipakai HANYA di chip kategori)
const CATEGORY: Record<Category, { label: string; color: string }> = {
  assignment: { label: "Assignment", color: "#6aa8ff" },
  "for-fun": { label: "For Fun", color: "#ff8bc3" },
  startup: { label: "Startup", color: "#7c6cff" },
  client: { label: "Client Work", color: "#2ee6a6" },
};

// ✏️ Edit / tambah project di sini
const projects: Project[] = [
  {
    title: "Club Lights",
    blurb:
      "A music-reactive light show web app. Turns live audio into real-time visuals — six light scenes driven by a microphone pipeline, plus a Spotify mode (PKCE auth + Web Playback SDK). Zero-cost, fully client-side.",
    tags: ["React", "TypeScript", "Vite", "Web Audio API", "Spotify API"],
    categories: ["for-fun"],
    cover: "/covers/club-lights.png",
    demo: "https://jedagjedug.vercel.app/",
  },
  {
    title: "Good OLd' Bakery",
    blurb:
      "Final project for Human–Computer Interaction. A multi-page bakery website built around user-centered design — clear navigation, product filtering, a location finder, and form validation.",
    tags: ["HTML", "CSS", "JavaScript", "Figma", "UI/UX"],
    categories: ["assignment"],
    cover: "/covers/bakery.png",
    demo: "https://bakery-hci.vercel.app/",
  },
];

/** Preview placeholder monokrom (CSS murni, tanpa aset) — dipakai jika belum ada cover */
function CoverPlaceholder() {
  return (
    <div
      aria-hidden
      className="flex h-full min-h-[200px] w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-navy-900 to-navy-700"
    >
      <svg viewBox="0 0 24 24" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-glow-soft/60" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <circle cx="6" cy="6.5" r="0.6" fill="currentColor" />
        <circle cx="8" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mono mb-4 text-xs uppercase tracking-[0.28em] text-glow-pink">
              Projects
            </p>
            <h2 className="font-display text-3xl font-semibold text-glow-soft md:text-5xl">
              Things I&apos;ve built
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-glow-pink md:text-base">
              Selected work — more on the way.
            </p>
          </header>
        </Reveal>

        <div className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant={i % 2 === 0 ? "left" : "right"}>
              <article className="bento group grid grid-cols-1 gap-6 rounded-2xl border border-navy-700 bg-navy-800/60 p-5 md:grid-cols-[1.3fr_1fr] md:p-6">
                {/* COVER besar (kiri) */}
                <div className="overflow-hidden rounded-xl">
                  {p.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover}
                      alt={`${p.title} preview`}
                      className="h-full min-h-[200px] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <CoverPlaceholder />
                  )}
                </div>

                {/* INFO (kanan) */}
                <div className="flex flex-col">
                  {/* Kategori warna-warni */}
                  <ul className="mb-3 flex flex-wrap gap-2">
                    {p.categories.map((c) => (
                      <li
                        key={c}
                        className="mono rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider"
                        style={{
                          color: CATEGORY[c].color,
                          border: `1px solid ${CATEGORY[c].color}55`,
                          background: `${CATEGORY[c].color}14`,
                        }}
                      >
                        {CATEGORY[c].label}
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-display text-2xl font-semibold text-glow-soft">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-glow-pink">
                    {p.blurb}
                  </p>

                  {/* Tech stack */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="mono rounded-full border border-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-glow-pink"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-full border accent-border accent-text bg-white/5 px-5 py-2 text-sm font-semibold transition-all duration-200 hover:translate-x-1 hover:accent-glow motion-reduce:hover:translate-x-0"
                      >
                        View live demo
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:group-hover/btn:translate-x-0 motion-reduce:group-hover/btn:translate-y-0">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-glow-pink transition hover:border-white/40 hover:text-glow-soft"
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
