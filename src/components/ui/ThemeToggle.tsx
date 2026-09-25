"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "nurulabs:theme";
const EVENT = "nurulabs:theme-change";

/** Runs before first paint (see layout.tsx) so the saved theme never flashes. */
export const themeInitScript = `try{if(localStorage.getItem("${STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

function current(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  if (theme === "dark") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked — the choice just won't persist.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** Light / Dark switch. Light is the default. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, current, () => "light");
  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
  ];

  return (
    <div role="radiogroup" aria-label="Colour theme" className="inline-flex rounded-xl bg-ink/5 p-1">
      {options.map((o) => {
        const active = theme === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(o.value)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              active ? "bg-paper text-ink shadow-sm ring-1 ring-ink/10" : "text-ink/50 hover:text-ink"
            }`}
          >
            <o.icon size={13} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
