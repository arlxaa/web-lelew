"use client";

import { useRef } from "react";
import { APPS, type AppId, scrollToSection, useOS } from "@/components/OSProvider";
import AppIcon, { type IconId } from "./AppIcon";
import Pet from "@/components/Pet";

const ITEMS: { icon: IconId; app?: AppId; label: string }[] = [
  { icon: "about", app: "about", label: "About" },
  { icon: "terminal", app: "terminal", label: "Terminal" },
  { icon: "journey", app: "journey", label: "Journey" },
  { icon: "awards", app: "awards", label: "Awards" },
  { icon: "gallery", app: "gallery", label: "Certificates" },
  { icon: "projects", label: "Projects" },
  { icon: "mail", app: "mail", label: "Contact" },
];

const BASE = 46;
const MAX_EXTRA = 0.42;
const RANGE = 130;

// macOS-style magnification, written straight to CSS vars (no re-render).
export default function Dock() {
  const { windows, activeApp, openApp, minimizeApp, askLele } = useOS();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    ref.current?.querySelectorAll<HTMLElement>(".dock__item").forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = 1 + MAX_EXTRA * Math.max(0, Math.cos(Math.min(d / RANGE, 1) * (Math.PI / 2)));
      el.style.setProperty("--s", s.toFixed(3));
    });
  };
  const onLeave = () => {
    ref.current?.querySelectorAll<HTMLElement>(".dock__item").forEach((el) => el.style.setProperty("--s", "1"));
  };

  const click = (item: (typeof ITEMS)[number]) => {
    if (!item.app) {
      scrollToSection("projects");
      return;
    }
    if (activeApp === item.app) minimizeApp(item.app);
    else openApp(item.app);
  };

  return (
    <div className="dock-wrap">
      <div className="dock" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} role="toolbar" aria-label="Dock">
        {ITEMS.map((item) => {
          const running = item.app && windows[item.app].open;
          return (
            <button
              key={item.icon}
              type="button"
              className="dock__item"
              data-running={running || undefined}
              onClick={() => click(item)}
              aria-label={item.app ? `${APPS[item.app].label}` : item.label}
            >
              <AppIcon id={item.icon} size={BASE} />
              <span className="dock__tip" aria-hidden>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="chat-orb"
        aria-label="Ask Lele"
        data-running={windows.chat.open || undefined}
        onClick={() => askLele()}
      >
        <span className="chat-orb__halo" aria-hidden />
        <Pet mood="idle" cell={2} label="Ask Lele" />
      </button>
    </div>
  );
}
