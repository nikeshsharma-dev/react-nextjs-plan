
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/context/ThemeToggle';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import FormField from '@/components/atoms/FormField';

function AuthDemo() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setError('');
    await login(email, password);
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        AuthContext Demo
      </h3>

      {isAuthenticated && user ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="ml-auto">
              <Badge label={user.role} variant="success" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'User ID', value: user.id },
              { label: 'Role', value: user.role },
              { label: 'Email', value: user.email },
              { label: 'Status', value: 'Authenticated ✓' },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="font-medium text-gray-900 dark:text-white text-xs">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <Button
            label="Logout"
            variant="danger"
            size="sm"
            onClick={logout}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Login state is shared across the entire app via AuthContext.
            After login, the Header also updates.
          </p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ctx-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="ctx-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="ctx-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="ctx-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <Button
            label={isLoading ? 'Signing in...' : 'Sign In via Context'}
            variant="primary"
            onClick={handleLogin}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}

function ThemeDemo() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        ThemeContext Demo
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Theme is stored in context and persisted in localStorage.
        Toggle affects the entire app including Header and Sidebar.
      </p>

      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Current theme:
        </span>
        <Badge
          label={theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          variant={theme === 'dark' ? 'info' : 'warning'}
        />
        <ThemeToggle />
      </div>

      {/* Theme buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={[
            'flex-1 py-3 rounded-lg border text-sm font-medium transition-colors',
            theme === 'light'
              ? 'border-primary bg-primary text-white'
              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary',
          ].join(' ')}
        >
          ☀️ Light
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={[
            'flex-1 py-3 rounded-lg border text-sm font-medium transition-colors',
            theme === 'dark'
              ? 'border-primary bg-primary text-white'
              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary',
          ].join(' ')}
        >
          🌙 Dark
        </button>
      </div>

      {/* Color swatches — Tailwind theme customization */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
          Design Tokens (from globals.css @theme)
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'primary', className: 'bg-primary' },
            { label: 'primary-dark', className: 'bg-primary-dark' },
            { label: 'secondary', className: 'bg-secondary' },
            { label: 'secondary-dark', className: 'bg-secondary-dark' },
            { label: 'muted', className: 'bg-muted' },
          ].map((swatch) => (
            <div key={swatch.label} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-lg shadow-sm ${swatch.className}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {swatch.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerfNotes() {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Context Performance Rules
      </h3>
      <div className="flex flex-col gap-3">
        {[
          {
            title: 'Split contexts by concern',
            desc: 'Auth and Theme are separate contexts — changing theme does not re-render auth consumers.',
          },
          {
            title: 'useMemo on context value',
            desc: 'Without useMemo, every parent re-render creates a new object and re-renders ALL consumers.',
          },
          {
            title: 'useCallback on context functions',
            desc: 'login and logout have stable references — child components that receive them do not re-render unnecessarily.',
          },
          {
            title: 'Do not put too much in one context',
            desc: 'If you put users list, filters, pagination all in one context, every change re-renders every consumer.',
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Day9Client() {
  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="context-demos-heading">
        <h2
          id="context-demos-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Context Demos
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AuthDemo />
          <ThemeDemo />
        </div>
      </section>

      <section aria-labelledby="perf-notes-heading">
        <h2
          id="perf-notes-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Performance Notes
        </h2>
        <PerfNotes />
      </section>
    </div>
  );
}