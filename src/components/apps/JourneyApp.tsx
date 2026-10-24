"use client";

import { useState } from "react";
import { journey, organizations } from "@/content/journey";

const yy = (ym: string) => ym.slice(0, 4);

// journey.log: rubens.design's experience.log, mono rows with [ACTIVE]/[CLOSED].
export default function JourneyApp() {
  const [tab, setTab] = useState<"experience" | "orgs">("experience");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="app app--journey">
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "experience"} onClick={() => setTab("experience")}>
          Experience
        </button>
        <button type="button" role="tab" aria-selected={tab === "orgs"} onClick={() => setTab("orgs")}>
          Organizations
        </button>
      </div>
      <div className="app__scroll">
        {tab === "experience" ? (
          <ol className="log">
            {journey.map((j, i) => {
              const active = !j.end;
              return (
                <li key={j.id}>
                  <button
                    type="button"
                    className="log__row"
                    aria-expanded={open === j.id}
                    onClick={() => setOpen(open === j.id ? null : j.id)}
                  >
                    <span className="log__idx">{String(i + 1).padStart(2, "0")} &gt;</span>
                    <span className="log__range">[{yy(j.start)}-{active ? "NOW" : yy(j.end!)}]</span>
                    <span className="log__what">
                      <b>{j.short}</b> · {j.role}
                    </span>
                    <span className={`log__tag ${active ? "is-active" : ""}`}>[{active ? "ACTIVE" : "CLOSED"}]</span>
                    <span className="log__chev" aria-hidden>
                      ›
                    </span>
                  </button>
                  {open === j.id && (
                    <div className="log__detail">
                      <p>{j.org}</p>
                      <ul>
                        {j.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <pre className="tree">
            <span className="tree__head">C:\LELE\ORGANIZATIONS</span>
            {"\n"}
            {organizations.map((o, i) => `${i === organizations.length - 1 ? "└── " : "├── "}${o.toUpperCase()}`).join("\n")}
          </pre>
        )}
      </div>
      <footer className="statusbar">
        <span>{journey.length} entries</span>
        <span>since 2017</span>
      </footer>
    </div>
  );
}
