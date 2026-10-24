"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { BOOT_STORAGE_KEY } from "@/lib/themes";
import { useOS } from "@/components/OSProvider";
import Pet from "@/components/Pet";

// Readout rows, sibaldesign-style: [verb, target, result]
const READOUT: [string, string, string][] = [
  ["INIT", "lele.runtime", "OK"],
  ["LOAD", "theme.tokens", "3 ERAS"],
  ["MOUNT", "/dev/taekwondo", "1ST DAN"],
  ["CALIB", "gpa.meter", "3.97 / 4.00"],
  ["SPAWN", "desktop.windows", "6 APPS"],
  ["WAKE", "pet.clawd", "*yawn*"],
  ["SYNC", "clock", "ASIA/JAKARTA"],
  ["DONE", "sequence.complete", "ENTER"],
];
const RING = 326.7;
const LINE_MS = 190;

export default function BootScreen() {
  const { booted, setBooted } = useOS();
  const [phase, setPhase] = useState<"splash" | "loading" | "out">("splash");
  const [lines, setLines] = useState(0);
  const [pct, setPct] = useState(0);
  const started = useRef(false);

  const finish = useCallback(() => {
    setPhase("out");
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {}
    window.setTimeout(setBooted, 650);
  }, [setBooted]);

  const load = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setPhase("loading");
    const t0 = performance.now();
    const total = READOUT.length * LINE_MS;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / total);
      setPct(Math.round(p * 100));
      setLines(Math.min(READOUT.length, Math.floor(p * READOUT.length) + 1));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(finish, 380);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  // Auto-continue from the splash; any key or click skips ahead.
  useEffect(() => {
    if (booted) return;
    const t = window.setTimeout(load, 2300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      else load();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [booted, load, finish]);

  if (booted) return null;

  const shown = READOUT.slice(Math.max(0, lines - 6), lines);
  return (
    <div className="boot" data-phase={phase} role="dialog" aria-label="Loading LELE.OS">
      {phase === "splash" ? (
        <div className="boot__plate">
          <div className="boot__mark">
            <svg className="boot__ring" viewBox="0 0 48 48" aria-hidden>
              <circle cx="24" cy="24" r="20" />
              <circle cx="24" cy="24" r="14" className="boot__ring2" />
              <path d="M19 15v18h11" className="boot__l" />
            </svg>
            <div className="boot__word">
              <span className="boot__wordmark">LELE.OS</span>
              <span className="boot__sub" aria-hidden>
                {"CELESTYN".split("").map((c, i) => (
                  <i key={i}>{c}</i>
                ))}
              </span>
            </div>
          </div>
          <ol className="boot__lines">
            <li>{profile.name.toUpperCase()} · PRESENTS</li>
            <li>
              EST.{profile.since} [PORTFOLIO / 2026]
            </li>
            <li>
              ENGINEERED IN NEXT.JS <span className="boot__tick">◤</span>
            </li>
          </ol>
          <button type="button" className="boot__enter" onClick={load}>
            <span className="boot__rule" />
            <span className="boot__bars" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span>BOOT LELE.OS</span>
          </button>
          <p className="boot__legal">© 2026 · BUILT BY {profile.name.toUpperCase()} · ESC TO SKIP</p>
        </div>
      ) : (
        <div className="boot__stack">
          <div className="boot__loader">
            <svg viewBox="0 0 120 120" aria-hidden>
              <circle className="boot__track" cx="60" cy="60" r="52" />
              <circle
                className="boot__fill"
                cx="60"
                cy="60"
                r="52"
                style={{ strokeDashoffset: RING * (1 - pct / 100) }}
              />
            </svg>
            <span className="boot__pct">{String(pct).padStart(2, "0")}</span>
          </div>
          <p className="boot__title">LL.LOADING.OS</p>
          <ul className="boot__readout">
            {shown.map(([verb, target, res]) => (
              <li key={target}>
                <b>{verb}</b>
                <span>{target}</span>
                <em>{res}</em>
              </li>
            ))}
          </ul>
          <div className="boot__pet">
            <Pet mood={pct < 70 ? "sleep" : "wave"} cell={3} />
          </div>
        </div>
      )}
      <button type="button" className="boot__skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
