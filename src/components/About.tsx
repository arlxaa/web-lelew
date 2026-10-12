import { about, profile } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading kicker="Who I Am" title="About Me" />

      <div className="grid gap-5 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="bento h-full p-8">
            <p className="text-base leading-relaxed text-slate-300">
              {about.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {about.interests.map((item) => (
                <span
                  key={item}
                  className="mono rounded-full border border-glow/25 bg-glow/5 px-3.5 py-1.5 text-xs text-glow-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={120}>
          <div className="bento flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="mono text-[11px] uppercase tracking-widest text-slate-400">
              grade point average
            </p>
            <p className="mt-3 text-5xl font-extrabold text-white text-glow">
              {profile.gpa}
            </p>
            <p className="mono mt-1 text-sm text-slate-400">out of {profile.gpaMax}</p>
            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              {profile.status}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
