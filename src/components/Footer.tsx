import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <a href="#top" className="text-lg font-bold text-white text-glow">
          {profile.nickname}
          <span className="text-glow">.</span>
        </a>
        <p className="text-sm text-slate-500">
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="text-xs text-slate-600">
          Built with Next.js, TypeScript &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
