interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToPage: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  itemLabel?: string; // FIX: reusable — default 'items'
}

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onNext,
  onPrev,
  onGoToPage,
  hasNext,
  hasPrev,
  itemLabel = 'items', // FIX: was hardcoded 'users'
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPageNumbers(): number[] {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {startIndex}–{endIndex}
        </span>{' '}
        of{' '}
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {totalItems}
        </span>{' '}
        {/* FIX: dynamic label */}
        {itemLabel}
      </p>

      <nav aria-label="Pagination navigation">
        <ul className="flex items-center gap-1">
          <li>
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Go to previous page"
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              ← Prev
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li key={page}>
              <button
                type="button"
                onClick={() => onGoToPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={[
                  'w-9 h-9 text-sm rounded-lg border transition-colors duration-150',
                  page === currentPage
                    ? 'bg-primary text-white border-primary font-semibold'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Go to next page"
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Next →
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}