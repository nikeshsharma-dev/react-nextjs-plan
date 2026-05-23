
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">

      {/* Header skeleton */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="w-32 h-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="w-16 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex flex-1">

        {/* Sidebar skeleton */}
        <div className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
          <div className="mb-8">
            <div className="w-28 h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 p-8">

          {/* Page title skeleton */}
          <div className="mb-8">
            <div className="w-64 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mb-2" />
            <div className="w-48 h-4 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="w-16 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="w-20 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="w-full h-4 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-24 h-3 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Table header */}
            <div className="flex gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {[120, 160, 80, 80, 100].map((w, i) => (
                <div
                  key={i}
                  className="h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
                  style={{ width: w, animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            {/* Table rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
                <div className="w-32 h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="w-40 h-4 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-16 h-4 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-16 h-5 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}