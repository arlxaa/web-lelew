"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile, socials } from "@/content/profile";
import { projects } from "@/content/projects";
import { THEMES } from "@/lib/themes";
import { QUICK_QUESTIONS } from "@/lib/chat";
import { scrollToSection, useOS } from "@/components/OSProvider";
import { SECTIONS } from "./TopBar";
import { ArrowUpRight, Chevron, Search } from "@/components/Icons";

type Item = { group: string; label: string; hint?: string; run: () => void };

// Subsequence match with a bonus for word starts (good enough for ~30 items).
function score(query: string, text: string) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  let ti = 0;
  let s = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found < 0) return 0;
    s += found === 0 || t[found - 1] === " " ? 3 : 1;
    ti = found + 1;
  }
  return s;
}

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setTheme, launch, askLele } = useOS();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) inputRef.current?.focus();
  }, [paletteOpen]);

  const items = useMemo<Item[]>(() => {
    const go = (fn: () => void) => () => {
      setPaletteOpen(false);
      setQuery("");
      fn();
    };
    return [
      ...SECTIONS.map((s, i) => ({
        group: "Sections",
        label: s.label,
        hint: String(i + 1).padStart(2, "0"),
        run: go(() => scrollToSection(s.id)),
      })),
      ...projects.map((p) => ({
        group: "Projects",
        label: p.title,
        hint: "live ↗",
        run: go(() => window.open(p.demo, "_blank", "noopener")),
      })),
      ...THEMES.map((t) => ({ group: "Theme", label: `Switch to ${t.label}`, hint: t.hint, run: go(() => setTheme(t.id)) })),
      { group: "Actions", label: "Open terminal", hint: ">_", run: go(() => launch("terminal")) },
      { group: "Actions", label: "Write a message", hint: "mail", run: go(() => launch("mail")) },
      { group: "Actions", label: "View certificates", run: go(() => launch("gallery")) },
      {
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: go(() => navigator.clipboard?.writeText(profile.email)),
      },
      ...socials.map((s) => ({
        group: "Actions",
        label: `Open ${s.label}`,
        hint: s.handle,
        run: go(() => window.open(s.href, "_blank", "noopener")),
      })),
      ...QUICK_QUESTIONS.map((q) => ({ group: "Ask Lele", label: q, run: go(() => askLele(q)) })),
    ];
  }, [setPaletteOpen, setTheme, launch, askLele]);

  const results = useMemo(() => {
    const scored = items
      .map((it) => ({ it, s: score(query, `${it.label} ${it.group}`) }))
      .filter((r) => r.s > 0);
    if (query) scored.sort((a, b) => b.s - a.s);
    return scored.map((r) => r.it);
  }, [items, query]);

  if (!paletteOpen) return null;

  const active = Math.min(cursor, Math.max(0, results.length - 1));
  // If nothing matches, Enter asks the question in the chat instead.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((active + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((active - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) results[active].run();
      else if (query.trim()) {
        setPaletteOpen(false);
        askLele(query.trim());
        setQuery("");
      }
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={() => setPaletteOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <label className="palette__search">
          <Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a project, or ask a question…"
            aria-label="Search commands"
          />
        </label>
        <ul className="palette__list" role="listbox">
          {results.map((it, i) => {
            const header = i === 0 || results[i - 1].group !== it.group ? it.group : null;
            return (
              <li key={`${it.group}-${it.label}`} role="none">
                {header && <p className="palette__group">{header}</p>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className="palette__item"
                  onMouseEnter={() => setCursor(i)}
                  onClick={it.run}
                >
                  <span>{it.label}</span>
                  {it.hint && <span className="palette__hint">{it.hint}</span>}
                  {it.group === "Projects" ? <ArrowUpRight size={14} /> : <Chevron size={14} />}
                </button>
              </li>
            );
          })}
          {!results.length && (
            <li className="palette__empty">
              Press <span className="kbd">↵</span> to ask Lele: “{query}”
            </li>
          )}
        </ul>
        <footer className="palette__foot">
          <span><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
          <span><span className="kbd">↵</span> open</span>
          <span><span className="kbd">esc</span> close</span>
        </footer>
      </div>
    </div>
  );
}
