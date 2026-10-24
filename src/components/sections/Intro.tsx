"use client";

import { Fragment } from "react";
import { profile, statement, statementNote, stats, type StatementPart } from "@/content/profile";
import { formatClock, useNow } from "@/lib/hooks";
import { useOS } from "@/components/OSProvider";
import { ArrowUpRight, Lock } from "@/components/Icons";
import Reveal from "./Reveal";

// Glue punctuation right after a keyword onto it, so "Security." never
// breaks before the dot.
type Part = string | (Exclude<StatementPart, string> & { tail: string });
const PARTS: Part[] = statement.map((part, i) => {
  const next = statement[i + 1];
  if (typeof part === "string") {
    const prev = statement[i - 1];
    return prev && typeof prev !== "string" ? part.replace(/^[.,;:!?]+/, "") : part;
  }
  return { ...part, tail: typeof next === "string" ? (next.match(/^[.,;:!?]+/)?.[0] ?? "") : "" };
});

// bryangarage.dev hero: a long sentence, dimmed, with key words lit up. Words
// blur in one by one; hovering a peek link blurs the rest of the sentence.
export default function Intro() {
  const now = useNow();
  const { launch, askLele } = useOS();
  let w = 0;
  const word = (text: string, key: string) =>
    text.split(/(\s+)/).filter(Boolean).map((t, i) =>
      /^\s+$/.test(t) ? (
        t
      ) : (
        <span key={`${key}-${i}`} className="bw" style={{ ["--i" as string]: w++ }}>
          {t}
        </span>
      ),
    );

  return (
    <section id="about" className="sec intro">
      <span className="scanlines" aria-hidden />
      <div className="intro__grid">
        <Reveal className="intro__main" threshold={0.3}>
          <span className="sec-kicker">01 · About</span>
          <p className="intro__lede">
            <span className="bw intro__brand" style={{ ["--i" as string]: w++ }}>
              LELE.OS
            </span>{" "}
            {word(`by ${profile.name}.`, "by")}{" "}
            {PARTS.map((part, pi) =>
              typeof part === "string" ? (
                <Fragment key={pi}>{word(part, `s${pi}`)}</Fragment>
              ) : part.peek ? (
                <span key={pi} className="bw peek-wrap" style={{ ["--i" as string]: w++ }}>
                  <a className="intro__key peek-link" href="#journey">
                    {part.key}
                    <span className="peek" aria-hidden>
                      <span className="peek__bar">
                        <span className="peek__dot" />
                        <span className="peek__path">{part.peek.path}</span>
                        <span className="peek__state">
                          <Lock size={10} />
                          {part.peek.state}
                        </span>
                      </span>
                      <span className="peek__body">
                        <span className="peek__title">{part.peek.title}</span>
                        <span className="peek__row">
                          <span>{part.peek.meta}</span>
                          <span className="peek__stat">{part.peek.stat}</span>
                        </span>
                      </span>
                    </span>
                  </a>
                  {part.tail}
                </span>
              ) : (
                <span key={pi} className="bw intro__key" style={{ ["--i" as string]: w++ }}>
                  {part.key}
                  <span className="intro__tail">{part.tail}</span>
                </span>
              ),
            )}
          </p>
          <p className="intro__note">{statementNote}</p>
          <ul className="stats">
            {stats.map((s) => (
              <li key={s.label}>
                <span className="stats__value">{s.value}</span>
                <span className="stats__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <aside className="readout" aria-label="Status">
          <p className="readout__meta mono" suppressHydrationWarning>
            <b>{formatClock(now, profile.timezone, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</b>
            <span> · {profile.timezone.toUpperCase()}</span>
          </p>
          <p className="readout__now mono">
            <span className="dot" /> {profile.now.title} @ {profile.now.place}
          </p>
          <div className="readout__controls">
            <button type="button" onClick={() => launch("terminal")}>
              <span>Open terminal</span>
              <span className="readout__accent">&gt;_</span>
            </button>
            <button type="button" onClick={() => askLele()}>
              <span>Ask Lele</span>
              <span className="readout__accent">?</span>
            </button>
            <a href={`mailto:${profile.email}`}>
              <span className="readout__u">Say hi</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
          <p className="readout__sign" aria-label="Signature">
            Lele
          </p>
        </aside>
      </div>
    </section>
  );
}
