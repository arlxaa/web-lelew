"use client";

import Image from "next/image";
import { useState } from "react";
import { achievements, firstCertificateOf, TRACK_LABEL, type AwardTrack } from "@/content/achievements";
import { useOS } from "@/components/OSProvider";
import Reveal, { SectionHeader } from "./Reveal";

const TABS: ("all" | AwardTrack)[] = ["all", "tech", "sport"];

// rubens.design awards.xls (spreadsheet) + sibaldesign frame preview.
export default function Achievements() {
  const { openGallery } = useOS();
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [sel, setSel] = useState(0);
  const [shot, setShot] = useState(0);
  const rows = achievements.map((a, i) => ({ a, i })).filter(({ a }) => tab === "all" || a.track === tab);
  const cur = achievements[sel];
  const src = cur.certificates[shot] ?? cur.certificates[0];

  return (
    <section id="achievements" className="sec achievements">
      <div className="wrap">
        <SectionHeader index="04" title="Achievements" lede="Competitions on the screen and on the mat." />
        <Reveal className="ach">
          <div className="ach__sheet panel">
            <div className="panel__tag">
              <span>achievements.xls</span>
              <span className="panel__tag-r">{rows.length} rows</span>
            </div>
            <div className="formula">
              <span className="formula__ref">B{sel + 2} ▾</span>
              <span className="formula__fx">fx</span>
              <span className="formula__val">{cur.org}</span>
            </div>
            <div className="ach__scroll">
              <table className="sheet sheet--wide">
                <thead>
                  <tr className="sheet__head">
                    <th className="sheet__num">#</th>
                    <th>Date</th>
                    <th>Award</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ a, i }) => (
                    <tr
                      key={a.title}
                      aria-selected={sel === i}
                      tabIndex={0}
                      onClick={() => {
                        setSel(i);
                        setShot(0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSel(i);
                          setShot(0);
                        }
                      }}
                    >
                      <td className="sheet__num">{i + 1}</td>
                      <td className="mono">{a.date}</td>
                      <td>{a.event}</td>
                      <td>
                        <span className={/1st|gold/i.test(a.rank) ? "rank rank--top" : "rank"}>{a.rank}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sheet-tabs" role="tablist">
              {TABS.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={tab === t} className="sheet-tabs__tab" onClick={() => setTab(t)}>
                  {t === "all" ? "All" : TRACK_LABEL[t]}
                </button>
              ))}
            </div>
          </div>

          <figure className="ach__frame panel">
            <div className="panel__tag">
              <span>FR.{String(sel + 1).padStart(2, "0")} · {src.split("/").pop()}</span>
              {cur.certificates.length > 1 && (
                <span className="panel__tag-r">
                  {cur.certificates.map((c, i) => (
                    <button key={c} type="button" aria-pressed={shot === i} className="ach__pip" onClick={() => setShot(i)}>
                      {i + 1}
                    </button>
                  ))}
                </span>
              )}
            </div>
            <button type="button" className="ach__img" onClick={() => openGallery(firstCertificateOf(sel) + shot)} aria-label="Open certificate viewer">
              <Image key={src} src={src} alt={`Certificate: ${cur.title}`} fill sizes="(min-width: 960px) 460px, 100vw" />
            </button>
            <figcaption className="ach__cap">
              <span className="ach__rank">{cur.rank}</span>
              <span>{cur.event}</span>
              <span className="mono">{cur.date}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
