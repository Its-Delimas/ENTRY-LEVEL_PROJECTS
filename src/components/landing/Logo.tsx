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
      <rect width="32" height="32" rx="9" fill="var(--color-ink)" />
      <path
        d="M9.5 23.5 L9.5 8.5 L22.5 23.5 L22.5 8.5"
        stroke="var(--color-lime)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({
  withWordmark = true,
  className = "",
}: {
  withWordmark?: boolean;
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
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Nurulabs
        </span>
      )}
    </Link>
  );
}
