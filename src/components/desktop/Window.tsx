"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APPS, type AppId, useOS } from "@/components/OSProvider";

export type Rect = { x: number; y: number; w: number; h?: number };

/**
 * Draggable desktop window (rubens.design). Position is local state; open /
 * minimized / z-order live in the OS provider.
 */
export default function Window({
  id,
  initial,
  bounds,
  className = "",
  children,
  accessory,
}: {
  id: AppId;
  initial: Rect;
  bounds: { w: number; h: number };
  className?: string;
  children: React.ReactNode;
  accessory?: React.ReactNode;
}) {
  const { windows, activeApp, focusApp, closeApp, minimizeApp } = useOS();
  const meta = windows[id];
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const drag = useRef<{ dx: number; dy: number; pid: number } | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Keep the title bar reachable when the viewport shrinks.
  const clamp = useCallback(
    (x: number, y: number) => {
      const w = ref.current?.offsetWidth ?? initial.w;
      return {
        x: Math.min(Math.max(x, 80 - w), bounds.w - 80),
        y: Math.min(Math.max(y, 0), bounds.h - 40),
      };
    },
    [bounds.w, bounds.h, initial.w],
  );
  useEffect(() => {
    const id = requestAnimationFrame(() => setPos((p) => clamp(p.x, p.y)));
    return () => cancelAnimationFrame(id);
  }, [clamp]);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    focusApp(id);
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y, pid: e.pointerId };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.pid !== e.pointerId) return;
    setPos(clamp(e.clientX - d.dx, e.clientY - d.dy));
  };
  const onUp = () => {
    drag.current = null;
  };

  const state = !meta.open ? "closed" : meta.minimized ? "minimized" : "open";
  return (
    <section
      ref={ref}
      className={`win ${className}`}
      data-state={state}
      data-active={activeApp === id || undefined}
      aria-label={APPS[id].title}
      aria-hidden={state !== "open"}
      inert={state !== "open"}
      onPointerDown={() => focusApp(id)}
      style={{
        left: pos.x,
        top: pos.y,
        width: initial.w,
        height: initial.h,
        zIndex: 10 + meta.z,
      }}
    >
      {accessory}
      <header
        className="win__bar"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={() => minimizeApp(id)}
      >
        <span className="win__title">{APPS[id].title}</span>
        <div className="win__btns">
          <button type="button" className="win__btn win__btn--min" aria-label={`Minimize ${APPS[id].label}`} onClick={() => minimizeApp(id)}>
            <span>–</span>
          </button>
          <button type="button" className="win__btn win__btn--close" aria-label={`Close ${APPS[id].label}`} onClick={() => closeApp(id)}>
            <span>×</span>
          </button>
        </div>
      </header>
      <div className="win__body">{children}</div>
    </section>
  );
}
