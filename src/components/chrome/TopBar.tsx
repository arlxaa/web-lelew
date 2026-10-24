"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/content/profile";
import { formatClock, useNow } from "@/lib/hooks";
import { SocialIcon } from "@/components/Icons";
import { useOS } from "@/components/OSProvider";
import ThemeTimeline from "./ThemeTimeline";

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function TopBar() {
  const { setPaletteOpen, launch } = useOS();
  const now = useNow();
  const barRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<number>(-1);

  // Scroll progress line (sibaldesign) written straight to a CSS var.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        barRef.current?.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Active section: the one crossing the middle band of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = SECTIONS.findIndex((s) => s.id === e.target.id);
          if (e.isIntersecting) setSection(i);
          else if (e.boundingClientRect.top > 0) setSection((cur) => (cur === i ? i - 1 : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const date = formatClock(now, profile.timezone, { weekday: "short", month: "short", day: "numeric" });
  const time = formatClock(now, profile.timezone, { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="topbar" ref={barRef}>
      <div className="topbar__left">
        <a href="#top" className="topbar__logo" aria-label="Back to the desktop">
          <span className="topbar__mark">L</span>
          <span className="topbar__brand">LELE.OS</span>
        </a>
        {section >= 0 && (
          <span className="topbar__section mono" aria-live="polite">
            {String(section + 1).padStart(2, "0")} · {SECTIONS[section].label}
          </span>
        )}
      </div>

      <ThemeTimeline className="topbar__timeline" />

      <div className="topbar__right">
        <button type="button" className="cmdk-pill" onClick={() => setPaletteOpen(true)}>
          <span className="cmdk-pill__label">Jump to</span>
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </button>
        <button
          type="button"
          className="term-pill"
          aria-label="Open terminal"
          onClick={() => launch("terminal")}
        >
          <span>&gt;</span>
          <span className="term-pill__cursor">_</span>
        </button>
        <nav className="topbar__socials" aria-label="Social links">
          {socials.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <SocialIcon id={s.id} />
            </a>
          ))}
        </nav>
        <span className="topbar__sep" aria-hidden />
        <time className="topbar__clock" suppressHydrationWarning>
          <span className="topbar__date">{now ? date : ""}</span> {time}
        </time>
      </div>
      <span className="topbar__progress" aria-hidden />
    </header>
  );
}
