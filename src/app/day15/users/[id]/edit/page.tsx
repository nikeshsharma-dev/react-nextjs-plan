// DAY 15: Edit user page
// SEO: Dynamic title per user

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_USERS } from '@/app/data/mockUsers';
import Day15EditClient from '@/app/day15/users/[id]/edit/Day15EditClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = MOCK_USERS.find((u: typeof MOCK_USERS[0]) => u.id === id);
  return {
    title: user ? `Edit ${user.name}` : 'Edit User',
    description: user ? `Edit profile for ${user.name}` : 'Edit user details.',
  };
}

export async function generateStaticParams() {
  return MOCK_USERS.map((u: typeof MOCK_USERS[0]) => ({ id: u.id }));
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;
  const user = MOCK_USERS.find((u: typeof MOCK_USERS[0]) => u.id === id);

  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

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
          <li>
            <Link href={`/day15/users/${user.id}`} className="hover:text-primary transition-colors">
              {user.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
          <li className="text-gray-900 dark:text-white font-medium">Edit</li>
        </ol>
      </nav>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Edit {user.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update the user details below
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8">
        <Day15EditClient user={user} />
      </div>

    </div>
  );
}