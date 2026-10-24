"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASCII_LOGO, BOOT_SCRIPT, BOOT_TICKS, COMMANDS, PROMPT, run, type Line } from "@/lib/terminal";
import { flashMood, setTerm, useTerm } from "@/lib/termStore";
import { scrollToSection, useOS } from "@/components/OSProvider";
import Pet from "@/components/Pet";

const TICK_MS = 55;

// lele CLI: bryangarage.dev's Garage CLI. Idle screen → BIOS-style boot →
// a small shell with history (↑/↓) and tab completion.
export default function TerminalApp() {
  const { phase } = useTerm();
  const { setTheme, launch, closeApp } = useOS();
  const [tick, setTick] = useState(0);
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Welcome to LELE.OS. Type 'help' to get started.", tone: "dim" },
  ]);
  const [input, setInput] = useState("");
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const boot = useCallback(() => {
    setTerm({ phase: "booting", bubble: false });
    flashMood("happy", 1400);
  }, []);

  // Boot ticker
  useEffect(() => {
    if (phase !== "booting") return;
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      setTick(t);
      if (t >= BOOT_TICKS) {
        clearInterval(id);
        setTerm({ phase: "shell" });
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "shell") inputRef.current?.focus({ preventScroll: true });
  }, [phase]);

  // "Any key boots it" — only when nothing else has focus.
  useEffect(() => {
    if (phase !== "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || document.activeElement !== document.body) return;
      if (e.key.length === 1 || e.key === "Enter") boot();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, boot]);

  useEffect(() => {
    screenRef.current?.scrollTo({ top: screenRef.current.scrollHeight });
  }, [lines, tick]);

  const submit = (raw: string) => {
    const { lines: out, effects } = run(raw, Date.now());
    if (raw.trim()) history.current.unshift(raw);
    hIdx.current = -1;
    setLines((l) => [...l, { kind: "in", text: raw }, ...out]);
    effects.forEach((fx) => {
      if (fx.type === "clear") setLines([]);
      else if (fx.type === "theme") setTheme(fx.theme);
      else if (fx.type === "open") launch(fx.app);
      else if (fx.type === "section") window.setTimeout(() => scrollToSection(fx.id), 600);
      else if (fx.type === "pet") flashMood(fx.mood, 2200);
      else if (fx.type === "exit") closeApp("terminal");
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      hIdx.current = Math.max(-1, Math.min(h.length - 1, hIdx.current + (e.key === "ArrowUp" ? 1 : -1)));
      setInput(hIdx.current < 0 ? "" : h[hIdx.current]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()) && input.trim());
      if (match) setInput(match + " ");
    }
  };

  return (
    <div className="app app--term term" onClick={() => phase === "shell" && inputRef.current?.focus({ preventScroll: true })}>
      <div className="term__screen" ref={screenRef}>
        {phase === "idle" && (
          <button type="button" className="term__idle" onClick={boot}>
            <pre className="term__logo" aria-label="LELE">
              {ASCII_LOGO.join("\n")}
            </pre>
            <span className="term__press">
              PRESS ANY KEY<span className="term__caret" />
            </span>
          </button>
        )}
        {phase === "booting" && (
          <div className="term__boot">
            <p className="term__dim">LELE BIOS v1.0 · 4.00 GPA scale OK</p>
            <p>Initializing new session in ~/binus/cs/</p>
            <div className="term__bar" aria-hidden>
              {Array.from({ length: 24 }, (_, i) => (
                <i key={i} data-on={i < Math.round((tick / BOOT_TICKS) * 24) || undefined} />
              ))}
            </div>
            {BOOT_SCRIPT.filter((s) => s.at <= tick).map((s) => (
              <p key={s.task} className="term__task">
                <span>{s.task}</span>
                <span className={s.tone === "wry" ? "term__wry" : "term__ok"}>{s.result}</span>
              </p>
            ))}
          </div>
        )}
        {phase === "shell" && (
          <>
            {lines.map((l, i) =>
              l.kind === "in" ? (
                <p key={i}>
                  <span className="term__prompt">{PROMPT}</span> {l.text}
                </p>
              ) : l.kind === "link" ? (
                <p key={i}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="term__link">
                    {l.text}
                  </a>
                </p>
              ) : (
                <p key={i} className={l.tone ? `term__${l.tone}` : undefined}>
                  {l.text}
                </p>
              ),
            )}
            <form
              className="term__line"
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
                setInput("");
              }}
            >
              <label className="term__prompt" htmlFor="term-input">
                {PROMPT}
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/** Clawd perched on the terminal window, with bryangarage's tip balloon. */
export function TerminalPet() {
  const { phase, mood, bubble } = useTerm();
  return (
    <div className="term-pet">
      {bubble && (
        <div className="term-pet__balloon" role="dialog" aria-label="Clawd says">
          <p>{phase === "idle" ? "Hi, I'm Clawd! Any key boots it." : "Psst, try 'help' or 'theme claude'."}</p>
          <div className="term-pet__row">
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => {
                setTerm({ bubble: false });
                flashMood("sleep");
              }}
            >
              Nap time
            </button>
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={() => {
                if (phase === "idle") setTerm({ phase: "booting", bubble: false });
                else setTerm({ bubble: false });
                flashMood("happy", 1400);
              }}
            >
              {phase === "idle" ? "Boot" : "Got it!"}
            </button>
          </div>
        </div>
      )}
      <Pet
        mood={mood}
        cell={4}
        onPet={() => {
          flashMood(mood === "sleep" ? "wave" : "happy", 1800);
          setTerm({ bubble: !bubble });
        }}
      />
    </div>
  );
}
