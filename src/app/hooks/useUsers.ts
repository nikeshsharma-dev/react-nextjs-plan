
'use client';

import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { MOCK_USERS } from '../data/mockUsers';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    let cancelled = false; // prevent state update if unmounted

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));


        if (!cancelled) {
          setUsers(MOCK_USERS);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [fetchCount]); // only re-fetches when fetchCount changes

  function refetch() {
    setFetchCount((c) => c + 1);
  }

  return { users, loading, error, refetch };
}