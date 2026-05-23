// DAY 15: Shared layout for final project
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'User Management Dashboard',
    template: '%s | User Management',
  },
  description:
    'A complete User Management Dashboard built with Next.js, Tailwind CSS, and TypeScript.',
  metadataBase: new URL('https://react-nextjs-plan.vercel.app'),
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'User Management Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function Day15Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="User Management" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}