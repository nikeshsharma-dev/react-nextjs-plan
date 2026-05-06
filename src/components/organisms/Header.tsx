
import HeaderAuthSection from '@/components/organisms/HeaderAuthSection';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            U
          </span>
          <span className="font-semibold text-gray-900 dark:text-white text-lg">
            {title}
          </span>
        </div>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/day8" className="hover:text-primary transition-colors">
                Day 8
              </a>
            </li>
            <li>
              <a href="/day9" className="hover:text-primary transition-colors">
                Day 9
              </a>
            </li>
          </ul>
        </nav>

        {/* Auth + Theme — client component */}
        <HeaderAuthSection />

      </div>
    </header>
  );
}