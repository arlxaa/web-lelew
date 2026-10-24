"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsDesktop = () => useMediaQuery("(min-width: 960px)", true);

const noop = () => () => {};
export const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

// One shared 1s ticker for every clock on the page.
let now = 0;
let timer: number | undefined;
const listeners = new Set<() => void>();
function subscribeClock(cb: () => void) {
  listeners.add(cb);
  if (timer === undefined) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
/** Epoch ms, updated every second. 0 during SSR / before mount. */
export const useNow = () =>
  useSyncExternalStore(
    subscribeClock,
    () => now,
    () => 0,
  );

export function formatClock(ms: number, timeZone: string, opts: Intl.DateTimeFormatOptions) {
  if (!ms) return "--:--";
  return new Intl.DateTimeFormat("en-US", { timeZone, ...opts }).format(ms);
}
