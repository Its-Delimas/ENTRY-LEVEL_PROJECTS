"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Home, Lock } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { isTrackUnlocked, trackStats, tracks } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const activeTracks = tracks.filter((t) => t.status === "active");

export default function Sidebar() {
  const pathname = usePathname();
  const progress = useProgress();

  const item = (href: string, active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="hidden w-64 shrink-0 p-4 md:block">
      <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-3xl bg-ink px-4 py-7">
        <div className="px-3">
          <Logo withWordmark={false} />
        </div>

        <nav className="mt-10 flex flex-col gap-1">
          <Link href="/dashboard" className={item("/dashboard", pathname === "/dashboard")}>
            <Home size={18} className={pathname === "/dashboard" ? "text-lime" : ""} />
            Home
          </Link>
        </nav>

        <p className="eyebrow mt-8 px-3 text-white/30">Tracks</p>
        <nav className="mt-2 flex flex-col gap-1">
          {activeTracks.map((track) => {
            const href = `/tracks/${track.slug}`;
            const active = pathname === href;
            const unlocked = isTrackUnlocked(track, progress);
            const stats = trackStats(track, progress);
            return (
              <Link key={track.slug} href={href} className={item(href, active)}>
                <span className="flex h-5 w-5 items-center justify-center">
                  {unlocked ? (
                    <span className="relative h-4 w-4">
                      <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                        <circle
                          cx="10" cy="10" r="8" fill="none" stroke="var(--color-lime)" strokeWidth="3"
                          strokeDasharray={`${(stats.percent / 100) * 50.3} 50.3`} strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <Lock size={14} />
                  )}
                </span>
                <span className="truncate">{track.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <Link href="/" className={item("/", false)}>
            <Globe size={18} />
            Back to site
          </Link>
        </div>
      </div>
    </aside>
  );
}
