// DAY 11: Dynamic route — /users/[id]

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import StatusBadge from '@/components/molecules/StatusBadge';
import Badge from '@/components/atoms/Badge';
import { MOCK_USERS } from '@/app/data/mockUsers';

interface PageProps {
  params: Promise<{ id: string }>;
}

// DAY 11 SEO: Dynamic metadata — unique per user
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return {
      title: 'User Not Found',
      description: 'The requested user could not be found.',
    };
  }

  return {
    title: `${user.name} — User Detail`,
    description: `View profile for ${user.name} — ${user.role} — Status: ${user.status}.`,
    alternates: {
      canonical: `https://react-nextjs-plan.vercel.app/users/${user.id}`,
    },
    openGraph: {
      title: `${user.name} — User Detail`,
      description: `${user.role} · ${user.status} · Joined ${user.joinedAt}`,
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${user.name} — User Detail`,
      description: `${user.role} · ${user.status}`,
    },
  };
}

// DAY 11 PERF: generateStaticParams — pre-renders all user pages at build time
export async function generateStaticParams() {
  return MOCK_USERS.map((user) => ({ id: user.id }));
}

const ACTIVITY_LOG = [
  { id: 'l1', action: 'Logged in', time: '2 hours ago', icon: '🔐' },
  { id: 'l2', action: 'Updated profile', time: '1 day ago', icon: '✏️' },
  { id: 'l3', action: 'Exported report', time: '3 days ago', icon: '📤' },
  { id: 'l4', action: 'Changed password', time: '1 week ago', icon: '🔑' },
  { id: 'l5', action: 'Account created', time: '2 months ago', icon: '🎉' },
];

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;

  // PERF: Direct lookup — no client fetch, no useEffect
  const user = MOCK_USERS.find((u) => u.id === id);

  // Triggers not-found.tsx (Day 13)
  if (!user) notFound();

  const roleVariant = {
    Admin: 'error' as const,
    Editor: 'warning' as const,
    Viewer: 'info' as const,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li>
                <Link href="/users" className="hover:text-primary transition-colors">
                  Users
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li className="text-gray-900 dark:text-white font-medium">
                {user.name}
              </li>
            </ol>
          </nav>

          {/* SEO: H1 with user name */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {user.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Profile card */}
            <section aria-labelledby="profile-heading" className="lg:col-span-1">
              <h2 id="profile-heading" className="sr-only">User Profile</h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge label={user.role} variant={roleVariant[user.role]} />
                  <StatusBadge status={user.status} />
                </div>
                <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                  {[
                    { label: 'User ID', value: user.id },
                    { label: 'Role', value: user.role },
                   { label: 'Joined', value: user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full flex flex-col gap-2 pt-2">
                  <Link
                    href="/users"
                    className="w-full flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    ← Back to Users
                  </Link>
                </div>
              </div>
            </section>

            {/* Details + Activity */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              <section aria-labelledby="details-heading">
                <h2
                  id="details-heading"
                  className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3"
                >
                  Account Details
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { label: 'Full Name', value: user.name },
                      { label: 'Email Address', value: user.email },
                      { label: 'Role', value: user.role },
                      { label: 'Status', value: user.status },
                      { label: 'Member Since', value: user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                      >
                        <dt className="w-40 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {item.label}
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>

              <section aria-labelledby="activity-heading">
                <h2
                  id="activity-heading"
                  className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3"
                >
                  Recent Activity
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {ACTIVITY_LOG.map((log) => (
                      <li
                        key={log.id}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                      >
                        <span aria-hidden="true" className="text-xl flex-shrink-0">
                          {log.icon}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {log.action}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {log.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

            </div>
          </div>

          {/* Other users */}
          <section aria-labelledby="other-users-heading" className="mt-8">
            <h2
              id="other-users-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Other Users
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MOCK_USERS.filter((u) => u.id !== user.id)
                .slice(0, 4)
                .map((u) => (
                  <Link
                    key={u.id}
                    href={`/users/${u.id}`}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {u.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{u.role}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}