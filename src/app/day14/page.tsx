
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Day14ClientDemo from '@/app/day14/Day14ClientDemo';

export const metadata: Metadata = {
  title: 'Day 14 — Performance & Web Vitals',
  description:
    'Core Web Vitals checklist, SEO audit, Tailwind cleanup, and bundle size analysis.',
  openGraph: {
    title: 'Day 14 — Performance & Web Vitals',
    description: 'LCP, CLS, INP, FCP, TTFB checks and SEO audit.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Day 14 — Performance and Web Vitals checklist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day 14 — Performance & Web Vitals',
    description: 'Core Web Vitals and SEO audit for Next.js project.',
  },
  alternates: {
    canonical: 'https://react-nextjs-plan.vercel.app/day14',
  },
};

const WEB_VITALS = [
  {
    metric: 'LCP',
    name: 'Largest Contentful Paint',
    good: '< 2.5s',
    desc: 'Time for the largest visible element to load. Fix by optimizing images with next/image, reducing server response time.',
    fix: 'Use next/image with priority prop on hero images',
  },
  {
    metric: 'CLS',
    name: 'Cumulative Layout Shift',
    good: '< 0.1',
    desc: 'Measures visual stability. Elements should not move around after page loads.',
    fix: 'Always set width and height on images. Avoid inserting content above existing content.',
  },
  {
    metric: 'INP',
    name: 'Interaction to Next Paint',
    good: '< 200ms',
    desc: 'Responsiveness to user interactions. Long JS tasks block the main thread.',
    fix: 'Avoid heavy JS in event handlers. Use useCallback and useMemo correctly.',
  },
  {
    metric: 'FCP',
    name: 'First Contentful Paint',
    good: '< 1.8s',
    desc: 'Time until first content appears. Affected by render-blocking resources.',
    fix: 'Use Server Components. Minimize critical CSS. Avoid large blocking scripts.',
  },
  {
    metric: 'TTFB',
    name: 'Time to First Byte',
    good: '< 800ms',
    desc: 'Time from request to first byte of response from server.',
    fix: 'Use Vercel edge network. Enable caching. Reduce server computation.',
  },
];

const SEO_CHECKLIST = [
  { item: 'Page title added to every page', done: true },
  { item: 'Meta description added to every page', done: true },
  { item: 'Proper heading structure — one H1 per page', done: true },
  { item: 'H2 and H3 used for sub-sections', done: true },
  { item: 'Semantic HTML — header, main, nav, aside, section', done: true },
  { item: 'Image alt text on all meaningful images', done: true },
  { item: 'Open Graph metadata added', done: true },
  { item: 'Twitter card metadata added', done: true },
  { item: 'Canonical URL added for important pages', done: true },
  { item: 'Dynamic metadata for /users/[id] pages', done: true },
  { item: 'SEO-friendly routes — /users, /dashboard', done: true },
  { item: 'not-found.tsx page with navigation', done: true },
  { item: 'aria-label on interactive elements', done: true },
  { item: 'role="status" on Spinner', done: true },
  { item: 'Meaningful button text — no "click here"', done: true },
];

const TAILWIND_CLEANUP = [
  {
    title: 'Moved repeated classes into Button atom',
    before: '"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"',
    after: '<Button variant="primary" />',
  },
  {
    title: 'Moved repeated classes into FormField atom',
    before: '"w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"',
    after: '<FormField id="..." label="..." />',
  },
  {
    title: 'Moved repeated classes into Card molecule',
    before: '"bg-white rounded-xl border border-gray-200 shadow-sm p-5"',
    after: '<Card title="..." description="..." />',
  },
  {
    title: 'Moved repeated classes into StatusBadge',
    before: '"bg-green-100 text-green-800 rounded-full px-2.5 py-1 text-xs"',
    after: '<StatusBadge status="active" />',
  },
  {
    title: 'Design tokens in globals.css @theme',
    before: '"#2563eb" hardcoded in multiple files',
    after: 'bg-primary, text-primary from --color-primary token',
  },
];

const PERFORMANCE_CHECKLIST = [
  { item: 'Server Components used by default', done: true },
  { item: 'Client Components only where state/events needed', done: true },
  { item: 'useCallback on stable function references', done: true },
  { item: 'useMemo on expensive calculations', done: true },
  { item: 'useEffect cleanup functions added', done: true },
  { item: 'Debounce on search input — Day 7', done: true },
  { item: 'usePagination with useEffect (not useMemo) reset', done: true },
  { item: 'Context split into Auth and Theme', done: true },
  { item: 'generateStaticParams for /users/[id]', done: true },
  { item: 'No duplicate API calls in useUsers hook', done: true },
  { item: 'cancelled flag in useUsers to prevent state leak', done: true },
  { item: 'loading.tsx for route-level loading UI', done: true },
  { item: 'error.tsx for route-level error handling', done: true },
  { item: 'not-found.tsx for missing pages', done: true },
  { item: 'No console.log in production code', done: true },
];

export default function Day14Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 14 — Performance & Web Vitals
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Core Web Vitals · SEO audit · Tailwind cleanup · Bundle analysis
          </p>

          {/* Web Vitals */}
          <section aria-labelledby="vitals-heading" className="mb-10">
            <h2
              id="vitals-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Core Web Vitals
            </h2>
            <div className="flex flex-col gap-3">
              {WEB_VITALS.map((vital) => (
                <div
                  key={vital.metric}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
                >
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-sm">
                        {vital.metric}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {vital.name}
                        </h3>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                          Good: {vital.good}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {vital.desc}
                      </p>
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-green-600 flex-shrink-0">→</span>
                        <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                          Fix: {vital.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tailwind cleanup */}
          <section aria-labelledby="cleanup-heading" className="mb-10">
            <h2
              id="cleanup-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Tailwind Cleanup — Repeated Classes Moved to Components
            </h2>
            <div className="flex flex-col gap-3">
              {TAILWIND_CLEANUP.map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-red-600 mb-1">Before</p>
                      <code className="text-xs text-red-700 dark:text-red-300 break-all">
                        {item.before}
                      </code>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-600 mb-1">After</p>
                      <code className="text-xs text-green-700 dark:text-green-300 break-all">
                        {item.after}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Web Vitals demo */}
          <section aria-labelledby="live-heading" className="mb-10">
            <h2
              id="live-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Live Performance Checks
            </h2>
            <Day14ClientDemo />
          </section>

          {/* Checklists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <section aria-labelledby="seo-checklist-heading">
              <h2
                id="seo-checklist-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                SEO Checklist
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {SEO_CHECKLIST.map((item) => (
                    <li
                      key={item.item}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <span
                        className={[
                          'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                          item.done
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400',
                        ].join(' ')}
                      >
                        {item.done ? '✓' : '○'}
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {item.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="perf-checklist-heading">
              <h2
                id="perf-checklist-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Performance Checklist
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {PERFORMANCE_CHECKLIST.map((item) => (
                    <li
                      key={item.item}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <span
                        className={[
                          'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                          item.done
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400',
                        ].join(' ')}
                      >
                        {item.done ? '✓' : '○'}
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {item.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

        </main>
      </div>
    </div>
  );
}