"use client";

import { THEMES } from "@/lib/themes";
import { useOS } from "@/components/OSProvider";

// rubens.design's era timeline, cut down to three stops.
export default function ThemeTimeline({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useOS();
  return (
    <div className={`timeline ${className}`} role="radiogroup" aria-label="Theme">
      {THEMES.map((t, i) => (
        <div key={t.id} className="timeline__stop-wrap">
          {i > 0 && <span className="timeline__seg" aria-hidden />}
          <button
            type="button"
            role="radio"
            aria-checked={theme === t.id}
            className="timeline__stop"
            data-active={theme === t.id || undefined}
            onClick={(e) => setTheme(t.id, { x: e.clientX, y: e.clientY })}
          >
            <span className="timeline__dot" aria-hidden />
            <span className="timeline__label">{t.label}</span>
            <span className="timeline__tip" role="tooltip">
              {t.hint}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
