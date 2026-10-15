"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import HeroConstellation from "./HeroConstellation";

/**
 * Intro loading screen: the hero constellation fills the screen.
 * The user leaves ONLY by scrolling down (wheel / touch-swipe / arrow / space),
 * or the small "Enter" affordance. Body scroll is locked until then.
 */
export default function Loader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const exited = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const node = rootRef.current;
    // Deep links (e.g. /#projects) skip the intro so shared anchors land directly.
    if (window.location.hash.length > 1) {
      setGone(true);
      return;
    }
    // Lock scroll while the intro is up.
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const exit = () => {
      if (exited.current) return;
      exited.current = true;
      setLeaving(true);
      html.style.overflow = prevOverflow || "";
      window.setTimeout(() => setGone(true), 1200);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) exit();
    };
    let touchStartY = 0;
    let touchMoved = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      touchMoved = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (Math.abs(touchStartY - y) > 6) touchMoved = true;
      if (touchStartY - y > 16) exit(); // swipe up = scroll down
    };
    // Tap anywhere on the intro also enters (mobile swipe can be flaky across browsers).
    const onTouchEnd = () => {
      if (!touchMoved) exit();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter", "End"].includes(e.key)) exit();
    };

    // Bind to the intro node itself (plus window for wheel/key) so touch is
    // captured even while body scroll is locked.
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    node?.addEventListener("touchstart", onTouchStart, { passive: true });
    node?.addEventListener("touchmove", onTouchMove, { passive: true });
    node?.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      node?.removeEventListener("touchstart", onTouchStart);
      node?.removeEventListener("touchmove", onTouchMove);
      node?.removeEventListener("touchend", onTouchEnd);
      html.style.overflow = prevOverflow || "";
    };
  }, []);

  if (gone) return null;

  const exit = () => {
    if (exited.current) return;
    exited.current = true;
    document.documentElement.style.overflow = "";
    setLeaving(true);
    window.setTimeout(() => setGone(true), 1200);
  };

  return (
    <div ref={rootRef} className={`intro ${leaving ? "intro-leaving" : ""}`} role="dialog" aria-label="Intro">
      {/* Backdrop layers so it feels like the real page */}
      <div className="intro-bg" aria-hidden />

      <div className="intro-inner">
        <p className="intro-name intro-name-top">
          <span className="intro-mask">
            <span className="intro-rise text-shimmer">{headlineLeft}</span>
          </span>
        </p>

        <div className="intro-constellation intro-dissolve">
          <HeroConstellation className="w-full" />
        </div>

        <p className="intro-name intro-name-bottom">
          <span className="intro-mask">
            <span className="intro-rise text-shimmer">{headlineRight}</span>
          </span>
        </p>

        <div className="intro-rule" aria-hidden />

        {/* Scroll hint — in flow, below the name, so it never overlaps */}
        <button type="button" onClick={exit} className="intro-hint intro-dissolve" aria-label="Scroll down to enter">
          <span className="mono intro-hint-text">scroll or tap to enter</span>
          <span className="intro-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>

      <span className="sr-only">{profile.name}</span>
    </div>
  );
}

// Split name like the hero does.
const headlineLeft = "CELESTYN";
const headlineRight = "AURELIXIA";
