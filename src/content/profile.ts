import { projects } from "./projects";

// ✏️ All site copy lives in /src/content. Edit text here and every app,
// window and section picks it up.

export const profile = {
  name: "Celestyn Aurelixia",
  firstName: "Celestyn",
  lastName: "Aurelixia",
  nickname: "Lele",
  role: "Computer Science Student",
  // ✏️ Current side role, shown in the intro readout, journey and terminal.
  now: { title: "Vibe Coder", place: "localhost", since: "2026" },
  school: "BINUS University",
  schoolLong: "Bina Nusantara University",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  tagline:
    "Computer Science Student at BINUS | Exploring the world of Artificial Intelligence",
  email: "aurelixiacelestyn@gmail.com",
  emailAlt: "celestyn.aurelixia@binus.ac.id",
  gpa: "3.97",
  gpaMax: "4.00",
  // ✏️ "EST." year printed on the boot screen and the footer.
  since: "2025",
};

export type SocialId = "github" | "linkedin" | "instagram" | "spotify";

export const socials: { id: SocialId; label: string; handle: string; href: string }[] = [
  { id: "github", label: "GitHub", handle: "arlxaa", href: "https://github.com/arlxaa" },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "celestyn-aurelixia",
    href: "https://www.linkedin.com/in/celestyn-aurelixia-8a09ba3b7/",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@arlxaa_",
    href: "https://www.instagram.com/arlxaa_/",
  },
  {
    id: "spotify",
    label: "Spotify",
    handle: "Lele's playlists",
    href: "https://open.spotify.com/user/31czaewphnhdxscstpy2qmnffxly",
  },
];

// ✏️ Stat strip under the intro statement.
export const stats = [
  { value: "3.97", label: "GPA / 4.00" },
  { value: String(projects.length), label: "Projects shipped" },
  { value: "7+", label: "Awards" },
  { value: "6", label: "Organizations" },
];

// Hover card shown on a highlighted keyword (bryangarage.dev "peek").
export type Peek = {
  path: string;
  state: string;
  title: string;
  meta: string;
  stat: string;
};

// Plain strings render dimmed; { key } renders highlighted; { key, peek }
// also gets a hover card.
export type StatementPart = string | { key: string; peek?: Peek };

// ✏️ The big intro sentence.
export const statement: StatementPart[] = [
  { key: "Vibe coder at localhost" },
  " and Computer Science student at ",
  {
    key: "BINUS University",
    peek: {
      path: "binus.ac.id/computer-science",
      state: "Enrolled",
      title: "B.Sc. Computer Science",
      meta: "Bina Nusantara University",
      stat: "GPA 3.97",
    },
  },
  ", exploring ",
  { key: "artificial intelligence" },
  " and ",
  { key: "cybersecurity" },
  ".",
];

// ✏️ Smaller line under the statement.
export const statementNote =
  "Disciplined, curious, competitive. Learning AI and security by building things, and by taking them apart.";

// ✏️ Text inside the about_me.txt window.
export const about = {
  bio: "An undergraduate Computer Science student at Bina Nusantara University with a strong interest in artificial intelligence, cybersecurity, and problem solving. A national UI design champion and long-time Taekwondo athlete (1st Dan black belt) with 8 years of competition and active involvement across tech, research, and student organizations.",
  interests: ["AI", "Cybersecurity", "Problem Solving", "Mathematics", "App Development"],
};
