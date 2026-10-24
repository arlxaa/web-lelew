import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import "@/styles/chrome.css";
import "@/styles/desktop.css";
import "@/styles/apps.css";
import "@/styles/sections.css";
import { profile } from "@/content/profile";
import { BOOT_STORAGE_KEY, DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import { OSProvider } from "@/components/OSProvider";
import BootScreen from "@/components/chrome/BootScreen";
import TopBar from "@/components/chrome/TopBar";
import CommandPalette from "@/components/chrome/CommandPalette";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — LELE.OS`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

// Runs before paint: restores the saved theme and skips the boot screen
// for returning visitors (same session) or reduced-motion users.
const prePaint = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');d.dataset.theme=(t==='glass'||t==='garage'||t==='claude')?t:'${DEFAULT_THEME}';if(sessionStorage.getItem('${BOOT_STORAGE_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.boot='done';}catch(e){d.dataset.theme='${DEFAULT_THEME}';}d.dataset.js='1';})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <noscript>
          <style>{`.boot{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <OSProvider>
          <BootScreen />
          <TopBar />
          <main id="main">{children}</main>
          <CommandPalette />
        </OSProvider>
      </body>
    </html>
  );
}
