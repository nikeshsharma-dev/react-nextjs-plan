
import { UserStatus, UserRole } from '@/app/types/user';

interface FilterBarProps {
  selectedStatus: UserStatus | 'all';
  selectedRole: UserRole | 'all';
  onStatusChange: (status: UserStatus | 'all') => void;
  onRoleChange: (role: UserRole | 'all') => void;
  onReset: () => void;
}

const STATUS_OPTIONS: { value: UserStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const ROLE_OPTIONS: { value: UserRole | 'all'; label: string }[] = [
  { value: 'all', label: 'All Roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
];

const selectClass = [
  'text-sm rounded-lg border border-gray-300 dark:border-gray-600',
  'bg-white dark:bg-gray-800',
  'text-gray-700 dark:text-gray-200',
  'px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40',
  'focus:border-primary transition-colors duration-150',
].join(' ');

export default function FilterBar({
  selectedStatus,
  selectedRole,
  onStatusChange,
  onRoleChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilter = selectedStatus !== 'all' || selectedRole !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status filter */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="status-filter"
          className="text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          Status
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as UserStatus | 'all')}
          className={selectClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Role filter */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="role-filter"
          className="text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          Role
        </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole | 'all')}
          className={selectClass}
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset filters — only shown when a filter is active */}
      {hasActiveFilter && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-transparent select-none">Reset</span>
          <button
            type="button"
            onClick={onReset}
            className="text-sm px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors duration-150"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}