import Link from "next/link";

function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="var(--color-onlime)" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke="var(--color-ink)" strokeOpacity="0.12" />
      {/* rays */}
      <path
        d="M16 6.5 V9.5 M10.8 8.3 L12.6 10.6 M21.2 8.3 L19.4 10.6"
        stroke="var(--color-lime)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* sun rising over the horizon */}
      <path d="M9 21 A7 7 0 0 1 23 21 Z" fill="var(--color-lime)" />
      <path
        d="M6.5 21 H25.5"
        stroke="var(--color-lime)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  withWordmark = true,
  light = false,
  className = "",
}: {
  withWordmark?: boolean;
  /** White wordmark, for dark backgrounds. */
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Nurulabs home"
    >
      <Mark />
      {withWordmark && (
        <span className={`font-display text-lg font-semibold tracking-tight transition-colors ${light ? "text-white" : "text-ink"}`}>
          Nurulabs
        </span>
      )}
    </Link>
  );
}
