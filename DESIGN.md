# LELE.OS — design notes & build plan

Personal portfolio of Celestyn Aurelixia (Lele). It combines three reference sites:
**rubens.design** (portfolio as an operating system), **bryangarage.dev** (dark "AI garage"
with a terminal) and **sibaldesign.com** (boot sequence, numbered sections, log lists).

## Decisions (confirmed with Lele)

- **Layout: hybrid.** The first screen is a Rubens-style desktop: giant name typography,
  top bar, dock and draggable windows. Scrolling down leads into long-form sections.
- **Themes: switcher with 3 eras.** Glass (Rubens light), Garage (Bryan dark + orange,
  **default**) and Claude (warm cream + terracotta, plus a cute pixel pet "Clawd").
  Sibal's navy/cyan sci-fi palette is **not** used, only its structure and interactions.
- **Projects:** take a reference layout, but **no dither effect**.
- **Separate project:** this folder. The old `web-lele` project is left untouched.
  Content and assets were copied from it.
- Extra features are my call: boot screen, terminal, ⌘K palette, scripted "Ask Lele" chat.

## Reverse-engineering summary

### rubens.design (Astro/Vite + Three.js)
- Full-screen desktop, no scroll. The top bar holds an "R" logo, social icons and a live date + clock.
  A floating era timeline (1992/1998/2007/2026/2077) re-skins everything through CSS variables
  (`--window-bg`, `--window-radius`, `--dock-*`, `--title-font`…).
- Windows: `about_me.txt` (text editor with A/A, B/I/U and align toolbar, editable text, word-count
  status bar), `experience.log` (mono rows `01 > [2023-2026] Org · Role  Remote [CLOSED] ›`, tabs),
  `awards.xls` (formula bar + A/B/C grid + sheet tabs), `gallery.exe`, `message.bat`
  (email compose + "type send to confirm"). Grey title-bar dots turn yellow/red when the window is active.
- Dock: magnify on hover, dark tooltip pill, dots under open apps, chat orb ("Ask Rubens").
- Background: name in Unbounded 900, every glyph stretched to fill its cell (4 lines,
  weights .3/.3/.2/.2). The hovered letter grows (+30%) with chromatic aberration near the cursor.
- /work: 3D cover stack of project screenshots, light rays, meta in the left gutter,
  cursor label "VIEW PROJECT".
- Mobile: an iOS-style app grid with the era timeline pinned to the bottom.
- 2026 tokens: bg `#FAFAFA→#E8E8ED`, window `rgba(255,255,255,.70)` r16
  `0 8px 32px rgba(0,0,0,.10)`, text `#1D1D1F/#48484A/#8E8E93`, accent `#007AFF`,
  fonts Satoshi + JetBrains Mono.

### bryangarage.dev (Next.js)
- Tokens: bg `#141414` / `#191919` / `#1a1c20`, border `#212327`, text `#fff/#dadbdf/#7d8187`,
  accent `#ff7a17` (soft `#ffc285`). Fonts: Geist, Geist Mono, Departure Mono (pixel brand),
  Instrument Serif.
- Hero: one long bio sentence, 55% grey, with key words in white. Words blur in one by one
  (opacity 0, blur 10px, translateY .35em). Hovering a link shows a "peek" card and blurs the rest
  of the sentence. Right column: live clock + timezone, OPEN TERMINAL >_, SAY HI ↗ and a signature.
  Scanlines: `repeating-linear-gradient(#ffffff0a 0 1px, transparent 1px 3px)`.
- Retro CRT terminal "Garage CLI" with a pixel pet sitting on top ("Welcome! Any key boots it."
  [Nap time] [Boot]). The boot sequence prints joke lines with OK statuses and a progress bar.
- Career Gantt timeline (years axis, bars with logos, orange "now" marker, drag scroll, edge fade).
- Projects as a 2×2 hairline grid: mono kicker `03 TOOL · NPM PACKAGE`, 40px title, WIP chip,
  mono tag chips, arrow. A "coming soon" cell is filled with ASCII `?`.
- Glassy "Jump to ⌘K" pill + command palette (projects, "Ask Bryan", actions).
- Showcase band: `bryan@garage ~ % showcase --3d-timeline`, block caret, pixel progress bar
  "scroll to run ↓".

### sibaldesign.com (vanilla JS)
- Boot: splash (logo draw-in, staggered mono lines, ENTER button with bars) → loader ring with %
  and a readout (`LOAD panel.glass  BLUR 10`).
- Fixed blurred nav with sliding underline on the active link and a scroll progress line;
  HUD corner brackets; vertical rails (`SCROLL 042`).
- Panels: a tag bar with a small square marker and corner ticks. Sections open with
  `01 PROFILE ———`, where the rule scales in.
