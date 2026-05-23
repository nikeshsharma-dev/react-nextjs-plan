
interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Skeleton({
  className = '',
  rounded = 'md',
}: SkeletonProps) {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      aria-hidden="true"
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${roundedClass} ${className}`}
    />
  );
}