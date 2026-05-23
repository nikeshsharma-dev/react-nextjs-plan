
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Day13ClientDemo from '@/app/day13/Day13ClientDemo';

export const metadata: Metadata = {
  title: 'Day 13 — Loading, Error & Not Found',
  description:
    'Next.js special files — loading.tsx, error.tsx, not-found.tsx for better route-level UX.',
};

const SPECIAL_FILES = [
  {
    file: 'loading.tsx',
    route: 'Any route',
    trigger: 'Shown automatically during page navigation or data fetching',
    tailwind: 'animate-pulse skeleton blocks with gray background',
    perf: 'Instant perceived performance — user sees content outline immediately',
    icon: '⏳',
    color: 'blue',
  },
  {
    file: 'error.tsx',
    route: 'Any route',
    trigger: 'Shown when a runtime error occurs inside the route segment',
    tailwind: 'Red icon, error message, retry button, back to dashboard link',
    perf: 'Isolates errors — rest of app still works, only broken route shows error',
    icon: '⚠️',
    color: 'red',
  },
  {
    file: 'not-found.tsx',
    route: '/anything-invalid',
    trigger: 'notFound() call or unmatched URL',
    tailwind: '404 visual, description, navigation links to real pages',
    perf: 'User never sees blank page — always has a path forward',
    icon: '🚫',
    color: 'orange',
  },
];

export default function Day13Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 13 — Loading, Error & Not Found
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            loading.tsx · error.tsx · not-found.tsx — route-level UX
          </p>

          {/* Special files overview */}
          <section aria-labelledby="files-heading" className="mb-8">
            <h2
              id="files-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Next.js Special Files
            </h2>
            <div className="flex flex-col gap-4">
              {SPECIAL_FILES.map((item) => {
                const colorMap = {
                  blue:   { badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',   border: 'border-blue-200 dark:border-blue-800',   bg: 'bg-blue-50 dark:bg-blue-900/10'   },
                  red:    { badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',       border: 'border-red-200 dark:border-red-800',     bg: 'bg-red-50 dark:bg-red-900/10'     },
                  orange: { badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800', bg: 'bg-orange-50 dark:bg-orange-900/10' },
                };
                const c = colorMap[item.color as keyof typeof colorMap];

                return (
                  <div
                    key={item.file}
                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span aria-hidden="true" className="text-2xl flex-shrink-0">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <code className={`text-xs font-bold px-2 py-1 rounded ${c.badge}`}>
                            {item.file}
                          </code>
                          <span className="text-xs text-gray-400">→</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.route}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className={`rounded-lg border p-3 ${c.bg} ${c.border}`}>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              When triggered
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.trigger}
                            </p>
                          </div>
                          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Tailwind UI
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.tailwind}
                            </p>
                          </div>
                          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-3">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Performance benefit
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.perf}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Live demos */}
          <section aria-labelledby="demo-heading" className="mb-8">
            <h2
              id="demo-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Live UI Demos
            </h2>
            <Day13ClientDemo />
          </section>

          {/* Try the pages */}
          <section aria-labelledby="try-heading">
            <h2
              id="try-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Try These Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: 'Not Found Page',
                  href: '/this-page-does-not-exist',
                  desc: 'Visit a non-existent route to see not-found.tsx',
                  icon: '🚫',
                  color: 'border-orange-200 dark:border-orange-800 hover:border-orange-400',
                },
                {
                  label: 'User Not Found',
                  href: '/users/u999',
                  desc: 'Visit /users/u999 — notFound() called from server component',
                  icon: '👤',
                  color: 'border-red-200 dark:border-red-800 hover:border-red-400',
                },
                {
                  label: 'Loading State',
                  href: '/dashboard',
                  desc: 'Navigate to dashboard — see loading.tsx briefly',
                  icon: '⏳',
                  color: 'border-blue-200 dark:border-blue-800 hover:border-blue-400',
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex flex-col gap-3 p-5 bg-white dark:bg-gray-900 rounded-xl border shadow-sm transition-all hover:shadow-md ${item.color}`}
                >
                  <span aria-hidden="true" className="text-2xl">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    Try it →
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}