- Projects: pinned scroll with a counter `03 / 05`, a progress bar and "SKIP TO EXPERIENCE ↓".
- Experience as log rows: date column, role, org in accent mono, description, index.
- "Equipment" grid of skill cards; footer with a giant ghost wordmark, a "LET'S BUILD SOMETHING."
  card, a chat form that slides in via clip-path, STATUS: ONLINE and a clock.
- Easing: `cubic-bezier(.16,1,.3,1)`; mono labels use letter-spacing .24–.42em.

## Theme tokens (to implement in `src/app/globals.css`)

| token | Garage (default) | Glass | Claude |
|---|---|---|---|
| bg / bg-2 / bg-3 | #141414 / #191919 / #1f2024 | #F2F2F5 (+gradient) / rgba(255,255,255,.72) / rgba(0,0,0,.04) | #FAF9F5 / #FFFFFF / #F0EEE6 |
| fg … fg-4 | #fff #dadbdf #7d8187 #4b4e54 | #1D1D1F #48484A #8E8E93 #C7C7CC | #141413 #3D3D3A #73726C #B0AEA5 |
| line / line-2 | #212327 / rgba(255,255,255,.14) | rgba(0,0,0,.08) / .14 | #E8E6DC / rgba(31,30,29,.18) |
| accent | #ff7a17 | #007AFF | #D97757 (deep #C6613F) |
| fonts ui / mono / title | Geist / Geist Mono / Departure Mono | Figtree / JetBrains Mono / Figtree 700 | Geist / Geist Mono / Source Serif 4 |
| window | rgba(25,25,25,.94) r12 + blur | rgba(255,255,255,.66) r18 blur(24) saturate(1.8) | #fff r14, warm soft shadow |
| name letters | #1c1c1c on #141414 + scanlines | white with soft emboss | #F3F0E8 on cream + grain |
| terminal | amber CRT #140d02 / #ffd899 / #ff9d00 | dark glass #1c1c1e, green prompt | Claude Code style #1F1E1D / #F0EEE6 / #D97757 |

## Build plan (done 2026-10-24)

1. `src/app/layout.tsx` (fonts via next/font, pre-paint script that sets `data-theme` and
   `data-boot`) + `globals.css` (reset + tokens above).
2. `OSProvider` context: theme (View Transitions circular reveal), window open/minimized/z,
   gallery index, palette, chat.
3. Desktop hero: `NameType` (SVG glyphs, preserveAspectRatio="none", flex-grow hover boost),
   `Window` (drag with pointer capture, focus, minimize, close), `Dock` (magnify, tooltip, dots),
   apps: about, terminal (+ pet), journey.log, achievements.xls, certificates.exe, message (mailto),
   Ask Lele chat. On mobile the hero becomes an app grid with full-screen sheets.
4. `Pet` (Clawd): pixel SVG, idle bob, blink, look-at-cursor, sleep Zz, happy hearts.
5. Sections: 01 Intro (Bryan statement + peeks + stats), 02 Projects (pinned 3D cover stack
   + Bryan meta + Sibal counter, coming-soon card, list fallback on mobile), 03 Journey (Gantt +
   log rows + org chips), 04 Achievements (spreadsheet + certificate preview + lightbox),
   05 Skills (equipment grid + soft skills), 06 Contact (terminal band + footer card + mail form).
6. Chrome: top bar (logo, theme timeline, ⌘K, >_, socials, clock, scroll progress), command palette,
   boot screen (once per session, skippable, off for reduced motion).
7. README, lint, build, and a screenshot pass across all 3 themes on desktop and mobile.

Notes: 7 of the 10 certificate scans are only 160px wide, so ask Lele for higher-res versions.
Departure Mono (OFL) lives in `src/fonts` with its license.

## REA pass 2 (static bundle analysis + code tracing)

REA `analyze_web_bundle` over CDP (JavaScript parsed, never executed). Evidence IDs:
Sibal `ev_e10c8ced…a8c7`, Bryan `ev_56c9705e…5a5e`, Rubens `ev_5faa026a…f918`.
No public source maps on any of the three sites.

### Backends / data (observed in bundles)
- **Rubens:** content comes from markdown files (`experience.md`, `awards.md`, `gallery.md`,
  `collaborations.md`, `showreel.md`) plus `/case-studies.json`. "Ask Rubens" streams from `/api/chat`
  (an LLM backend), and the contact form posts to Formspree. 15 scripts, no framework fingerprint (Vite build).
- **Bryan:** Next.js (Turbopack). The pet talks through `POST /api/pet/say` (5.5 s timeout, falls back
  silently when it gets null). The sticky-note guestbook lives at `/api/stickies` and `/api/stickies/keeper`.
  A ~716 KB chunk is three.js (the 3D desk/cabinet scene). Uses GSAP plugins.
- **Sibal:** a single 97 KB vanilla bundle with no network endpoints. Its sounds are synthesized
  with WebAudio (`q(freq, dur, "square", vol)` blips on nav hover and during boot).
- For us: everything stays static. The chat is scripted, contact goes through `mailto:`, and the pet
  lines come from a local array. No API is needed.

