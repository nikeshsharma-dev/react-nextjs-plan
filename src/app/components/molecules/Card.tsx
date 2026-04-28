
import Badge from '../atoms/Badge';

interface CardProps {
  title: string;
  description?: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'muted';
  statusLabel?: string;
  footer?: React.ReactNode;
}

export default function Card({
  title,
  description,
  status,
  statusLabel,
  footer,
}: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
          {title}
        </h3>
        {status && statusLabel && (
          <Badge label={statusLabel} variant={status} />
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {footer && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          {footer}
        </div>
      )}
    </div>
  );
}