import Link from "next/link";
import { Home, Target, CalendarDays, Globe } from "lucide-react";
import Logo from "@/components/landing/Logo";

const items = [
  { href: "#top", label: "Home", icon: Home, active: true },
  { href: "#missions", label: "Missions", icon: Target },
  { href: "#activity", label: "Activity", icon: CalendarDays },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 p-4 md:block">
      <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-3xl bg-ink px-5 py-7">
        <div className="px-2">
          <Logo withWordmark={false} />
        </div>

        <nav className="mt-12 flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} className={item.active ? "text-lime" : ""} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Globe size={18} />
            Back to site
          </Link>
        </div>
      </div>
    </aside>
  );
}
