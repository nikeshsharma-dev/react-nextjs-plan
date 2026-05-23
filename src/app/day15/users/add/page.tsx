// DAY 15: Add user page
// SEO: title, description, semantic form

import { Metadata } from 'next';
import Link from 'next/link';
import AddUserForm from '@/components/organisms/AddUserForm';

export const metadata: Metadata = {
  title: 'Add User',
  description: 'Create a new user account with full validation.',
};

export default function AddUserPage() {
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
          <li className="text-gray-900 dark:text-white font-medium">Add User</li>
        </ol>
      </nav>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Add New User
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill in the details below to create a new user account
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8">
        <AddUserForm
          onCancel={() => {}}
        />
      </div>

    </div>
  );
}