'use client';

import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '🏠' },
  { label: 'Users', href: '/users', icon: '👥' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
  { label: 'Day 2 Demo', href: '/day2', icon: '🧪' },
  { label: 'Day 3', href: '/day3', icon: '📋' },
  { label: 'Day 4', href: '/day4', icon: '🔐' },
  { label: 'Day 5', href: '/day5', icon: '📝' },
  { label: 'Day 6', href: '/day6', icon: '🌐' },
  { label: 'Day 7', href: '/day7', icon: '🔎' },
  { label: 'Day 8', href: '/day8', icon: '⚙️' },
  { label: 'Day 9', href: '/day9', icon: '🎨' }
];

export default function Sidebar() {
  const [active, setActive] = useState('/');

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col py-6 px-4">

      <div className="mb-8 px-2">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          ⚡ AppMenu
        </span>
      </div>

      <nav aria-label="Sidebar navigation" className="flex-1">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setActive(item.href)}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  active === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                ].join(' ')}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Admin
            </p>
            <p className="text-xs text-gray-500">admin@app.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}