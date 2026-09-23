export default function GreetingIllustration({ dark = false }: { dark?: boolean }) {
  const body = dark ? "var(--color-paper)" : "var(--color-ink)";
  const screen = dark ? "var(--color-ink)" : "var(--color-paper)";
  const muted = dark ? "var(--color-paper)" : "var(--color-ink)";

  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="6" y="80" width="108" height="4" rx="2" fill={body} opacity="0.15" />
      <rect x="34" y="70" width="52" height="6" rx="2" fill={body} />
      <path d="M40 30 H80 a4 4 0 0 1 4 4 V66 H36 V34 a4 4 0 0 1 4 -4 Z" fill={body} />
      <rect x="44" y="36" width="32" height="24" rx="2" fill={screen} />
      <rect x="48" y="41" width="14" height="2.5" rx="1.25" fill="var(--color-lime)" />
      <rect x="48" y="47" width="22" height="2.5" rx="1.25" fill={muted} opacity="0.3" />
      <rect x="48" y="53" width="10" height="2.5" rx="1.25" fill={muted} opacity="0.3" />
      <circle cx="60" cy="14" r="9" fill={body} />
      <path d="M40 34 C40 22 48 16 60 16 C72 16 80 22 80 34" fill={body} />
      <path
        d="M100 20 L102 26 L108 28 L102 30 L100 36 L98 30 L92 28 L98 26 Z"
        fill="var(--color-lime)"
      />
    </svg>
  );
}
