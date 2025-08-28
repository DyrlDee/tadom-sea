export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome to TadomSea</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Help track and visualize plastic pollution reports around Tadom.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/report"
          className="rounded-lg border p-5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <div className="text-xl">📝 Report pollution</div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Submit a location, description, and optional photo.
          </p>
        </a>
        <a
          href="/heatmap"
          className="rounded-lg border p-5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <div className="text-xl">🗺️ View heatmap</div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Explore reported locations on an interactive map.
          </p>
        </a>
      </div>
    </div>
  );
}
