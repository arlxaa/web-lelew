import { profile } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Icon, { type IconName } from "./Icon";

const links: {
  label: string;
  value: string;
  href: string;
  icon: IconName;
}[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
  {
    label: "Email (Binus)",
    value: profile.emailAlt,
    href: `mailto:${profile.emailAlt}`,
    icon: "mail",
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "Celestyn Aurelixia",
    href: profile.linkedin,
    icon: "linkedin",
  },
  {
    label: "Instagram",
    value: profile.instagramHandle,
    href: profile.instagram,
    icon: "instagram",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading kicker="Say Hello" title="Get in Touch" />

      <Reveal>
        <p className="mx-auto mb-10 max-w-xl text-center text-slate-300">
          Open to collaboration, competitions, and new opportunities in
          technology & AI. Feel free to reach out.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 80}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="bento glow-soft-hover group flex items-center gap-4 p-5"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-glow/30 bg-glow/10 text-glow-soft">
                <Icon name={l.icon} size={22} title={l.label} />
              </span>
              <span className="min-w-0">
                <span className="mono block text-[11px] uppercase tracking-wide text-slate-400">
                  {l.label}
                </span>
                <span className="block truncate text-sm font-medium text-white group-hover:text-glow-soft">
                  {l.value}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
