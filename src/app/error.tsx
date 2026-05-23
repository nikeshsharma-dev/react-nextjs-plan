
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-8">
      <div className="flex flex-col items-center text-center gap-6 max-w-md w-full">

        {/* Error icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            An unexpected error occurred while loading this page.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Try again */}
          <button
            type="button"
            onClick={reset}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}