### Interaction logic recovered
- **Rubens window focus:** take the max computed zIndex across `.window` elements, add 1, and give
  that window `.active`. Open and close play `win-opening` / `win-closing` CSS animations (only on
  fine pointers and in some themes). The window then becomes `hidden` on `animationend`. State classes:
  `minimized`, `shaded`, `active`.
- **Rubens border glow:** `pointermove` sets `--edge-proximity` (0–100) and `--cursor-angle`
  (atan2 from the card center, +90°) on covers and cards. CSS draws a conic glow toward the edge
  nearest the cursor. Cards behind get `.push-back` on hover.
- **Rubens light rays (/work):** a WebGL shader with config `raysColor #4d6ccd`, `lightSpread 1.2`,
  `followMouse`, `mouseInfluence .11`, `noiseAmount .05`, `distortion .03`, origin top-center.
- **Bryan BIOS boot:** header `GARAGE BIOS v1.8 · 640K context OK`. Each line has a timed task list
  `{at: tick, task, result, tone: "wry"|"success"}`, e.g. "mounting /dev/coffee OK",
  "aligning agents on one goal 3 of 4", "waking up bryan caffeinated". Several scripts rotate.
  The prompt is `bryan@garage ~ %` and the idle screen shows big ASCII box-drawing art + "PRESS ANY KEY".
- **Bryan pet:** mood→pose map `pleased:wave, neutral:idle, sulky:space, playful:jump, caring:hug,
  scared:flee, curious:tilt`. Poses are sprite-sheet rows/frames. A balloon dialog has the buttons
  "Nap time" / "Got it!" / "Next (+n unread tips)". After closing a tip there is a 25% chance the pet
  jumps instead of idling. Hearts and snack particles spawn at the pointer, and the pet can be dragged.
  The overshoot easing `cubic-bezier(.34,1.56,.64,1)` is used while it is held.
- **Sibal boot loader:** a readout table `[INIT core.runtime OK] [LOAD field.hatch 45DEG / 4PX]
  … [DONE sequence.complete ENTER]`, with 240 ms per line (20 ms under reduced motion). At most
  6 visible lines; older ones get removed. The ring dashoffset `326.7 × (1-progress)` and the % counter
  are interpolated with `performance.now()`.
- **Sibal sections:** an IntersectionObserver with `rootMargin "-45% 0px -50% 0px"` toggles the
  active nav link. The glitch fires once per title on load (300 ms + 180 ms stagger), then on a random
  title every 5.2 s and on hover (700 ms class toggle).
- **Sibal pinned projects:** section height = `100vh + count × step × 100vh`. Progress =
  `-rect.top / (offsetHeight - innerHeight)`, clamped to 0–1. Card width is capped at 1200px and
  shrinks until it fits the stage height. It only runs on wide screens without reduced motion
  (`hz-on` / `hz-off`).
- **Sibal reveal:** panels get `is-armed → draw rule (≈620 ms) → flash → is-shown → is-settled`
  (1.3 s later), staggered 55–110 ms.

## Pass 3: mineenim.vercel.app "about" rows (2026-10-24)

Source: the shipped Vite bundle (`/assets/index-*.js` + `.css`), read directly. REA was unavailable.

- **Data:** rows of `{ label, items[], loop }`. The visual list is `aria-hidden`, and a visually
  hidden sentence carries the same content for screen readers.
- **Layout:** each row is a grid `minmax(9rem,17rem) | 1fr`. The `dt` shows a CSS counter
  (`01`) plus the label. The illustration sits in the same first cell, placed `center end`, at
  `clamp(6.5rem, 9.7vw, 8.75rem)` wide. Words use `--f: clamp(2.5rem, 5.8vw, 6.5rem)`.
- **Letter roll:** every character is two stacked spans, and the second is absolutely positioned at
  `inset: 100% 0 auto`. On hover GSAP moves them to `yPercent -100` (0.5 s, 14 ms stagger), so
  each letter swaps to an uppercase UI face. Every second item is drawn as outline text
  (`-webkit-text-stroke: 1.5px`).
- **Loop row:** two copies of the set inside a track, tweened `xPercent -50` over 48 s with linear
  easing on repeat. Separators are accent dots sized `0.12 × --f`.
- **Entrance:** rows clip in from `inset(0 0 100% 0)` (stagger 0.14 s). Illustrations pop from
  `scale 0, rotate -25°`. On hover an illustration lifts `y -10, rotate 8°, scale 1.1`.
- **Ours:**
  - Done in CSS: transitions with `--c` delays, plus a keyframe marquee that pauses on hover.
  - The roll face is Departure Mono in the accent colour.
  - The illustrations are drawn new: a swim ring with z's, an iced matcha latte, and headphones.
  - The reveal observes the row wrapper, because Chrome's IntersectionObserver never reports a
    fully clip-pathed element as intersecting.
