import { profile } from "@/lib/content";
import HeroConstellation from "./HeroConstellation";

const stats = [
  { value: "3.97", label: "GPA / 4.00", span: "md:col-span-3", big: true },
  { value: "7+", label: "Competition Awards", span: "md:col-span-3", big: false },
  { value: "8", label: "Yrs Taekwondo", span: "md:col-span-2", big: false },
  { value: "6", label: "Organizations", span: "md:col-span-4", big: false },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-6xl items-center px-6 pt-28 pb-20"
    >
      <div className="grid w-full gap-5 md:grid-cols-6 md:auto-rows-[minmax(0,1fr)]">
        {/* Intro — wide panel */}
        <div className="bento relative flex flex-col justify-center overflow-hidden p-8 md:col-span-4 md:row-span-2 md:p-10">
          {/* Decorative constellation, behind the text */}
          <div className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-80 md:block">
            <HeroConstellation className="w-[min(42vw,460px)]" />
          </div>

          <div className="relative z-10 flex flex-col">
          <p className="mono mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-glow/30 bg-glow/5 px-3 py-1 text-[11px] uppercase tracking-widest text-glow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-glow-pink" />
            lele
          </p>

          <p className="mono text-sm text-slate-400">Hi, I&apos;m</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-white text-glow sm:text-4xl md:text-5xl">
            {profile.name}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="rounded-full bg-gradient-to-r from-glow to-glow-violet px-6 py-2.5 text-sm font-semibold text-white shadow-glow-lg transition-transform hover:scale-105"
            >
              Explore My Journey
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-glow/50 hover:text-white"
            >
              Get in Touch
            </a>
          </div>
          </div>
        </div>

        {/* Status card */}
        <div className="bento flex flex-col justify-center p-6 md:col-span-2">
          <p className="mono text-[11px] uppercase tracking-widest text-slate-400">
            status
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {profile.status}
          </p>
        </div>

        {/* Stat cards row — asymmetric rhythm */}
        <div className="grid gap-5 md:col-span-6 md:grid-cols-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`bento flex flex-col justify-center ${s.big ? "p-7" : "p-5"} ${s.span}`}
            >
              <p
                className={`font-display font-bold tabular-nums text-white text-glow ${
                  s.big ? "text-4xl sm:text-5xl text-glow-soft" : "text-2xl sm:text-3xl"
                }`}
              >
                {s.value}
              </p>
              <p className="mono mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
