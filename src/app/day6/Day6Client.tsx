
'use client';

import { useUsers } from '@/app/hooks/useUsers';
import UserTable from '@/components/organisms/UserTable';
import Button from '@/components/atoms/Button';

export default function Day6Client() {
  const { users, loading, error, refetch } = useUsers();

  return (
    <section aria-labelledby="users-table-heading" className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2
          id="users-table-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200"
        >
          {loading
            ? 'Loading users...'
            : error
              ? 'Error loading users'
              : `All Users (${users.length})`}
        </h2>
        <Button
          label="Reload Data"
          variant="ghost"
          size="sm"
          onClick={refetch}
          disabled={loading}
        />
      </div>

      {/* Table */}
      <UserTable
        users={users}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
    </section>
  );
}