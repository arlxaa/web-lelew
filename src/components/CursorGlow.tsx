"use client";

import { useEffect } from "react";

/**
 * Interactive background: a soft accent glow that eases toward the mouse.
 * Writes smoothed coordinates into CSS vars (--mx / --my) consumed by
 * `.app-cursor` in globals.css. Pure transform/opacity — cheap, GPU-friendly.
 * Respects prefers-reduced-motion and pointer:fine (skips touch devices).
 */
export default function CursorGlow() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".app-cursor");
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return; // no cursor glow for touch / reduced-motion

    // target (raw mouse) and current (eased) positions
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // ease toward the target (trailing feel)
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}
