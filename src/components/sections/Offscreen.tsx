import { useId } from "react";
import { offscreen, offscreenText, type OffItem, type OffRow } from "@/content/offscreen";
import { socials } from "@/content/profile";
import { ArrowUpRight, SocialIcon } from "@/components/Icons";
import Reveal, { SectionHeader } from "./Reveal";

/**
 * mineenim.vercel.app "about" rows: numbered labels, giant display words whose
 * letters roll into a second face on hover, alternating outline words, a
 * looping marquee row, and a small animated illustration per row.
 */
const spotify = socials.find((s) => s.id === "spotify");

export default function Offscreen() {
  return (
    <section id="offscreen" className="sec off">
      <div className="wrap">
        <SectionHeader index="06" title="Off screen" lede="What I do when the laptop is closed." />
        <p className="sr-only">{offscreenText}</p>
        <Reveal className="off__rows" aria-hidden threshold={0.1}>
          {offscreen.map((row, i) => (
            <div key={row.label} className={`off__row${row.loop ? " off__row--loop" : ""}`} style={{ ["--i" as string]: i }}>
              <span className="off__label mono">
                <b>{String(i + 1).padStart(2, "0")}</b>
                {row.label}
              </span>
              <span className="off__ill">
                <span className="off__ill-in">
                  <Illustration kind={row.ill} />
                </span>
              </span>
              <div className="off__words">
                {row.loop ? (
                  <span className="off__strip">
                    <span className="off__track">
                      {[0, 1].map((k) => (
                        <span key={k} className="off__set">
                          <Units row={row} />
                          <span className="off__sep" />
                        </span>
                      ))}
                    </span>
                  </span>
                ) : (
                  <Units row={row} />
                )}
              </div>
            </div>
          ))}
        </Reveal>
        {spotify && (
          <a className="off__spotify btn-ghost" href={spotify.href} target="_blank" rel="noopener noreferrer">
            <SocialIcon id="spotify" size={16} /> Listen along on Spotify <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </section>
  );
}

function Units({ row }: { row: OffRow }) {
  return row.items.map((item, n) => (
    <span key={item.text} className="off__unit">
      {n > 0 && (row.loop ? <span className="off__sep" /> : <span className="off__and">&amp;</span>)}
      <Item item={item} />
    </span>
  ));
}

// Every letter is two stacked faces; hovering the item rolls them up one by one.
function Item({ item }: { item: OffItem }) {
  let c = 0;
  return (
    <span className="off__item">
      {item.text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 && " "}
          <span className="off__word">
            {[...word].map((ch, j) => (
              <span key={j} className="off__ch" style={{ ["--c" as string]: c++ }}>
                <span>{ch}</span>
                <span className="off__alt">{ch}</span>
              </span>
            ))}
          </span>
        </span>
      ))}
      {item.sub && <span className="off__sub mono">{item.sub}</span>}
    </span>
  );
}

function Illustration({ kind }: { kind: OffRow["ill"] }) {
  if (kind === "swim") return <SwimIll />;
  if (kind === "matcha") return <MatchaIll />;
  return <MusicIll />;
}

// Swim ring bobbing on the water, with sleepy z's: swimming + sleeping.
function SwimIll() {
  const id = useId().replace(/[^\w-]/g, "");
  return (
    <svg className="ill" viewBox="0 0 200 200" fill="none">
      <defs>
        <clipPath id={`${id}-ring`}>
          <path fillRule="evenodd" d="M100 46a50 50 0 1 1 0 100a50 50 0 1 1 0-100zM100 74a22 22 0 1 0 0 44a22 22 0 1 0 0-44z" />
        </clipPath>
        <clipPath id={`${id}-pool`}>
          <rect x="16" y="128" width="168" height="56" rx="28" />
        </clipPath>
      </defs>
      <text className="sw-z" x="138" y="52" fontSize="22">z</text>
      <text className="sw-z sw-z2" x="154" y="34" fontSize="16">z</text>
      <text className="sw-z sw-z3" x="166" y="20" fontSize="12">z</text>
      <g clipPath={`url(#${id}-pool)`}>
      <g className="sw-wave">
        <path className="ill-s ill-blue" d="M-40 150c15-10 25-10 40 0s25 10 40 0 25-10 40 0 25 10 40 0 25-10 40 0 25 10 40 0 25-10 40 0V200H-40z" />
        <path className="ill-n" d="M-40 166c15-8 25-8 40 0s25 8 40 0 25-8 40 0 25 8 40 0 25-8 40 0 25 8 40 0 25-8 40 0" stroke="var(--ill-blue-light)" strokeWidth="4" strokeLinecap="round" />
      </g>
      </g>
      <rect className="ill-n" x="16" y="128" width="168" height="56" rx="28" stroke="var(--ill-ink)" strokeWidth="4" />
      <g className="sw-bob">
        <path className="ill-s ill-orange" fillRule="evenodd" d="M100 46a50 50 0 1 1 0 100a50 50 0 1 1 0-100zM100 74a22 22 0 1 0 0 44a22 22 0 1 0 0-44z" />
        <g clipPath={`url(#${id}-ring)`}>
          <circle cx="100" cy="96" r="36" stroke="var(--ill-cream)" strokeWidth="30" strokeDasharray="28.3 28.3" transform="rotate(-20 100 96)" />
        </g>
        <path className="ill-n" fillRule="evenodd" d="M100 46a50 50 0 1 1 0 100a50 50 0 1 1 0-100zM100 74a22 22 0 1 0 0 44a22 22 0 1 0 0-44z" stroke="var(--ill-ink)" strokeWidth="4" />
        <path className="ill-n" d="M70 60c8-7 18-10 28-10" stroke="var(--ill-cream)" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      </g>
    </svg>
  );
}

