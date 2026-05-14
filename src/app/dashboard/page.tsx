// DAY 10: SEO-friendly route /dashboard
// Server Component — no 'use client' needed
// PERF: No duplicate Header/Sidebar — each page has its own layout wrapper
// SEO: /dashboard is descriptive and meaningful

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Main dashboard with KPI overview, recent activity, and quick navigation.',
  openGraph: {
    title: 'Dashboard | React Next.js Plan',
    description: 'KPI overview, recent activity and quick navigation.',
    type: 'website',
  },
};

const KPI_CARDS = [
  { title: 'Total Users', value: '1,284', change: '+12%', status: 'success' as const, statusLabel: 'Active', icon: '👥' },
  { title: 'Pending Reviews', value: '48', change: '+5%', status: 'warning' as const, statusLabel: 'Pending', icon: '📋' },
  { title: 'Active Sessions', value: '320', change: '+8%', status: 'info' as const, statusLabel: 'Live', icon: '🟢' },
  { title: 'Failed Jobs', value: '7', change: '-3%', status: 'error' as const, statusLabel: 'Error', icon: '⚠️' },
];

const RECENT_ACTIVITY = [
  { id: 'a1', user: 'Alice Johnson', action: 'Added a new user', time: '2 min ago', status: 'success' as const },
  { id: 'a2', user: 'Bob Smith', action: 'Updated profile settings', time: '15 min ago', status: 'info' as const },
  { id: 'a3', user: 'Carol White', action: 'Login from new device', time: '1 hr ago', status: 'warning' as const },
  { id: 'a4', user: 'David Brown', action: 'Failed login attempt', time: '2 hr ago', status: 'error' as const },
  { id: 'a5', user: 'Eva Martinez', action: 'Exported user report', time: '3 hr ago', status: 'success' as const },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Welcome back — here is what is happening today
          </p>

          {/* KPI Cards */}
          <section aria-labelledby="kpi-heading" className="mb-10">
            <h2
              id="kpi-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {KPI_CARDS.map((kpi) => (
                <div
                  key={kpi.title}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span aria-hidden="true" className="text-2xl">
                      {kpi.icon}
                    </span>
                    <Badge label={kpi.statusLabel} variant={kpi.status} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {kpi.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {kpi.title}
                    </p>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {kpi.change} from last month
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <section aria-labelledby="activity-heading" className="lg:col-span-2">
              <h2
                id="activity-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Recent Activity
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {RECENT_ACTIVITY.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                        {item.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.user}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.action}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge label={item.status} variant={item.status} />
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="actions-heading">
              <h2
                id="actions-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Quick Actions
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
                {[
                  { label: 'Add New User', href: '/day5', variant: 'primary' as const },
                  { label: 'View All Users', href: '/users', variant: 'secondary' as const },
                  { label: 'View Reports', href: '/day7', variant: 'ghost' as const },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <Button
                      label={action.label}
                      variant={action.variant}
                      fullWidth
                    />
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}