import Link from "next/link";
import { LayoutGrid, Globe } from "lucide-react";
import Logo from "@/components/landing/Logo";

export default function Sidebar() {
  return (
    <aside className="hidden w-20 shrink-0 py-6 pl-6 md:block">
      <div className="flex h-full flex-col items-center rounded-3xl bg-ink py-6">
        <Logo withWordmark={false} />

        <nav className="mt-10 flex flex-col items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink">
            <LayoutGrid size={18} />
          </span>
          <Link
            href="/"
            title="Back to nurulabs.com"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Globe size={18} />
          </Link>
        </nav>
      </div>
    </aside>
  );
}
