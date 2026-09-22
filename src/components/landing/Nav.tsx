import Link from "next/link";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#missions", label: "Missions" },
  { href: "#projects", label: "Projects" },
];

export default function Nav() {
  return (
    <header className="border-b border-navy/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold text-navy">
          Nurulabs
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/70 transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="/lesson/rainfall-yield"
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal"
        >
          Try a mission free
        </Link>
      </div>
    </header>
  );
}
