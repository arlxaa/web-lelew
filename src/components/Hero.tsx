import { profile } from "@/lib/content";
import HeroConstellation from "./HeroConstellation";
import Reveal from "./Reveal";

/**
 * Hero landing: CELESTYN (kiri-atas) — [konstelasi] — AURELIXIA (kanan-bawah),
 * deskripsi + tombol di bawah. Strip statistik muncul pelan saat di-scroll.
 * Semua visual CSS/SVG murni. Tanpa <img>, tanpa library, tanpa glassmorphism.
 */

// ✏️ Edit angka/label statistik di sini
const stats = [
  { value: profile.gpa, label: "GPA / IPK" },
  { value: "8", label: "Years Taekwondo" },
  { value: "7+", label: "Awards" },
  { value: "6", label: "Organizations" },
];

// ✏️ Headline dipisah dua kata (mengapit visual). Ubah di sini kalau perlu.
const headline = { left: "CELESTYN", right: "AURELIXIA" };

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden text-[#f3eefc]">
      {/* ───────── Aurora ungu (CSS murni, di belakang semua konten) ───────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      >
        <div className="hero-aurora-a absolute left-1/2 top-[22%] h-[38rem] w-[52rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#7c3aed_0%,#a882ff_28%,transparent_68%)] opacity-30 blur-3xl" />
        <div className="hero-aurora-b absolute -right-24 top-[12%] h-40 w-[60rem] max-w-[160vw] -rotate-[18deg] bg-gradient-to-r from-transparent via-[#a882ff] to-transparent opacity-20 blur-3xl" />
        {/* ✏️ opacity-30 / opacity-20 = kekuatan aurora. Naikkan kalau mau lebih terasa */}
      </div>

      {/* ───────── Landing: setinggi layar ───────── */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-5 pt-28 pb-10 sm:px-8">
        {/* Eyebrow */}
        <p className="mono mb-4 text-xs uppercase tracking-[0.28em] text-glow-soft sm:text-sm">
          Hi! this is {profile.nickname} :b
        </p>

        {/* Headline diagonal mengapit visual */}
        <h1 className="sr-only">{profile.name}</h1>
        <div
          aria-hidden="true"
          className="relative mt-6 grid items-center gap-0 lg:grid-cols-[1fr_minmax(0,24rem)_1fr]"
        >
          {/* CELESTYN — kiri atas */}
          <span className="relative z-10 block self-start whitespace-nowrap font-display font-semibold leading-[0.9] tracking-tight text-[clamp(2.75rem,14vw,5rem)] text-glow lg:-mt-4 lg:justify-self-end lg:-mr-20 lg:text-[clamp(3.5rem,6vw,6.5rem)]">
            {headline.left}
          </span>

          {/* ✏️ ukuran visual: ubah w-[...] */}
          <div className="relative z-0 mx-auto -my-6 flex w-[min(82vw,24rem)] justify-center lg:my-0 lg:w-full">
            <HeroConstellation className="w-full" />
          </div>

          {/* AURELIXIA — kanan bawah */}
          <span className="relative z-10 block self-end whitespace-nowrap text-right font-display font-semibold leading-[0.9] tracking-tight text-[clamp(2.75rem,14vw,5rem)] text-glow lg:mt-16 lg:justify-self-start lg:-ml-20 lg:text-left lg:text-[clamp(3.5rem,6vw,6.5rem)]">
            {headline.right}
          </span>
        </div>

        {/* Deskripsi + tombol */}
        <div className="mt-10 max-w-md lg:mt-14">
          <p className="text-base leading-relaxed text-[#f3eefc]/80">
            CS student at BINUS exploring{" "}
            {/* Highlight stabilo: HANYA satu frasa ini */}
            <mark className="rounded bg-glow-violet/90 px-1.5 py-0.5 font-medium text-[#0b0714]">
              AI &amp; cybersecurity
            </mark>
            . National UI design champion and a 1st-Dan black-belt Taekwondo
            athlete — disciplined, curious, competitive.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#about"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-glow to-glow-soft px-6 py-3 text-sm font-semibold text-[#0b0714] transition-[filter,transform] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-soft motion-safe:hover:-translate-y-0.5"
            >
              Explore My Journey
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-[#f3eefc] transition-colors hover:border-glow/60 hover:text-glow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-soft"
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
              <dt className="mono mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#f3eefc]/60">
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Animasi aurora: sangat pelan, mati kalau reduced-motion */}
      <style>{`
        .hero-aurora-a { animation: hero-drift-a 40s ease-in-out infinite alternate; }
        .hero-aurora-b { animation: hero-drift-b 55s ease-in-out infinite alternate; }
        @keyframes hero-drift-a {
          from { transform: translateX(-50%) translateY(0) scale(1); }
          to   { transform: translateX(-47%) translateY(2%) scale(1.06); }
        }
        @keyframes hero-drift-b {
          from { transform: rotate(-18deg) translateX(0); }
          to   { transform: rotate(-16deg) translateX(-4%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-aurora-a, .hero-aurora-b { animation: none; }
        }
      `}</style>
    </section>
  );
}
