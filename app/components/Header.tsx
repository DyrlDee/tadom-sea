"use client";

import { usePathname, useRouter } from "next/navigation";

function useTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname.startsWith("/report")) return "Report Pollution";
  if (pathname.startsWith("/heatmap")) return "Pollution Heatmap";
  return "TadomSea";
}

export default function Header({ title }: { title?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const defaultTitle = useTitle(pathname);
  const pageTitle = title ?? defaultTitle;
  
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-white/95 px-6 py-4 backdrop-blur-sm border-b border-gray-200/60">
      <div className="flex items-center gap-4">
        {pathname !== "/" && (
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost inline-flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {pageTitle}
          </h1>
          {pathname === "/" && (
            <p className="text-sm text-gray-600 mt-0.5">
              Track and visualize plastic pollution reports
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Header actions can be added here if needed */}
      </div>
    </header>
  );
}


