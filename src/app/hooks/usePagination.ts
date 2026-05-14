import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  startIndex: number;
  endIndex: number;
}

export function usePagination<T>({
  data,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  // FIX: useEffect instead of useMemo for side effect
  // Reset to page 1 when data length changes (filter/search applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const startIndex = data.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }
  function goToNext() {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }
  function goToPrev() {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNext,
    goToPrev,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    startIndex,
    endIndex,
  };
}