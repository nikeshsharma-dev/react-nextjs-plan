// DAY 11 PERF: Same shared layout pattern
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

export default function Day11Layout({
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