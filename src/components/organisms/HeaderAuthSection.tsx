'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/context/ThemeToggle';

export default function HeaderAuthSection() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="w-16 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />

      {isAuthenticated && user ? (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.role}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <a
          href="/day9"
          className="text-xs px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Sign In
        </a>
      )}
    </div>
  );
}