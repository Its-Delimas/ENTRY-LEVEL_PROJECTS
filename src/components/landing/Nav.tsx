"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#try", label: "Try it" },
  { href: "#tracks", label: "Tracks" },
  { href: "/dashboard", label: "My learning" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "nav-scrolled" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/65 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <motion.a
          href="/tracks"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
        >
          Start learning
        </motion.a>
      </div>
    </motion.header>
  );
}
