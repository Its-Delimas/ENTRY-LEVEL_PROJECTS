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
        d="M16 6.5 L18.4 13.6 L25.5 16 L18.4 18.4 L16 25.5 L13.6 18.4 L6.5 16 L13.6 13.6 Z"
        fill="var(--color-lime)"
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
