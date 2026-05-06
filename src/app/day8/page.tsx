
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Day8Client from '@/app/day8/Day8Client';

export const metadata: Metadata = {
  title: 'Day 8 — React Hooks Deep Dive | React Next.js Plan',
  description:
    'Practice useEffect, useMemo, useCallback, and useRef with real examples.',
  twitter: {
    card: 'summary_large_image',
    title: 'Day 8 — React Hooks Deep Dive',
    description:
      'Practice useEffect, useMemo, useCallback, and useRef with real examples.',
    images: ['/og-image.png'],
  },
  openGraph: {
    title: 'Day 8 — React Hooks Deep Dive',
    description: 'Practice useEffect, useMemo, useCallback, and useRef.',
    type: 'website',
  },
};

export default function Day8Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 8 — React Hooks Deep Dive
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            useEffect · useMemo · useCallback · useRef — with real examples
          </p>
          <Day8Client />
        </main>
      </div>
    </div>
  );
}