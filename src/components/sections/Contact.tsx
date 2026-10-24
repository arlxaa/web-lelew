"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/content/profile";
import { formatClock, useNow } from "@/lib/hooks";
import { scrollToSection } from "@/components/OSProvider";
import { SECTIONS } from "@/components/chrome/TopBar";
import { ArrowDown, ArrowRight } from "@/components/Icons";
import Pet from "@/components/Pet";
import { SectionHeader } from "./Reveal";

const CELLS = 24;

// bryangarage.dev showcase band (a command that "runs" as you scroll) +
// sibaldesign footer card with a slide-in message form.
export default function Contact() {
  const now = useNow();
  const bandRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const [chat, setChat] = useState(false);
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight * 0.7)));
        setFill(Math.round(p * CELLS));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = from ? `${msg}\n\n— ${from}` : msg;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hi Lele!")}&body=${encodeURIComponent(body)}`;
  };

  const done = fill >= CELLS;
  return (
    <section id="contact" className="sec contact">
      <div className="wrap">
        <SectionHeader index="07" title="Let's chat" />
      </div>
      <div className="band" ref={bandRef} data-done={done || undefined}>
        <p className="band__cmd mono">
          <span className="band__prompt">lele@os ~ %</span> contact --say-hi
          <span className="band__caret" aria-hidden />
        </p>
        <p className="band__status mono">
          <span className="band__bar" aria-hidden>
            {Array.from({ length: CELLS }, (_, i) => (
              <i key={i} data-on={i < fill || undefined} />
            ))}
          </span>
          {done ? "ready ✓" : (
            <>
              scroll to run <ArrowDown size={11} />
            </>
          )}
        </p>
      </div>

      <footer className="foot wrap">
        <div className="foot__ghost" aria-hidden>
          LELE.OS
        </div>
        <div className="foot__card panel" data-chat={chat || undefined}>
          {!chat ? (
            <>
              <div className="foot__lead">
                <p className="foot__k mono">LELE.OS // EST.{profile.since}</p>
                <h3 className="foot__title">Let&apos;s build something.</h3>
                <p className="foot__sub mono">
                  {profile.role} · {profile.school}
                  <br />
                  {profile.now.title} @ {profile.now.place} · {profile.location}
                </p>
                <button type="button" className="btn-ghost foot__cta" onClick={() => setChat(true)}>
                  Let&apos;s chat <ArrowRight size={14} />
                </button>
              </div>
              <div className="foot__cols">
                <div>
                  <p className="foot__h mono">Site</p>
                  <ul>
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <button type="button" onClick={() => scrollToSection(s.id)}>
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="foot__h mono">Connect</p>
                  <ul>
                    {socials.map((s) => (
                      <li key={s.id}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href={`mailto:${profile.email}`}>Email</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="foot__h mono">Mail</p>
                  <ul>
                    <li>
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    </li>
                    <li>
                      <a href={`mailto:${profile.emailAlt}`}>{profile.emailAlt}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <form className="foot__chat" onSubmit={send}>
              <button type="button" className="foot__back mono" onClick={() => setChat(false)}>
                ← Back
              </button>
              <p className="foot__title">Help me, help you.</p>
              <p className="foot__note">Now that you know more about me, tell me what you&apos;re working on.</p>
              <div className="foot__form">
                <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name" aria-label="Your name" />
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What are you working on?" rows={3} required aria-label="Message" />
                <button type="submit" className="btn-primary" aria-label="Send">
                  Send <ArrowRight size={14} />
                </button>
              </div>
              <p className="foot__alt mono">Opens your mail app · or write to {profile.email}</p>
            </form>
          )}
          <div className="foot__base mono">
            <span className="foot__status">
              <span className="dot" /> Status: online
            </span>
            <span>© 2026 {profile.name}</span>
            <span className="foot__spacer" />
            <span className="foot__pet">
              <Pet mood="sleep" cell={2} />
            </span>
            <span suppressHydrationWarning>{formatClock(now, profile.timezone, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
