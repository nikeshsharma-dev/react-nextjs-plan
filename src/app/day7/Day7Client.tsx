
'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useUsers } from '@/app/hooks/useUsers';
import { UserStatus, UserRole } from '@/app/types/user';
import UserTable from '@/components/organisms/UserTable';
import SearchBar from '@/components/molecules/SearchBar';
import FilterBar from '@/components/molecules/FilterBar';
import Pagination from '@/components/molecules/Pagination';
import { usePagination } from '@/app/hooks/usePagination';

const ITEMS_PER_PAGE = 5;

export default function Day7Client() {
  const { users, loading, error, refetch } = useUsers();

  const [searchInput, setSearchInput] = useState('');

  const [debouncedSearch] = useDebounce(searchInput, 400);

  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = debouncedSearch.toLowerCase().trim();

      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === 'all' || user.status === selectedStatus;

      const matchesRole =
        selectedRole === 'all' || user.role === selectedRole;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, debouncedSearch, selectedStatus, selectedRole]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNext,
    goToPrev,
    hasNext,
    hasPrev,
    startIndex,
    endIndex,
  } = usePagination({ data: filteredUsers, itemsPerPage: ITEMS_PER_PAGE });

  function handleReset() {
    setSearchInput('');
    setSelectedStatus('all');
    setSelectedRole('all');
  }

  return (
    <section aria-labelledby="day7-heading" className="flex flex-col gap-5">
      <h2
        id="day7-heading"
        className="text-base font-semibold text-gray-800 dark:text-gray-200"
      >
        {loading
          ? 'Loading users...'
          : `Users (${filteredUsers.length} of ${users.length})`}
      </h2>

      {/* Search + Filter row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end flex-wrap">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search by name or email..."
        />
        <FilterBar
          selectedStatus={selectedStatus}
          selectedRole={selectedRole}
          onStatusChange={setSelectedStatus}
          onRoleChange={setSelectedRole}
          onReset={handleReset}
        />
      </div>

      {/* Active filter summary */}
      {(debouncedSearch || selectedStatus !== 'all' || selectedRole !== 'all') && !loading && (
        <div className="flex flex-wrap gap-2">
          {debouncedSearch && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">
              Search: {debouncedSearch}
              <button
                type="button"
                onClick={() => setSearchInput('')}
                aria-label="Remove search filter"
                className="hover:text-primary-dark ml-1"
              >
                ✕
              </button>
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">
              Status: {selectedStatus}
              <button
                type="button"
                onClick={() => setSelectedStatus('all')}
                aria-label="Remove status filter"
                className="ml-1"
              >
                ✕
              </button>
            </span>
          )}
          {selectedRole !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-purple-100 text-purple-700 font-medium">
              Role: {selectedRole}
              <button
                type="button"
                onClick={() => setSelectedRole('all')}
                aria-label="Remove role filter"
                className="ml-1"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* Table — shows paginated + filtered data */}
      <UserTable
        users={paginatedData}
        loading={loading}
        error={error}
        onRetry={refetch}
      />

      {/* Pagination */}
      {!loading && !error && filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredUsers.length}
          onNext={goToNext}
          onPrev={goToPrev}
          onGoToPage={goToPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}
    </section>
  );
}