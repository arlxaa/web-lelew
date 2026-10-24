"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CATEGORY_LABEL, hostOf, projects } from "@/content/projects";
import { scrollToSection } from "@/components/OSProvider";
import { ArrowDown, ArrowUpRight } from "@/components/Icons";
import { SectionHeader } from "./Reveal";

const CARDS = projects.length + 1; // + "coming soon"

// Deterministic "?" field for the coming-soon card (bryangarage.dev 04 cell).
const QMARKS = Array.from({ length: 9 * 26 }, (_, i) => {
  const x = (i % 26) - 12.5;
  const y = Math.floor(i / 26) - 4;
  const r = Math.sqrt(x * x + y * y * 6);
  const ring = Math.abs(Math.sin(r * 0.55));
  return ring > 0.55 ? (r < 4 ? 3 : r < 9 ? 2 : 1) : 0;
});

/**
 * Pinned 3D cover stack: rubens.design /work covers + sibaldesign's pinned
 * scroll with counter + bryangarage.dev project meta.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let raf = 0;
    const update = () => {
      const pinned = window.matchMedia("(min-width: 960px)").matches;
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = pinned && span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const t = p * (CARDS - 1);
      cardsRef.current.forEach((el, i) => el?.style.setProperty("--d", (i - t).toFixed(3)));
      barRef.current?.style.setProperty("--p", String(p));
      setActive(Math.min(CARDS - 1, Math.round(t)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveCursor = (e: React.PointerEvent) => {
    cursorRef.current?.style.setProperty("transform", `translate(${e.clientX}px, ${e.clientY}px)`);
  };

  const p = projects[active];
  return (
    <section id="projects" className="sec projects" ref={sectionRef} style={{ ["--cards" as string]: CARDS }}>
      <div className="projects__pin">
        <div className="wrap">
          <SectionHeader index="02" title="Projects" lede="Things I designed, built, and shipped." />
        </div>
        <div className="projects__stage wrap">
          <div className="projects__meta" aria-live="polite">
            {p ? (
              <div key={p.slug} className="pmeta">
                <p className="pmeta__kicker">
                  {String(active + 1).padStart(2, "0")} · {CATEGORY_LABEL[p.category]} · {p.kind}
                </p>
                <h3 className="pmeta__title">{p.title}</h3>
                <p className="pmeta__desc">{p.blurb}</p>
                <ul className="pmeta__tags">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="pmeta__links">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {p.demoLabel ?? "Live demo"} <ArrowUpRight size={14} />
                  </a>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      Source <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div key="soon" className="pmeta">
                <p className="pmeta__kicker">
                  {String(CARDS).padStart(2, "0")} · <span className="chip chip--accent"><span className="dot" />WIP</span>
                </p>
                <h3 className="pmeta__title">Next project</h3>
                <p className="pmeta__desc">Currently cooking on localhost. Check back soon, or peek at GitHub.</p>
                <div className="pmeta__links">
                  <a href="https://github.com/arlxaa" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    github.com/arlxaa <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            )}
            <div className="hz">
              <span className="hz__count mono">
                <b>{String(active + 1).padStart(2, "0")}</b> / {String(CARDS).padStart(2, "0")}
              </span>
              <span className="hz__bar" ref={barRef} aria-hidden />
              <button type="button" className="hz__skip mono" onClick={() => scrollToSection("journey")}>
                Skip to journey <ArrowDown size={11} />
              </button>
            </div>
          </div>

          <div className="stack" onPointerMove={moveCursor}>
            {projects.map((proj, i) => (
              <a
                key={proj.slug}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                href={proj.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="stack__card"
                style={{ ["--i" as string]: i, ["--d" as string]: i }}
                aria-label={`${proj.title}: ${(proj.demoLabel ?? "Live demo").toLowerCase()}`}
                tabIndex={i === active ? 0 : -1}
              >
                <span className="stack__chrome">
                  <span className="stack__dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="stack__url">{hostOf(proj.demo)}</span>
                  <ArrowUpRight size={12} />
                </span>
                <span className="stack__shot">
                  <Image src={proj.cover} alt={`${proj.title} screenshot`} fill sizes="(min-width: 960px) 760px, 100vw" />
                </span>
                <span className="stack__info">
                  <span className="pmeta__kicker">
                    {String(i + 1).padStart(2, "0")} · {CATEGORY_LABEL[proj.category]} · {proj.kind}
                  </span>
                  <span className="stack__title">{proj.title}</span>
                  <span className="stack__blurb">{proj.blurb}</span>
                  <span className="pmeta__tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            ))}
            <div
              ref={(el) => {
                cardsRef.current[projects.length] = el;
              }}
              className="stack__card stack__card--soon"
              style={{ ["--i" as string]: projects.length, ["--d" as string]: projects.length }}
              aria-hidden
            >
              <span className="stack__chrome">
                <span className="stack__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="stack__url">localhost:3000</span>
              </span>
              <span className="stack__soon">
                {QMARKS.map((lvl, i) => (
                  <i key={i} data-l={lvl}>
                    ?
                  </i>
                ))}
                <span className="stack__soon-label mono">coming soon</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="stack-cursor" ref={cursorRef} aria-hidden>
        <span>{p?.demoLabel ?? "View live"} ↗</span>
      </div>
    </section>
  );
}
