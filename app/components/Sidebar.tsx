"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
        />
      </svg>
    ),
  },
  {
    href: "/report",
    label: "Report",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
  },
  {
    href: "/heatmap",
    label: "Heatmap",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`h-dvh ${
        open ? "w-64" : "w-16"
      } shrink-0 border-r border-gray-200/60 bg-white/95 backdrop-blur-sm transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200/60">
        <div
          className={`${open ? "block" : "hidden"} transition-all duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">TadomSea</h2>
              <p className="text-xs text-gray-500">Pollution Tracker</p>
            </div>
          </div>
        </div>
        <button
          className="btn-ghost p-2 rounded-lg"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              !open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={!open ? item.label : undefined}
            >
              <span
                className={`${
                  active ? "text-blue-600" : "text-gray-500"
                } group-hover:text-current transition-colors duration-200`}
              >
                {item.icon}
              </span>
              {open && (
                <span className="transition-all duration-300">
                  {item.label}
                </span>
              )}
              {active && open && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {open && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 font-medium">
            Help protect our environment
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Report pollution incidents to make a difference
          </p>
        </div>
      )}
    </aside>
  );
}
