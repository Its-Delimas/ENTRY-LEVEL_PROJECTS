import Link from "next/link";
import Logo from "@/components/landing/Logo";
import Sidebar from "./Sidebar";

/** Layout for the signed-in-feeling side of the app: dashboard and tracks. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream md:flex-row">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-5 py-4 md:hidden">
        <Logo />
        <nav className="flex items-center gap-4 text-sm font-medium text-ink/60">
          <Link href="/dashboard">Home</Link>
          <Link href="/tracks">Tracks</Link>
        </nav>
      </header>
      <Sidebar />
      <main className="w-full min-w-0 flex-1 px-5 py-8 md:px-8">{children}</main>
    </div>
  );
}
