import { profile } from "@/lib/content";
import HeroConstellation from "./HeroConstellation";
import LightTunnel from "./LightTunnel";
import Reveal from "./Reveal";

/**
 * Hero landing: CELESTYN (kiri-atas) — [konstelasi] — AURELIXIA (kanan-bawah),
 * deskripsi + tombol di bawah. Strip statistik muncul pelan saat di-scroll.
 * Semua visual CSS/SVG murni. Tanpa <img>, tanpa library, tanpa glassmorphism.
 */

// ✏️ Edit angka/label statistik di sini
const stats = [
  { value: profile.gpa, label: "GPA / IPK" },
  { value: "8", label: "Years Competitions" },
  { value: "7+", label: "Awards" },
  { value: "6", label: "Organizations" },
];

// ✏️ Headline dipisah dua kata (mengapit visual). Ubah di sini kalau perlu.
const headline = { left: "CELESTYN", right: "AURELIXIA" };

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden text-[#ededf0]">
      {/* ───────── Backdrop lorong cahaya (CORA-style), paling belakang ───────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <LightTunnel className="h-full w-full" focusY={42} />
      </div>

      {/* ───────── Landing: setinggi layar ───────── */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pt-28 pb-10 sm:px-8">
        {/* Eyebrow */}
        <p className="hero-in mono mb-4 text-xs uppercase tracking-[0.28em] text-glow-soft sm:text-sm" style={{ animationDelay: "0.1s" }}>
          Hi this is {profile.nickname} :D
        </p>

        {/* Headline diagonal mengapit visual */}
        <h1 className="sr-only">{profile.name}</h1>
        <div
          aria-hidden="true"
          className="relative mt-6 grid items-center gap-0 lg:grid-cols-[1fr_minmax(0,24rem)_1fr]"
        >
          {/* CELESTYN — kiri atas */}
          <span className="hero-in text-shimmer relative z-10 block self-start whitespace-nowrap font-display font-semibold leading-[0.9] tracking-tight text-[clamp(2.75rem,14vw,5rem)] lg:-mt-4 lg:justify-self-end lg:-mr-20 lg:text-[clamp(3.5rem,6vw,6.5rem)]" style={{ animationDelay: "0.25s" }}>
            {headline.left}
          </span>

          {/* ✏️ ukuran visual: ubah w-[...] */}
          <div className="relative z-0 mx-auto -my-6 flex w-[min(82vw,24rem)] justify-center lg:my-0 lg:w-full">
            <HeroConstellation className="w-full" />
          </div>

          {/* AURELIXIA — kanan bawah */}
          <span className="hero-in text-shimmer relative z-10 block self-end whitespace-nowrap text-right font-display font-semibold leading-[0.9] tracking-tight text-[clamp(2.75rem,14vw,5rem)] lg:mt-16 lg:justify-self-start lg:-ml-20 lg:text-left lg:text-[clamp(3.5rem,6vw,6.5rem)]" style={{ animationDelay: "0.4s" }}>
            {headline.right}
          </span>
        </div>

        {/* Deskripsi + tombol */}
        <div className="hero-in mt-10 max-w-md lg:mt-14" style={{ animationDelay: "0.55s" }}>
          <p className="text-base leading-relaxed text-[#ededf0]/80">
            CS student at BINUS exploring{" "}
            {/* Highlight stabilo: HANYA satu frasa ini */}
            <mark className="rounded bg-glow-soft px-1.5 py-0.5 font-medium text-[#060607]">
              AI &amp; cybersecurity
            </mark>
            . National UI design champion and a 1st-Dan black-belt Taekwondo
            athlete — disciplined, curious, competitive.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#about"
              className="accent-fill accent-glow inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-[#060607] transition-[filter,transform] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 accent-ring motion-safe:hover:translate-x-1"
            >
              Explore My Journey
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-[#ededf0] transition-colors hover:border-glow/60 hover:text-glow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-soft"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* ───────── Strip statistik — muncul pelan saat di-scroll ───────── */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 120}
              className="border-b border-r border-white/10 px-5 py-7 first:pl-0 [&:nth-child(2n)]:border-r-0 [&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
            >
              <dd className="font-display text-4xl font-semibold tabular-nums text-glow sm:text-5xl">
                {s.value}
              </dd>
              <dt className="mono mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#ededf0]/60">
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Animasi masuk bertahap (entrance). Mati kalau reduced-motion. */}
      <style>{`
        .hero-in {
          opacity: 0;
          transform: translateY(26px);
          animation: hero-in 0.8s cubic-bezier(.22,.7,.2,1) forwards;
        }
        @keyframes hero-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-in { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
    </section>
  );
}
