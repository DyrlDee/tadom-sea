"use client";

import { usePathname, useRouter } from "next/navigation";

function useTitle(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/report")) return "Report";
  if (pathname.startsWith("/heatmap")) return "Heatmap";
  return "TadomSea";
}

export default function Header({ title }: { title?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white/70 px-4 py-3 backdrop-blur dark:bg-black/30">
      <div className="flex items-center gap-3">
        {pathname !== "/" && (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ← Back
          </button>
        )}
        <h1 className="text-base font-semibold">{title ?? useTitle(pathname)}</h1>
      </div>
      <div />
    </header>
  );
}


