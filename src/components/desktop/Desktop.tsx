"use client";

import { useEffect, useRef, useState } from "react";
import { APPS, type AppId, scrollToSection, useOS } from "@/components/OSProvider";
import { useIsDesktop, useMounted } from "@/lib/hooks";
import NameType from "./NameType";
import Window, { type Rect } from "./Window";
import Dock from "./Dock";
import AppIcon, { type IconId } from "./AppIcon";
import ThemeTimeline from "@/components/chrome/ThemeTimeline";
import AboutApp from "@/components/apps/AboutApp";
import JourneyApp from "@/components/apps/JourneyApp";
import AwardsApp from "@/components/apps/AwardsApp";
import GalleryApp from "@/components/apps/GalleryApp";
import MailApp from "@/components/apps/MailApp";
import ChatApp from "@/components/apps/ChatApp";
import TerminalApp, { TerminalPet } from "@/components/apps/TerminalApp";
import { ArrowDown, Close } from "@/components/Icons";

const CONTENT: Record<AppId, () => React.ReactNode> = {
  about: () => <AboutApp />,
  terminal: () => <TerminalApp />,
  journey: () => <JourneyApp />,
  awards: () => <AwardsApp />,
  gallery: () => <GalleryApp />,
  mail: () => <MailApp />,
  chat: () => <ChatApp />,
};

// Window layout: journey top-left, awards top-right, about between them,
// terminal centred below. Sizes scale with the stage so overlap stays small.
function layout(W: number, H: number): Record<AppId, Rect> {
  const cx = W / 2;
  const pad = Math.round(W * 0.035);
  const jw = Math.min(540, Math.round(W * 0.35));
  const aw = Math.min(500, Math.round(W * 0.34));
  return {
    journey: { x: pad, y: Math.round(H * 0.09), w: jw, h: 330 },
    awards: { x: W - pad - aw, y: Math.round(H * 0.05), w: aw, h: 320 },
    about: { x: cx - 165, y: Math.round(H * 0.12), w: 330, h: 300 },
    terminal: { x: cx - 250, y: Math.round(H * 0.5), w: 500, h: Math.min(290, H * 0.5 - 130) },
    gallery: { x: cx - 360, y: Math.round(H * 0.08), w: 720, h: Math.min(460, H - 220) },
    mail: { x: cx + 40, y: Math.round(H * 0.1), w: 420, h: 400 },
    chat: { x: W - 420, y: Math.max(20, H - 590), w: 380, h: Math.min(470, H - 140) },
  };
}

const MOBILE_APPS: { icon: IconId; app?: AppId; label: string }[] = [
  { icon: "about", app: "about", label: "About" },
  { icon: "terminal", app: "terminal", label: "Terminal" },
  { icon: "journey", app: "journey", label: "Journey" },
  { icon: "awards", app: "awards", label: "Awards" },
  { icon: "gallery", app: "gallery", label: "Certificates" },
  { icon: "projects", label: "Projects" },
  { icon: "mail", app: "mail", label: "Contact" },
  { icon: "chat", app: "chat", label: "Ask Lele" },
];

export default function Desktop() {
  const mounted = useMounted();
  const isDesktop = useIsDesktop();
  const { booted } = useOS();
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const showWindows = mounted && isDesktop && size && booted;
  const rects = size ? layout(size.w, size.h) : null;

  return (
    <section id="top" className="desktop" aria-label="LELE.OS desktop">
      <div className="desktop__bg" aria-hidden>
        <span className="scanlines" />
        <span className="desktop__halo" />
      </div>
      <NameType />
      <div className="desktop__stage" ref={stageRef}>
        {showWindows &&
          rects &&
          (Object.keys(APPS) as AppId[]).map((id) => (
            <Window
              key={id}
              id={id}
              initial={rects[id]}
              bounds={size}
              className={`win--${id}`}
              accessory={id === "terminal" ? <TerminalPet /> : undefined}
            >
              {CONTENT[id]()}
            </Window>
          ))}
        {mounted && !isDesktop && <MobileHome />}
      </div>
      {mounted && isDesktop && <Dock />}
      {mounted && !isDesktop && <ThemeTimeline className="desktop__timeline" />}
      <button type="button" className="desktop__scroll mono" onClick={() => scrollToSection("about")}>
        <ArrowDown size={12} /> scroll to explore
      </button>
    </section>
  );
}

// rubens.design on phones: an app grid; each app opens as a full-screen sheet.
function MobileHome() {
  const { sheet, setSheet } = useOS();
  return (
    <>
      <ul className="homegrid">
        {MOBILE_APPS.map((a) => (
          <li key={a.icon}>
            <button
              type="button"
              className="homegrid__app"
              onClick={() => (a.app ? setSheet(a.app) : scrollToSection("projects"))}
            >
              <AppIcon id={a.icon} size={60} />
              <span>{a.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {sheet && (
        <div className="sheet-modal" role="dialog" aria-modal="true" aria-label={APPS[sheet].title}>
          <header className="sheet-modal__bar">
            <button type="button" onClick={() => setSheet(null)} className="sheet-modal__back">
              ‹ Home
            </button>
            <span className="win__title">{APPS[sheet].title}</span>
            <button type="button" onClick={() => setSheet(null)} aria-label="Close">
              <Close size={16} />
            </button>
          </header>
          {sheet === "terminal" && <TerminalPet />}
          <div className={`sheet-modal__body win--${sheet}`}>{CONTENT[sheet]()}</div>
        </div>
      )}
    </>
  );
}
