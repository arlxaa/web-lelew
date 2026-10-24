"use client";

import { useEffect, useRef, useState } from "react";
import { formatMonth, journey, KIND_LABEL, organizations } from "@/content/journey";
import { useNow } from "@/lib/hooks";
import Reveal, { SectionHeader } from "./Reveal";

const START = 2017;
const END = 2028;
const LANE_H = 52;

const toYears = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y + (m - 1) / 12;
};

// bryangarage.dev career timeline (drag to scroll) + sibaldesign log rows.
export default function Journey() {
  const now = useNow();
  const scrollRef = useRef<HTMLDivElement>(null);
  const nowYears = now ? new Date(now).getFullYear() + new Date(now).getMonth() / 12 : 2026.8;
  const lanes = Math.max(...journey.map((j) => j.lane)) + 1;
  // Fit every year on wide screens; scroll (and drag) on narrow ones.
  const [YEAR_W, setYearW] = useState(150);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setYearW(Math.max(90, Math.min(150, (e.contentRect.width - 120) / (END - START)))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start scrolled to the present; drag to pan.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    let drag: { x: number; left: number } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: el.scrollLeft };
      el.classList.add("is-dragging");
    };
    const move = (e: PointerEvent) => {
      if (drag) el.scrollLeft = drag.left - (e.clientX - drag.x);
    };
    const up = () => {
      drag = null;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);
  return (
    <section id="journey" className="sec journey">
      <div className="wrap">
        <SectionHeader index="03" title="Journey" lede="School, clubs, the mat, and localhost." />
      </div>

      <div className="tl" ref={scrollRef}>
        <div className="tl__track" style={{ width: (END - START) * YEAR_W + 80, height: 44 + lanes * LANE_H }}>
          {years.map((y) => (
            <span key={y} className="tl__tick" style={{ left: (y - START) * YEAR_W }}>
              <span>{y}</span>
            </span>
          ))}
          <span className="tl__now" style={{ left: (nowYears - START) * YEAR_W }}>
            <span className="tl__now-dot" />
          </span>
          {journey.map((j) => {
            const a = toYears(j.start);
            const b = j.end ? toYears(j.end) : nowYears;
            return (
              <div
                key={j.id}
                className="tl__bar"
                data-live={!j.end || undefined}
                data-kind={j.kind}
                style={{ left: (a - START) * YEAR_W, width: Math.max(96, (b - a) * YEAR_W), top: 44 + j.lane * LANE_H }}
                tabIndex={0}
              >
                <span className="tl__bar-main">{j.short}</span>
                <span className="tl__bar-sub">{j.role}</span>
                <span className="tl__pop" role="tooltip">
                  <b>{j.role}</b>
                  <span>{j.org}</span>
                  <span className="mono">
                    {formatMonth(j.start)} – {j.end ? formatMonth(j.end) : "now"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="wrap tl__hint mono">drag or swipe · hover a bar</p>

      <div className="wrap">
        <Reveal as="ol" className="logs">
          {journey.map((j, i) => (
            <li key={j.id} className="logs__row" style={{ ["--i" as string]: i }}>
              <div className="logs__date mono">
                <b>{formatMonth(j.start)}</b>
                <span>— {j.end ? formatMonth(j.end) : "Present"}</span>
              </div>
              <div className="logs__body">
                <h3 className="logs__role">{j.role}</h3>
                <p className="logs__org mono">{j.org}</p>
                <ul className="logs__points">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="logs__side mono">
                <span>{KIND_LABEL[j.kind]}</span>
                <span className="logs__idx">{String(journey.length - i).padStart(2, "0")}</span>
              </div>
            </li>
          ))}
        </Reveal>
        <Reveal className="orgs">
          <span className="sec-kicker">Also part of</span>
          <ul>
            {organizations.map((o) => (
              <li key={o} className="chip">
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
