import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink/50 md:flex-row">
        <Logo />
        <p>Hands-on AI &amp; ML education, built for African students.</p>
      </div>
    </footer>
  );
}
