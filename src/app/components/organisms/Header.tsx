import Button from '../atoms/Button';

interface HeaderProps {
  title?: string;
  onLogout?: () => void;
}

export default function Header({ title = 'Dashboard', onLogout }: HeaderProps) {
  return (

    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">

        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            U
          </span>
          <span className="font-semibold text-gray-900 dark:text-white text-lg">
            {title}
          </span>
        </div>

        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/day2" className="hover:text-primary transition-colors">
                Day 2
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Admin
          </span>
          {onLogout && (
            <Button label="Logout" variant="ghost" size="sm" onClick={onLogout} />
          )}
        </div>
      </div>
    </header>
  );
}