
import { UserStatus } from '@/app/types/user';

interface StatusBadgeProps {
  status: UserStatus;
}

const config: Record<UserStatus, { label: string; classes: string }> = {
  active:   { label: 'Active',   classes: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: 'Inactive', classes: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  pending:  { label: 'Pending',  classes: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        config[status].classes,
      ].join(' ')}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config[status].label}
    </span>
  );
}