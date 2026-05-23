
'use client';

import { useState } from 'react';
import Skeleton from '@/components/atoms/Skeleton';

type DemoState = 'loading' | 'error' | 'empty' | 'success';

const DEMO_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith',     email: 'bob@example.com',   role: 'Editor' },
  { id: '3', name: 'Carol White',   email: 'carol@example.com', role: 'Viewer' },
];

// Loading skeleton UI
function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading users..."
      className="flex flex-col gap-3"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <Skeleton className="w-10 h-10 flex-shrink-0" rounded="full" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="w-36 h-4" rounded="md" />
            <Skeleton className="w-48 h-3" rounded="md" />
          </div>
          <Skeleton className="w-14 h-6" rounded="full" />
        </div>
      ))}
      <span className="sr-only">Loading users...</span>
    </div>
  );
}

// Error state UI
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800">
      <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <span aria-hidden="true" className="text-2xl">⚠️</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          Failed to load users
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Something went wrong while fetching the data.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty state UI
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span aria-hidden="true" className="text-2xl">👥</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          No users found
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          There are no users matching your criteria.
        </p>
      </div>
    </div>
  );
}

// Success state UI
function SuccessState() {
  return (
    <div className="flex flex-col gap-3">
      {DEMO_USERS.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-medium flex-shrink-0">
            {user.role}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Day13ClientDemo() {
  const [state, setState] = useState<DemoState>('success');

  return (
    <div className="flex flex-col gap-4">

      {/* State switcher */}
      <div className="flex flex-wrap gap-2">
        {([
          { value: 'loading', label: '⏳ Loading',  cls: 'border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400'   },
          { value: 'error',   label: '⚠️ Error',    cls: 'border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'       },
          { value: 'empty',   label: '📭 Empty',    cls: 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'   },
          { value: 'success', label: '✅ Success',  cls: 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400'},
        ] as const).map((btn) => (
          <button
            key={btn.value}
            type="button"
            onClick={() => setState(btn.value)}
            className={[
              'px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors',
              state === btn.value
                ? 'bg-primary text-white border-primary'
                : `bg-white dark:bg-gray-900 ${btn.cls}`,
            ].join(' ')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* State display */}
      <div>
        {state === 'loading' && <LoadingSkeleton />}
        {state === 'error'   && <ErrorState onRetry={() => setState('success')} />}
        {state === 'empty'   && <EmptyState />}
        {state === 'success' && <SuccessState />}
      </div>

    </div>
  );
}