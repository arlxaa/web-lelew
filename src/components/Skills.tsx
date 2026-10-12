import { technicalSkills, softSkills } from "@/lib/content";
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
    <Reveal delay={delay}>
      <div className="bento h-full p-8">
        <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-navy-800/60 px-4 py-2 text-sm text-slate-200 transition-all hover:border-glow/50 hover:text-white hover:shadow-glow"
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
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading kicker="What I Do" title="Skills" />
      <div className="grid gap-8 md:grid-cols-2">
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
    </section>
  );
}
