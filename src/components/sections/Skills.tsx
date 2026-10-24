import { skills, softSkills } from "@/content/skills";
import { about } from "@/content/profile";
import Reveal, { SectionHeader } from "./Reveal";

// sibaldesign "equipment" grid inside bryangarage hairline cells.
export default function Skills() {
  return (
    <section id="skills" className="sec skills">
      <div className="wrap">
        <SectionHeader index="05" title="Skills" lede="The loadout: what I build with, and what I bring to a team." />
        <Reveal as="ul" className="tiles">
          {skills.map((s, i) => (
            <li key={s.name} className="tile" style={{ ["--i" as string]: i }}>
              <span className="tile__group mono">{s.group}</span>
              <h3 className="tile__name">{s.name}</h3>
              <span className="tile__rule" aria-hidden />
              <p className="tile__note">{s.note}</p>
            </li>
          ))}
        </Reveal>
        <div className="skills__soft">
          <Reveal className="soft">
            <span className="sec-kicker">Soft skills</span>
            <ul>
              {softSkills.map((s) => (
                <li key={s.name}>
                  <b>{s.name}</b>
                  <span className="mono">{s.proof}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="soft">
            <span className="sec-kicker">Interests</span>
            <ul className="soft__chips">
              {about.interests.map((t) => (
                <li key={t} className="chip chip--accent">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
