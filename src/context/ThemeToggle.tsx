'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'relative w-12 h-6 rounded-full transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        isDark ? 'bg-primary' : 'bg-gray-300',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-300 flex items-center justify-center text-xs',
          isDark ? 'translate-x-6' : 'translate-x-0',
        ].join(' ')}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}