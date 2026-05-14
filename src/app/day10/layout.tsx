// DAY 10 PERF: Shared layout — Header and Sidebar rendered ONCE
// All pages inside day10/ folder automatically get this layout
// No need to import Header/Sidebar in day10/page.tsx

import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

export default function Day10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}