// Iced matcha latte: matcha poured over milk.
function MatchaIll() {
  const id = useId().replace(/[^\w-]/g, "");
  const glass = "M58 48h84l-11 132a8 8 0 0 1-8 7H77a8 8 0 0 1-8-7z";
  return (
    <svg className="ill" viewBox="0 0 200 200" fill="none">
      <defs>
        <clipPath id={`${id}-glass`}>
          <path d={glass} />
        </clipPath>
      </defs>
      <path className="ill-s" d="M112 18l-14 66" stroke="var(--ill-ink)" strokeWidth="14" />
      <path d="M112 18l-14 66" stroke="var(--ill-lilac)" strokeWidth="6" strokeLinecap="round" />
      <path d={glass} fill="var(--ill-cream)" opacity=".35" />
      <g clipPath={`url(#${id}-glass)`}>
        <rect x="40" y="112" width="120" height="90" fill="var(--ill-milk)" />
        <path className="mt-swirl" d="M0 116c12-7 22-7 34 0s22 7 34 0 22-7 34 0 22 7 34 0 22-7 34 0 22 7 34 0 22-7 34 0V60H0z" fill="var(--ill-green)" />
        <path className="mt-swirl" d="M0 116c12-7 22-7 34 0s22 7 34 0 22-7 34 0 22 7 34 0 22-7 34 0 22 7 34 0 22-7 34 0" stroke="var(--ill-green-dark)" strokeWidth="4" />
        <rect className="mt-ice" x="72" y="62" width="26" height="24" rx="6" fill="var(--ill-cream)" opacity=".75" stroke="var(--ill-ink)" strokeWidth="3" />
        <rect className="mt-ice mt-ice2" x="104" y="76" width="22" height="22" rx="6" fill="var(--ill-cream)" opacity=".75" stroke="var(--ill-ink)" strokeWidth="3" />
      </g>
      <path className="ill-n" d={glass} stroke="var(--ill-ink)" strokeWidth="4" strokeLinejoin="round" />
      <path className="ill-n" d="M66 60l9 110" stroke="var(--ill-cream)" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      <path className="mt-leaf ill-s ill-green" d="M150 120c22-14 34-4 36 6-16 8-30 8-36-6z" />
      <path className="mt-leaf ill-n" d="M152 121c10 1 20 3 32 5" stroke="var(--ill-ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Headphones with notes drifting off.
function MusicIll() {
  return (
    <svg className="ill" viewBox="0 0 200 200" fill="none">
      <g className="mu-note">
        <path className="ill-n" d="M44 70V36l22-6v30" stroke="var(--ill-cream)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse className="ill-s ill-cream" cx="38" cy="72" rx="8" ry="6" />
        <ellipse className="ill-s ill-cream" cx="60" cy="62" rx="8" ry="6" />
      </g>
      <g className="mu-note mu-note2">
        <path className="ill-n" d="M160 40v-26" stroke="var(--ill-cream)" strokeWidth="4" strokeLinecap="round" />
        <path className="ill-n" d="M160 14c8 2 12 8 12 14" stroke="var(--ill-cream)" strokeWidth="4" strokeLinecap="round" />
        <ellipse className="ill-s ill-yellow" cx="154" cy="42" rx="8" ry="6" />
      </g>
      <g className="mu-band">
        <path className="ill-n" d="M42 130c0-70 116-70 116 0" stroke="var(--ill-ink)" strokeWidth="16" strokeLinecap="round" />
        <path className="ill-n" d="M42 130c0-70 116-70 116 0" stroke="var(--ill-orange)" strokeWidth="8" strokeLinecap="round" />
        <rect className="ill-s ill-orange" x="26" y="112" width="34" height="58" rx="16" />
        <rect className="ill-s ill-lilac" x="50" y="120" width="14" height="42" rx="7" />
        <rect className="ill-s ill-orange" x="140" y="112" width="34" height="58" rx="16" />
        <rect className="ill-s ill-lilac" x="136" y="120" width="14" height="42" rx="7" />
      </g>
    </svg>
  );
}
