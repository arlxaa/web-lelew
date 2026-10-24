"use client";

import { useState } from "react";
import { about, profile } from "@/content/profile";

type Align = "left" | "center" | "right";

// about_me.txt: a tiny text editor. The bio is editable (just for fun) and the
// toolbar really changes it, like rubens.design.
export default function AboutApp() {
  const [large, setLarge] = useState(false);
  const [fmt, setFmt] = useState({ bold: false, italic: false, underline: false });
  const [align, setAlign] = useState<Align>("left");
  const [words, setWords] = useState(about.bio.split(/\s+/).length);

  const toggle = (k: keyof typeof fmt) => setFmt((f) => ({ ...f, [k]: !f[k] }));

  return (
    <div className="app app--about">
      <div className="toolbar" role="toolbar" aria-label="Text formatting">
        <div className="toolbar__group">
          <button type="button" className="toolbar__btn" aria-pressed={!large} onClick={() => setLarge(false)} title="Small text">
            A
          </button>
          <button type="button" className="toolbar__btn toolbar__btn--lg" aria-pressed={large} onClick={() => setLarge(true)} title="Large text">
            A
          </button>
        </div>
        <span className="toolbar__sep" />
        <div className="toolbar__group">
          <button type="button" className="toolbar__btn" aria-pressed={fmt.bold} onClick={() => toggle("bold")} title="Bold">
            <b>B</b>
          </button>
          <button type="button" className="toolbar__btn" aria-pressed={fmt.italic} onClick={() => toggle("italic")} title="Italic">
            <i>I</i>
          </button>
          <button type="button" className="toolbar__btn" aria-pressed={fmt.underline} onClick={() => toggle("underline")} title="Underline">
            <u>U</u>
          </button>
        </div>
        <span className="toolbar__sep" />
        <div className="toolbar__group">
          {(["left", "center", "right"] as Align[]).map((a) => (
            <button key={a} type="button" className="toolbar__btn" aria-pressed={align === a} onClick={() => setAlign(a)} title={`Align ${a}`}>
              <span className={`align-icon align-icon--${a}`} aria-hidden>
                <i />
                <i />
                <i />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="app__scroll">
        <p className="about__name">
          {profile.name} <span>· {profile.now.title} @ {profile.now.place}</span>
        </p>
        <p
          className="about__bio"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          aria-label="Bio (editable)"
          onInput={(e) => setWords((e.currentTarget.textContent ?? "").trim().split(/\s+/).filter(Boolean).length)}
          style={{
            fontSize: large ? 17 : 14,
            fontWeight: fmt.bold ? 650 : undefined,
            fontStyle: fmt.italic ? "italic" : undefined,
            textDecoration: fmt.underline ? "underline" : undefined,
            textAlign: align,
          }}
        >
          {about.bio}
        </p>
        <ul className="about__tags">
          {about.interests.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <footer className="statusbar">
        <span>{words} words</span>
        <span>Modified: Oct 2026 · INS · UTF-8</span>
      </footer>
    </div>
  );
}
