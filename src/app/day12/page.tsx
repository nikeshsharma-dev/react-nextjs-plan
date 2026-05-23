
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Day12ClientDemo from '@/app/day12/Day12ClientDemo';

export const metadata: Metadata = {
  title: 'Day 12 — Server & Client Components',
  description:
    'Practice Server and Client Components in Next.js App Router with real examples.',
  openGraph: {
    title: 'Day 12 — Server & Client Components',
    description: 'Server Components by default, Client Components only when needed.',
    type: 'website',
    // SEO: alt text equivalent for OG image
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Day 12 — Server and Client Components in Next.js',
      },
    ],
  },
};

// SERVER COMPONENT — runs on server, no 'use client'
// Can directly access data without useEffect
const SERVER_DATA = [
  { id: 's1', name: 'Alice Johnson', role: 'Admin', joined: '2024-01-15', avatar: 'A' },
  { id: 's2', name: 'Bob Smith', role: 'Editor', joined: '2024-02-20', avatar: 'B' },
  { id: 's3', name: 'Carol White', role: 'Viewer', joined: '2024-03-10', avatar: 'C' },
  { id: 's4', name: 'David Brown', role: 'Editor', joined: '2024-04-05', avatar: 'D' },
];

// This entire component runs on the server
function ServerUserList() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Server Component — User List
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Data fetched on server — no useEffect, no loading state needed
        </p>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {SERVER_DATA.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {/* DAY 12 SEO: meaningful alt text on avatar images */}
            <div
              role="img"
              aria-label={`${user.name} avatar`}
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0"
            >
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.role} · Joined {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-medium flex-shrink-0">
              {user.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Day12Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* DAY 12 Tailwind: Responsive layout
          - Mobile: sidebar hidden, full width content
          - Tablet: sidebar visible, content beside it
          - Desktop: wider sidebar, more content space
      */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 12 — Server & Client Components
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Server Components by default · Client Components only when needed
          </p>

          {/* Decision guide */}
          <section aria-labelledby="decision-heading" className="mb-8">
            <h2
              id="decision-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              When to use Server vs Client
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Server Component rules */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs text-green-600 font-bold">
                    S
                  </span>
                  <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Server Component — Default
                  </h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    'Fetching data from API or database',
                    'Displaying static or server-side content',
                    'No interactivity needed',
                    'SEO-critical content',
                    'Large dependencies — kept off client bundle',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <code className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    No directive needed — default
                  </code>
                </div>
              </div>

              {/* Client Component rules */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs text-blue-600 font-bold">
                    C
                  </span>
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Client Component — Only When Needed
                  </h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    'useState or useReducer needed',
                    'useEffect or lifecycle methods',
                    'Browser APIs — window, localStorage',
                    'Event listeners — onClick, onChange',
                    'Third party client-only libraries',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <code className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                    {'// Add at top of file'}<br />
                    {'"use client"'}
                  </code>
                </div>
              </div>

            </div>
          </section>

          {/* Live examples */}
          <section aria-labelledby="examples-heading" className="mb-8">
            <h2
              id="examples-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Live Examples
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Server Component example */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    SERVER
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    No useState, no useEffect — pure server render
                  </span>
                </div>
                {/* This ServerUserList runs entirely on server */}
                <ServerUserList />
              </div>

              {/* Client Component example */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    CLIENT
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Needs useState — marked with use client
                  </span>
                </div>
                {/* Day12ClientDemo is a Client Component */}
                <Day12ClientDemo />
              </div>

            </div>
          </section>

          {/* Component tree diagram */}
          <section aria-labelledby="tree-heading" className="mb-8">
            <h2
              id="tree-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Component Tree — This Page
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <div className="font-mono text-xs leading-7">
                {[
                  { indent: 0, label: 'Day12Page', type: 'server', desc: 'page.tsx — Server Component' },
                  { indent: 1, label: 'Header', type: 'server', desc: 'organisms/Header.tsx' },
                  { indent: 2, label: 'HeaderAuthSection', type: 'client', desc: 'use client — uses useAuth' },
                  { indent: 2, label: 'ThemeToggle', type: 'client', desc: 'use client — uses useTheme' },
                  { indent: 1, label: 'Sidebar', type: 'client', desc: 'use client — uses usePathname' },
                  { indent: 1, label: 'ServerUserList', type: 'server', desc: 'Server Component — no hooks' },
                  { indent: 1, label: 'Day12ClientDemo', type: 'client', desc: 'use client — uses useState' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{ paddingLeft: item.indent * 20 }}
                  >
                    <span className="text-gray-300 dark:text-gray-600">
                      {item.indent > 0 ? '└─' : ''}
                    </span>
                    <span
                      className={[
                        'px-1.5 py-0.5 rounded text-xs font-semibold',
                        item.type === 'server'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                      ].join(' ')}
                    >
                      {item.type === 'server' ? 'S' : 'C'}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">
                      — {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DAY 12 Tailwind: Responsive layout explanation */}
          <section aria-labelledby="responsive-heading">
            <h2
              id="responsive-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Tailwind — Responsive Sidebar + Header Layout
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {[
                  {
                    label: 'Mobile (< 768px)',
                    cls: 'sm:',
                    layout: 'Sidebar hidden\nFull width content\nHamburger menu (Day 13)',
                    color: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
                  },
                  {
                    label: 'Tablet (768px+)',
                    cls: 'md:',
                    layout: 'Sidebar visible w-64\nContent beside sidebar\n2-col grids enabled',
                    color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
                  },
                  {
                    label: 'Desktop (1024px+)',
                    cls: 'lg:',
                    layout: 'Full layout\n3-col grids enabled\nMore whitespace',
                    color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`border rounded-lg p-4 ${item.color}`}
                  >
                    <p className="font-bold mb-1">{item.label}</p>
                    <code className="text-xs opacity-80">{item.cls}</code>
                    <pre className="text-xs mt-2 whitespace-pre-wrap opacity-90">
                      {item.layout}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}