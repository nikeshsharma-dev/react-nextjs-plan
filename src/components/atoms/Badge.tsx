type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  muted: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

export default function Badge({ label, variant = 'info' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5',
        'rounded-full text-xs font-medium',
        variantClasses[variant],
      ].join(' ')}
    >
      {label}
    </span>
  );
}