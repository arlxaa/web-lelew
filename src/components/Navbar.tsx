"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/content";
import Monogram from "./Monogram";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link whose section sits in the middle band.
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const ratios: Record<string, number> = {};
    const pickBest = () => {
      let best: string | null = null;
      let bestRatio = 0;
      for (const id of ids) {
        const r = ratios[id] ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          best = `#${id}`;
        }
      }
      setActive(best);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) ratios[e.target.id] = e.intersectionRatio;
          else delete ratios[e.target.id];
        }
        pickBest();
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white text-glow"
        >
          <Monogram letters="L" size={34} title={`${profile.name} monogram`} />
          <span>{profile.nickname}</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`fx-underline relative text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "nav-active text-white" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:accent-border motion-reduce:hover:scale-100"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-white/10 md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block py-3 text-base font-medium hover:text-white ${
                      isActive ? "accent-text" : "text-slate-200"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-white/25 px-5 py-2 text-center text-sm font-semibold"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
