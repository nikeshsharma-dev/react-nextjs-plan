
import StatusBadge from '@/components/molecules/StatusBadge';
import Spinner from '@/components/atoms/Spinner';
import { User } from '@/app/types/user';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Failed to load users
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 text-sm text-primary font-medium hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-2xl">👥</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        No users found
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        No users match your current filters.
      </p>
    </div>
  );
}

export default function UserTable({ users, loading, error, onRetry }: UserTableProps) {
  if (loading) return <Spinner />;

  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  if (users.length === 0) return <EmptyState />;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      {/* SEO: semantic table */}
      <table className="w-full text-sm">
        <caption className="sr-only">List of all users</caption>

        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {['Name', 'Email', 'Role', 'Status', 'Joined'].map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
            >
              {/* Name + avatar */}
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                {user.email}
              </td>

              {/* Role */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                  {user.role}
                </span>
              </td>

              {/* Status badge */}
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={user.status} />
              </td>

              {/* Joined date */}
              <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                {new Date(user.joinedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}