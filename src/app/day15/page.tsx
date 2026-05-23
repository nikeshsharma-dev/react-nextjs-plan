// DAY 15: Final project — User Management Dashboard
// SEO: Full metadata, OG, Twitter, canonical, semantic HTML
// PERF: Server Component — direct data access, no client fetch
// Tailwind: Consistent theme, responsive, dark/light mode

import { Metadata } from 'next';
import Link from 'next/link';
import { MOCK_USERS } from '@/app/data/mockUsers';
import Badge from '@/components/atoms/Badge';
import StatusBadge from '@/components/molecules/StatusBadge';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'User Management Dashboard — overview of all users, KPIs, and recent activity.',
  alternates: {
    canonical: 'https://react-nextjs-plan.vercel.app/day15',
  },
};

export default function Day15DashboardPage() {
  const users = MOCK_USERS;
  const total = users.length;
  const active = users.filter((u: { status: string; }) => u.status === 'active').length;
  const inactive = users.filter((u: { status: string; }) => u.status === 'inactive').length;
  const pending = users.filter((u: { status: string; }) => u.status === 'pending').length;

  const KPI_CARDS = [
    { title: 'Total Users', value: total, icon: '👥', status: 'info' as const, statusLabel: 'All' },
    { title: 'Active Users', value: active, icon: '🟢', status: 'success' as const, statusLabel: 'Active' },
    { title: 'Inactive Users', value: inactive, icon: '⚪', status: 'muted' as const, statusLabel: 'Inactive' },
    { title: 'Pending Users', value: pending, icon: '🕐', status: 'warning' as const, statusLabel: 'Pending' },
  ];

  return (
    <div className="flex flex-col gap-8">

      {/* SEO: one H1 */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            User Management — Day 15 Final Project
          </p>
        </div>
        <Link
          href="/day15/users/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          + Add New User
        </Link>
      </div>

      {/* KPI Cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map((kpi) => (
            <div
              key={kpi.title}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="text-2xl">{kpi.icon}</span>
                <Badge label={kpi.statusLabel} variant={kpi.status} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {kpi.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Users + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent users */}
        <section aria-labelledby="recent-heading" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2
              id="recent-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200"
            >
              Recent Users
            </h2>
            <Link
              href="/day15/users"
              className="text-xs text-primary font-medium hover:underline"
            >
              View all users →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.slice(0, 6).map((user: any) => (
                <li key={user.id}>
                  <Link
                    href={`/day15/users/${user.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      role="img"
                      aria-label={`${user.name} avatar`}
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0"
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-medium hidden sm:inline">
                        {user.role}
                      </span>
                      <StatusBadge status={user.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick Links */}
        <section aria-labelledby="quicklinks-heading">
          <h2
            id="quicklinks-heading"
            className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
          >
            Quick Actions
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
            {[
              { label: 'View All Users', href: '/day15/users', icon: '👥', desc: 'Search, filter, paginate' },
              { label: 'Add New User', href: '/day15/users/add', icon: '➕', desc: 'Create a new user account' },
              { label: 'Dashboard', href: '/dashboard', icon: '🏠', desc: 'Main project dashboard' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <span aria-hidden="true" className="text-xl flex-shrink-0">
                  {action.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {action.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}