export default function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3">
        <span className="twinkle accent-dot inline-block h-1.5 w-1.5 flex-none rounded-full" aria-hidden />
        <span className="mono text-[11px] font-semibold uppercase tracking-[0.25em] text-glow-soft">
          {kicker}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-glow/40 to-transparent" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold text-white text-glow sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
