# LELE.OS

Portfolio of Celestyn Aurelixia (Lele): a desktop OS you can scroll through.

- **Top:** a desktop with giant stretched name type, draggable windows (`about_me.txt`, `journey.log`,
  `achievements.xls`, `certificates.exe`, `message.eml`), a magnifying dock, a working terminal, and
  Clawd, the pixel desk pet. On phones it turns into an app grid.
- **Below:** About, Projects (pinned 3D cover stack, newest first), Journey (career timeline + log),
  Achievements, Skills, Off screen (hobbies, drinks and a looping "on repeat" playlist), and Contact.
- **Three themes:** Retro (Windows 98), Garage (default), and Claude, switched from the timeline in the top bar.
- **Extras:** boot screen, ⌘K / Ctrl+K command palette, and an offline "Ask Lele" chat.

Design references: [rubens.design](https://www.rubens.design/), [bryangarage.dev](https://bryangarage.dev/),
and [sibaldesign.com](https://sibaldesign.com/). The Off screen rows follow
[mineenim.vercel.app](https://mineenim.vercel.app/). See `DESIGN.md` for the breakdown.

## Run it

Needs Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check: `npm run build` then `npm start`.

## Editing content

All text lives in `src/content/`:

| File | What |
|---|---|
| `profile.ts` | name, current role, socials, intro sentence, stats, bio |
| `projects.ts` | projects, sorted newest first by `date` (covers go in `public/covers/`) |
| `journey.ts` | experience & education timeline, organizations |
| `achievements.ts` | awards (certificate scans in `public/certificates/`) |
| `skills.ts` | skill cards and soft skills |
| `offscreen.ts` | hobbies, drinks and the songs on repeat |

Chat answers live in `src/lib/chat.ts`, and terminal commands in `src/lib/terminal.ts`.
Theme colours are the CSS variables at the top of `src/app/globals.css`.

## Notes

- No backend: the contact forms open the visitor's mail app (`mailto:`).
- Motion is reduced when the OS asks for it. The boot screen shows once per session (press Esc to skip).
- Departure Mono is bundled under the SIL Open Font License (`src/fonts/`).
