"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/report", label: "Report", emoji: "📝" },
  { href: "/heatmap", label: "Heatmap", emoji: "🗺️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <aside className={`h-dvh ${open ? "w-64" : "w-16"} shrink-0 border-r bg-white/70 backdrop-blur transition-all dark:bg-black/30`}>
      <div className="flex items-center justify-between px-4 py-5">
        <div className="text-lg font-semibold">TS</div>
        <button
          className="rounded border px-2 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {open ? "«" : "»"}
        </button>
      </div>
      <nav className="px-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                active ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : ""
              }`}
            >
              <span className="text-base" aria-hidden>
                {item.emoji}
              </span>
              {open && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


