"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

function getInitial(): Mode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("ts-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("ts-theme", mode);
  }, [mode]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      className="rounded border px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}


