// DAY 10: SEO-friendly /users route — Server Component
// PERF: No useEffect/useState — data used directly (server side)
// SEO: /users is a clean, descriptive, noun-based route

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import StatusBadge from '@/components/molecules/StatusBadge';
import { MOCK_USERS } from '@/app/data/mockUsers';

export const metadata: Metadata = {
  title: 'Users',
  description: 'View and manage all users in the system.',
  alternates: {
    canonical: 'https://react-nextjs-plan.vercel.app/users',
  },
  openGraph: {
    title: 'Users | React Next.js Plan',
    description: 'View and manage all users.',
    type: 'website',
  },
};

export default function UsersPage() {
  // PERF: Direct data access — no useEffect, no useState, no API call on client
  const users = MOCK_USERS;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Users
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {users.length} total users — click a row to view details
              </p>
            </div>
            <Link
              href="/day5"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              + Add New User
            </Link>
          </div>

          <section aria-labelledby="users-table-heading">
            <h2 id="users-table-heading" className="sr-only">
              All Users
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    List of all users in the system
                  </caption>
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      {['Name', 'Email', 'Role', 'Status', 'Joined', 'Action'].map((col) => (
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
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {new Date(user.joinedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/users/${user.id}`}
                            className="text-xs text-primary font-medium hover:underline"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}