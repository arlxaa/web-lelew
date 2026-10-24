"use client";

import { useState } from "react";
import { achievements, firstCertificateOf } from "@/content/achievements";
import { useOS } from "@/components/OSProvider";

// achievements.xls: rubens.design's awards spreadsheet. Click a row to put
// it in the formula bar; double-click (or the button) opens the certificate.
export default function AwardsApp() {
  const { openGallery } = useOS();
  const [sel, setSel] = useState(0);
  const a = achievements[sel];

  return (
    <div className="app app--sheet">
      <div className="formula">
        <span className="formula__ref">B{sel + 2} ▾</span>
        <span className="formula__fx">fx</span>
        <span className="formula__val">{a.title}</span>
      </div>
      <div className="app__scroll">
        <table className="sheet">
          <thead>
            <tr>
              <th className="sheet__num" />
              <th>A</th>
              <th>B</th>
              <th>C</th>
            </tr>
            <tr className="sheet__head">
              <th className="sheet__num">1</th>
              <th>Date</th>
              <th>Award</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((row, i) => (
              <tr
                key={row.title}
                aria-selected={sel === i}
                onClick={() => setSel(i)}
                onDoubleClick={() => openGallery(firstCertificateOf(i))}
              >
                <td className="sheet__num">{i + 2}</td>
                <td>{row.date}</td>
                <td>{row.event}</td>
                <td>{row.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="sheet-tabs">
        <span className="sheet-tabs__tab">Sheet1</span>
        <button type="button" className="sheet-tabs__open" onClick={() => openGallery(firstCertificateOf(sel))}>
          View certificate ↗
        </button>
        <span className="sheet-tabs__count">{achievements.length} awards</span>
      </footer>
    </div>
  );
}
