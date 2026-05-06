
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Day9Client from '@/app/day9/Day9Client';

export const metadata: Metadata = {
  title: 'Day 9 — Context API | React Next.js Plan',
  description:
    'Learn Context API — AuthContext for user login state and ThemeContext for dark/light mode.',
  alternates: {
    canonical: 'https://react-nextjs-plan.vercel.app/day9',
  },
  openGraph: {
    title: 'Day 9 — Context API',
    description: 'AuthContext and ThemeContext with dark/light mode toggle.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day 9 — Context API',
    description: 'AuthContext and ThemeContext with dark/light mode toggle.',
  },
};

export default function Day9Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 9 — Context API
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            AuthContext · ThemeContext · dark/light mode toggle
          </p>
          <Day9Client />
        </main>
      </div>
    </div>
  );
}