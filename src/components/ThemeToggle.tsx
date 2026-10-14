"use client";

import { useEffect, useState } from "react";

/**
 * Dark/light toggle. Default = dark. Persists to localStorage.
 * Adds `light` class to <html>; CSS variables in globals.css do the rest.
 */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  // Sync initial state from what the inline script already applied.
  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const el = document.documentElement;
    const next = !el.classList.contains("light");

    const apply = () => {
      el.classList.toggle("light", next);
      setLight(next);
      try {
        localStorage.setItem("theme", next ? "light" : "dark");
      } catch {}
    };

    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // Radius to the farthest screen corner, so the circle fully covers the page.
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canVT =
      "startViewTransition" in document &&
      !reduce &&
      typeof (document as any).startViewTransition === "function";

    if (!canVT) {
      // Fallback: plain cross-fade
      el.classList.add("theme-anim");
      apply();
      window.setTimeout(() => el.classList.remove("theme-anim"), 500);
      return;
    }

    // View Transition: the new theme is clipped into a growing circle from the button.
    const vt = (document as any).startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${radius}px at ${cx}px ${cy}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(.4,0,.2,1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-current transition-all duration-200 hover:scale-110 hover:border-white/50 motion-reduce:hover:scale-100"
    >
      {light ? (
        // moon
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        // sun
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
