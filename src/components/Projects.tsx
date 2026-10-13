"use client";

import Reveal from "./Reveal";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  demo?: string;
  repo?: string;
};

// ✏️ Edit / tambah project di sini
const projects: Project[] = [
  {
    title: "Good OLd' Bakery",
    blurb:
      "Final project for Human–Computer Interaction. A multi-page bakery website built around user-centered design — clear navigation, product filtering, a location finder, and form validation.",
    tags: ["HTML", "CSS", "JavaScript", "Figma", "UI/UX"],
    demo: "https://bakery-hci.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative bg-navy-950 px-6 py-24 md:py-32">
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} variant="pop">
              <article className="bento group flex h-full flex-col rounded-2xl border border-navy-700 bg-navy-800/60 p-7">
                {/* Preview placeholder monokrom (CSS murni, tanpa aset) */}
                <div
                  aria-hidden
                  className="mb-6 flex h-36 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-navy-900 to-navy-700"
                >
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-glow-soft/70" aria-hidden>
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M3 9h18" />
                    <circle cx="6" cy="6.5" r="0.6" fill="currentColor" />
                    <circle cx="8" cy="6.5" r="0.6" fill="currentColor" />
                  </svg>
                </div>

                <h3 className="font-display text-xl font-semibold text-glow-soft">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-glow-pink">
                  {p.blurb}
                </p>

                {/* Tags */}
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2 text-sm font-semibold text-glow-soft transition hover:border-white/60 hover:bg-white/10"
                    >
                      View live demo
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
