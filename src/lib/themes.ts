// The three "eras" of LELE.OS. Each one re-skins the same layout through the
// CSS custom properties defined in globals.css (html[data-theme="..."]).

export const THEMES = [
  { id: "retro", label: "Retro", hint: "Windows 98 · bevels" },
  { id: "garage", label: "Garage", hint: "Dark garage · terminal" },
  { id: "claude", label: "Claude", hint: "Warm paper · with Clawd" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "garage";
export const THEME_STORAGE_KEY = "lele-theme";
export const BOOT_STORAGE_KEY = "lele-booted";

export const isThemeId = (value: unknown): value is ThemeId =>
  THEMES.some((t) => t.id === value);
