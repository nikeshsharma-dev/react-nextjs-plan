
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col items-center text-center gap-6 max-w-md">

            {/* 404 visual */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">404</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Page Not Found
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The page you are looking for does not exist or has been moved.
                Please check the URL or go back to the dashboard.
              </p>
            </div>

            {/* Navigation — SEO: meaningful links not just "click here" */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/dashboard"
                className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/users"
                className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                View All Users
              </Link>
            </div>

            {/* Quick links */}
            <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                Or try one of these pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { href: '/',          label: 'Home'      },
                  { href: '/dashboard', label: 'Dashboard' },
                  { href: '/users',     label: 'Users'     },
                  { href: '/day12',     label: 'Day 12'    },
                  { href: '/day13',     label: 'Day 13'    },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-full"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}