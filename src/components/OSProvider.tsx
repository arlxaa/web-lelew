"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeId, isThemeId } from "@/lib/themes";

export type AppId = "about" | "terminal" | "journey" | "awards" | "gallery" | "mail" | "chat";

export const APPS: Record<AppId, { title: string; label: string }> = {
  about: { title: "about_me.txt", label: "About" },
  terminal: { title: "lele — zsh", label: "Terminal" },
  journey: { title: "journey.log", label: "Journey" },
  awards: { title: "achievements.xls", label: "Awards" },
  gallery: { title: "certificates.exe", label: "Certificates" },
  mail: { title: "message.eml", label: "Contact" },
  chat: { title: "Ask Lele", label: "Ask Lele" },
};

type WinMeta = { open: boolean; minimized: boolean; z: number };
type Windows = Record<AppId, WinMeta>;

const initialWindows = (): Windows => {
  const open: AppId[] = ["journey", "about", "awards", "terminal"];
  return Object.fromEntries(
    (Object.keys(APPS) as AppId[]).map((id) => [
      id,
      { open: open.includes(id), minimized: false, z: open.indexOf(id) + 1 },
    ]),
  ) as Windows;
};

type OS = {
  theme: ThemeId;
  setTheme: (t: ThemeId, origin?: { x: number; y: number }) => void;
  windows: Windows;
  activeApp: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  sheet: AppId | null;
  setSheet: (id: AppId | null) => void;
  galleryIndex: number;
  openGallery: (index: number) => void;
  setGalleryIndex: (index: number) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  chatSeed: { text: string; n: number } | null;
  askLele: (question?: string) => void;
  booted: boolean;
  setBooted: () => void;
  launch: (id: AppId) => void;
};

const OSContext = createContext<OS | null>(null);

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used inside <OSProvider>");
  return ctx;
}

// Theme and boot state live on <html data-theme data-boot> (set before paint),
// so React reads them as an external store and hydrates without mismatches.
function subscribeHtml(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-boot"] });
  return () => mo.disconnect();
}
const readTheme = (): ThemeId => {
  const t = document.documentElement.dataset.theme;
  return isThemeId(t) ? t : DEFAULT_THEME;
};
const readBooted = () => document.documentElement.dataset.boot === "done";

export function OSProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeHtml, readTheme, () => DEFAULT_THEME);
  const booted = useSyncExternalStore(subscribeHtml, readBooted, () => false);
  const [windows, setWindows] = useState<Windows>(initialWindows);
  const [sheet, setSheet] = useState<AppId | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatSeed, setChatSeed] = useState<{ text: string; n: number } | null>(null);

  const setTheme = useCallback((next: ThemeId, origin?: { x: number; y: number }) => {
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => flushSync(apply));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  const topZ = (w: Windows) => Math.max(0, ...Object.values(w).map((m) => m.z));

  const focusApp = useCallback((id: AppId) => {
    setWindows((w) => {
      const z = topZ(w);
      if (w[id].z === z && w[id].open && !w[id].minimized) return w;
      return { ...w, [id]: { ...w[id], z: z + 1 } };
    });
  }, []);
  const openApp = useCallback((id: AppId) => {
    setWindows((w) => ({ ...w, [id]: { open: true, minimized: false, z: topZ(w) + 1 } }));
  }, []);
  const closeApp = useCallback((id: AppId) => {
    setWindows((w) => ({ ...w, [id]: { ...w[id], open: false, minimized: false } }));
  }, []);
  const minimizeApp = useCallback((id: AppId) => {
    setWindows((w) => ({ ...w, [id]: { ...w[id], minimized: true } }));
  }, []);

  // Desktop opens a window; small screens open a full-screen sheet. If the
  // visitor scrolled away, bring the desktop back into view first.
  const launch = useCallback(
    (id: AppId) => {
      if (window.matchMedia("(min-width: 960px)").matches) {
        openApp(id);
        if (window.scrollY > window.innerHeight * 0.5) window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSheet(id);
      }
    },
    [openApp],
  );

  const openGallery = useCallback(
    (index: number) => {
      setGalleryIndex(index);
      launch("gallery");
    },
    [launch],
  );

  const askLele = useCallback(
    (question?: string) => {
      if (question) setChatSeed((s) => ({ text: question, n: (s?.n ?? 0) + 1 }));
      launch("chat");
    },
    [launch],
  );

  const setBooted = useCallback(() => {
    document.documentElement.dataset.boot = "done";
  }, []);

  const activeApp = useMemo(() => {
    let best: AppId | null = null;
    let z = -1;
    (Object.keys(windows) as AppId[]).forEach((id) => {
      const m = windows[id];
      if (m.open && !m.minimized && m.z > z) {
        z = m.z;
        best = id;
      }
    });
    return best;
  }, [windows]);

  const value = useMemo<OS>(
    () => ({
      theme, setTheme, windows, activeApp, openApp, closeApp, minimizeApp, focusApp,
      sheet, setSheet, galleryIndex, openGallery, setGalleryIndex,
      paletteOpen, setPaletteOpen, chatSeed, askLele, booted, setBooted, launch,
    }),
    [theme, setTheme, windows, activeApp, openApp, closeApp, minimizeApp, focusApp, sheet,
      galleryIndex, openGallery, paletteOpen, chatSeed, askLele, booted, setBooted, launch],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
