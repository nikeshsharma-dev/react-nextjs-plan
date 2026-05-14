// DAY 10: App Router concepts — pages, layout, navigation
// No Header/Sidebar imports needed — comes from layout.tsx
// PERF: layout.tsx renders Header+Sidebar ONCE for all day10 pages
// SEO: explains SEO-friendly routes

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Day 10 — Next.js App Router',
  description:
    'Next.js App Router — pages, layout.tsx, navigation, and SEO-friendly routes.',
};

const APP_ROUTER_CONCEPTS = [
  {
    icon: '📁',
    title: 'File-based Routing',
    desc: 'Every folder with page.tsx inside app/ becomes a route. No router config needed.',
    example: 'app/users/page.tsx → /users',
  },
  {
    icon: '🏗️',
    title: 'layout.tsx — No Duplicate Rendering',
    desc: 'layout.tsx wraps child pages. Header and Sidebar defined once — not repeated in every page.tsx.',
    example: 'app/day10/layout.tsx → wraps day10/page.tsx',
  },
  {
    icon: '⚡',
    title: 'Server Components by Default',
    desc: 'Every page.tsx is a Server Component. Add "use client" only when you need state, effects, or browser APIs.',
    example: 'page.tsx = server | *Client.tsx = client',
  },
  {
    icon: '🔗',
    title: 'Dynamic Routes [param]',
    desc: 'Folder name with [param] creates dynamic routes. generateStaticParams pre-renders all at build time.',
    example: 'app/users/[id]/page.tsx → /users/u1',
  },
  {
    icon: '🔍',
    title: 'generateMetadata',
    desc: 'Async export that returns unique SEO title, description, OG, Twitter per page or per dynamic route.',
    example: 'export async function generateMetadata({ params })',
  },
  {
    icon: '🚫',
    title: 'notFound()',
    desc: 'Call notFound() in a Server Component when data is missing. Renders not-found.tsx automatically.',
    example: "if (!user) notFound()",
  },
];

const SEO_ROUTES = [
  { path: '/dashboard', label: 'Dashboard', seo: 'Noun-based, describes the page purpose' },
  { path: '/users', label: 'Users', seo: 'Noun-based, plural, clean' },
  { path: '/users/[id]', label: 'User Detail', seo: 'Dynamic with generateMetadata per user' },
  { path: '/day2', label: 'Day 2', seo: 'Practice route — sequential naming' },
  { path: '/day10', label: 'Day 10', seo: 'This page — App Router demo' },
];

export default function Day10Page() {
  return (
    <div className="flex flex-col gap-10">

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Day 10 — Next.js App Router
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Pages · Layout · Navigation · SEO-friendly routes · Design tokens
        </p>
      </div>



      {/* App Router Concepts */}
      <section aria-labelledby="concepts-heading">
        <h2
          id="concepts-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          App Router Core Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {APP_ROUTER_CONCEPTS.map((concept) => (
            <div
              key={concept.title}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">
                  {concept.icon}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {concept.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex-1">
                {concept.desc}
              </p>
              <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded break-all">
                {concept.example}
              </code>
            </div>
          ))}
        </div>
      </section>


      {/* SEO Routes */}
      <section aria-labelledby="routes-heading">
        <h2
          id="routes-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          SEO-Friendly Routes
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">SEO-friendly routes in this project</caption>
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {['Route', 'Page', 'SEO Reason', 'Visit'].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {SEO_ROUTES.map((route, i) => (
                  <tr
                    key={route.path}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30 dark:bg-gray-800/10'
                      }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        {route.path}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {route.label}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {route.seo}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {!route.path.includes('[') && (
                        <Link
                          href={route.path}
                          className="text-xs text-primary font-medium hover:underline"
                        >
                          Visit →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}