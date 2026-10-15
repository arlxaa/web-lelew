import { technicalSkills, softSkills, organizations } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Icon, { type IconName } from "./Icon";

// Petakan nama skill ke ikon garis (fallback: code / users).
function iconFor(skill: string, fallback: IconName): IconName {
  const s = skill.toLowerCase();
  if (s.includes("ai") || s.includes("scientific") || s.includes("numerical")) return "ai";
  if (s.includes("forensic") || s.includes("osint") || s.includes("security")) return "shield";
  if (s.includes("problem")) return "search";
  if (s.includes("html") || s.includes("web")) return "design";
  if (s.includes("c programming") || s.includes("data structure")) return "code";
  if (s.includes("leadership")) return "trophy";
  if (s.includes("teamwork") || s.includes("public")) return "users";
  if (s.includes("time") || s.includes("multitask")) return "terminal";
  return fallback;
}

function SkillCard({
  title,
  skills,
  fallback,
  delay,
}: {
  title: string;
  skills: string[];
  fallback: IconName;
  delay: number;
}) {
  return (
    <Reveal delay={delay} variant="blur">
      <div className="bento h-full p-8">
        <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-navy-800/60 px-4 py-2 text-sm text-slate-200 transition-all duration-200 hover:scale-105 hover:border-glow/50 hover:text-white motion-reduce:hover:scale-100"
            >
              <Icon
                name={iconFor(skill, fallback)}
                size={16}
                className="flex-none text-glow-soft"
              />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad mx-auto max-w-6xl px-6">
      <SectionHeading kicker="Toolkit & Community" title="Expertise" />
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Kiri: skills — lebih lebar */}
        <div className="grid gap-8 lg:col-span-3">
          <SkillCard
            title="Technical Skills"
            skills={technicalSkills}
            fallback="code"
            delay={0}
          />
          <SkillCard
            title="Soft Skills"
            skills={softSkills}
            fallback="users"
            delay={120}
          />
        </div>

        {/* Kanan: organizations — sticky */}
        <Reveal className="lg:col-span-2" delay={160} variant="right">
          <div className="bento h-full p-8 lg:sticky lg:top-24">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Organizations & Clubs
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Communities where I learn, compete, and contribute.
            </p>
            <ul className="flex flex-col gap-3">
              {organizations.map((o) => (
                <li
                  key={o}
                  className="rounded-lg border border-white/10 bg-navy-800/60 px-4 py-2.5 text-sm text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-glow/50 hover:text-white motion-reduce:hover:translate-y-0"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
