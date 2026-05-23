// DAY 15: User detail page — dynamic route
// PERF: Server Component — no client fetch
// SEO: Dynamic metadata per user

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_USERS } from '@/app/data/mockUsers';
import StatusBadge from '@/components/molecules/StatusBadge';
import Badge from '@/components/atoms/Badge';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = MOCK_USERS.find((u: typeof MOCK_USERS[0]) => u.id === id);

  if (!user) {
    return { title: 'User Not Found', description: 'This user does not exist.' };
  }

  return {
    title: `${user.name}`,
    description: `Profile of ${user.name} — ${user.role} — ${user.status}`,
    alternates: {
      canonical: `https://react-nextjs-plan.vercel.app/day15/users/${user.id}`,
    },
    openGraph: {
      title: `${user.name} — User Profile`,
      description: `${user.role} · ${user.status}`,
      type: 'profile',
    },
  };
}

export async function generateStaticParams() {
  return MOCK_USERS.map((u: typeof MOCK_USERS[0]) => ({ id: u.id }));
}

const ACTIVITY = [
  { id: 'a1', action: 'Logged in', time: '2 hours ago', icon: '🔐' },
  { id: 'a2', action: 'Updated profile', time: '1 day ago', icon: '✏️' },
  { id: 'a3', action: 'Exported report', time: '3 days ago', icon: '📤' },
  { id: 'a4', action: 'Changed password', time: '1 week ago', icon: '🔑' },
];

const roleVariant: Record<string, 'error' | 'warning' | 'info'> = {
  Admin: 'error' as const,
  Editor: 'warning' as const,
  Viewer: 'info' as const,
};

export default async function Day15UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = MOCK_USERS.find((u: typeof MOCK_USERS[0]) => u.id === id);

  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/day15" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
          <li>
            <Link href="/day15/users" className="hover:text-primary transition-colors">
              Users
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
          <li className="text-gray-900 dark:text-white font-medium truncate">
            {user.name}
          </li>
        </ol>
      </nav>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.name}
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/day15/users/${user.id}/edit`}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Edit User
          </Link>
          <Link
            href="/day15/users"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile card */}
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="sr-only">User Profile</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center gap-4 text-center">
            <div
              role="img"
              aria-label={`${user.name} profile avatar`}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl"
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Badge label={user.role} variant={roleVariant[user.role]} />
              <StatusBadge status={user.status} />
            </div>
            <dl className="w-full pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2 text-sm">
              {[
                { label: 'User ID', value: user.id },
                { label: 'Role', value: user.role },
                { label: 'Status', value: user.status },
                { label: 'Joined', value: new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">{item.label}</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Details + Activity */}
        <div className="lg:col-span-2 flex flex-col gap-5">

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
                  { label: 'Email', value: user.email },
                  { label: 'Role', value: user.role },
                  { label: 'Status', value: user.status },
                  { label: 'Member Since', value: new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <dt className="w-36 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
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
                {ACTIVITY.map((log) => (
                  <li
                    key={log.id}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <span aria-hidden="true" className="text-xl flex-shrink-0">
                      {log.icon}
                    </span>
                    <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
                      {log.action}
                    </p>
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

    </div>
  );
}