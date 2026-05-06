
import { Metadata } from 'next';
import Day7Client from './Day7Client';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

export const metadata: Metadata = {
  title: 'Day 7 — Search, Filter & Pagination | React Next.js Plan',
  description:
    'Search with debounce, filter by status and role, and paginate user data efficiently.',
  openGraph: {
    title: 'Day 7 — Search, Filter & Pagination',
    description:
      'Search with debounce, filter by status and role, and paginate user data efficiently.',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // add a real image to /public folder
        width: 1200,
        height: 630,
        alt: 'Day 7 — Search, Filter and Pagination',
      },
    ],
  },
};

export default function Day7Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 7 — Search, Filter & Pagination
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Debounced search, role and status filters, paginated results
          </p>
          <Day7Client />
        </main>
      </div>
    </div>
  );
}