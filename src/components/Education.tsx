import { education } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section-pad mx-auto max-w-4xl px-6">
      <SectionHeading kicker="Academics" title="Education" />

      <div className="grid gap-6 sm:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 100} variant="zoom">
            <div className="bento h-full p-6">
              <p className="mono text-xs font-medium uppercase tracking-wide text-glow-soft">
                {e.period}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {e.school}
              </h3>
              <p className="mt-1 text-sm text-slate-300">{e.degree}</p>
              <p className="mt-4 inline-block rounded-lg border border-glow/30 bg-glow/10 px-3 py-1 text-sm font-semibold text-glow-soft">
                {e.grade}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
