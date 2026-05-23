// DAY 15: Client component — search, filter, pagination
// PERF: debounce on search, useMemo for filtering, usePagination
// Tailwind: responsive table, search, filter, pagination

'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import { MOCK_USERS } from '@/app/data/mockUsers';
import { UserStatus, UserRole } from '@/app/types/user';
import StatusBadge from '@/components/molecules/StatusBadge';
import SearchBar from '@/components/molecules/SearchBar';
import FilterBar from '@/components/molecules/FilterBar';
import Pagination from '@/components/molecules/Pagination';
import { usePagination } from '@/app/hooks/usePagination';

const ITEMS_PER_PAGE = 5;

export default function Day15UsersClient() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');

  const [debouncedSearch] = useDebounce(searchInput, 400);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user: { name: string; email: string; status: UserStatus; role: UserRole; }) => {
      const search = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [debouncedSearch, selectedStatus, selectedRole]);

  const {
    currentPage, totalPages, paginatedData,
    goToPage, goToNext, goToPrev,
    hasNext, hasPrev, startIndex, endIndex,
  } = usePagination({ data: filteredUsers, itemsPerPage: ITEMS_PER_PAGE });

  function handleReset() {
    setSearchInput('');
    setSelectedStatus('all');
    setSelectedRole('all');
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Search + Filter + Add button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end flex-wrap justify-between">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end flex-wrap">
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
        <Link
          href="/day15/users/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex-shrink-0"
        >
          + Add User
        </Link>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Showing <strong>{filteredUsers.length}</strong> of{' '}
        <strong>{MOCK_USERS.length}</strong> users
      </p>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <span aria-hidden="true" className="text-3xl mb-3">👥</span>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            No users found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">User management table</caption>
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedData.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          role="img"
                          aria-label={`${user.name} avatar`}
                          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0"
                        >
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(user.joinedAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/day15/users/${user.id}`}
                          className="text-xs text-primary font-medium hover:underline"
                        >
                          View
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Link
                          href={`/day15/users/${user.id}/edit`}
                          className="text-xs text-secondary font-medium hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredUsers.length > 0 && (
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
          itemLabel="users"
        />
      )}

    </div>
  );
}