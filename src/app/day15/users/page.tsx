// DAY 15: User list with search, filter, pagination
// PERF: Server Component shell + Client Component for interactivity
// SEO: Proper heading, semantic table, descriptive links

import { Metadata } from 'next';
import Day15UsersClient from '@/app/day15/users/Day15UsersClient';

export const metadata: Metadata = {
  title: 'Users',
  description: 'View, search, filter, and manage all users.',
  alternates: {
    canonical: 'https://react-nextjs-plan.vercel.app/day15/users',
  },
};

export default function Day15UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Users
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search, filter, and manage all users in the system
        </p>
      </div>
      <Day15UsersClient />
    </div>
  );
}