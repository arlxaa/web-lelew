import { experiences } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad mx-auto max-w-4xl px-6">
      <SectionHeading kicker="My Journey" title="Experience" />

      <div className="relative pl-8 sm:pl-10">
        {/* Vertical rail */}
        <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-glow/70 via-glow-violet/40 to-transparent sm:left-[11px]" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <Reveal key={`${exp.org}-${exp.role}`} delay={i * 80} variant="left">
              <div className="relative">
                {/* Node */}
                <span
                  className="absolute top-6 h-3.5 w-3.5 rounded-full border-2 border-navy-950 bg-glow shadow-glow -left-8 sm:-left-10"
                  aria-hidden
                />
                <div className="bento p-6">
                  <p className="mono text-xs font-medium uppercase tracking-wide text-glow-soft">
                    {exp.period}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{exp.org}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-sm leading-relaxed text-slate-300"
                      >
                        <span className="mt-1 flex-none text-glow-soft">▹</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
