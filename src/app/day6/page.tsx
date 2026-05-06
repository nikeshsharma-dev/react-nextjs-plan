
import { Metadata } from 'next';
import Day6Client from './Day6Client';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

export const metadata: Metadata = {
  title: 'Day 6 — API Integration | React Next.js Plan',
  description:
    'Integrate API and display user data in a table with loading, error, and empty states.',
};

export default function Day6Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 6 — API Integration
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Fetch and display users in a table with loading, error, and empty states
          </p>
          <Day6Client />
        </main>
      </div>
    </div>
  );
}