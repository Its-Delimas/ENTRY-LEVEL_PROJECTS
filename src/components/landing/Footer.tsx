import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/tracks", label: "Choose a track" },
      { href: "/tracks/python-for-ai", label: "Python for AI" },
      { href: "/tracks/ai-ml", label: "AI & Machine Learning" },
      { href: "/placement/python-for-ai", label: "Python placement check" },
    ],
  },
  {
    title: "Nurulabs",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#try", label: "Try an interactive" },
      { href: "/#free", label: "Why it's free" },
      { href: "/dashboard", label: "My learning" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Africa&apos;s hands-on AI academy. Free to learn, starting with Python for AI.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-white/35">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-lime">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/35">
          Photography from Unsplash — credits in <code className="font-mono">public/images/CREDITS.md</code>.
        </p>
      </div>
    </footer>
  );
}
