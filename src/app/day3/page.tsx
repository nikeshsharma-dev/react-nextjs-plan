'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import UserList from '@/components/organisms/UserList';
import Button from '@/components/atoms/Button';
import { User } from '../types/user';
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin',  status: 'active',   joinedAt: '2024-01-15' },
  { id: 'u2', name: 'Bob Smith',     email: 'bob@example.com',   role: 'Editor', status: 'inactive', joinedAt: '2024-02-20' },
  { id: 'u3', name: 'Carol White',   email: 'carol@example.com', role: 'Viewer', status: 'pending',  joinedAt: '2024-03-10' },
  { id: 'u4', name: 'David Brown',   email: 'david@example.com', role: 'Editor', status: 'active',   joinedAt: '2024-03-22' },
  { id: 'u5', name: 'Eva Martinez',  email: 'eva@example.com',   role: 'Admin',  status: 'active',   joinedAt: '2024-04-05' },
  { id: 'u6', name: 'Frank Lee',     email: 'frank@example.com', role: 'Viewer', status: 'inactive', joinedAt: '2024-04-18' },
];
export default function Day3Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsEmpty(false);

    const timer = setTimeout(() => {
      setUsers(isEmpty ? [] : MOCK_USERS);
      setLoading(false);
    }, 1500);
 
    return () => clearTimeout(timer);
  }, [isEmpty]);

  function handleShowEmpty() {
    setIsEmpty(true);
  }

  function handleShowUsers() {
    setIsEmpty(false);
  }

  function handleReload() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
 
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 3 — List Rendering
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            User list with loading state and empty state
          </p>
 
          <section aria-labelledby="controls-heading" className="mb-8">
            <h2
              id="controls-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3"
            >
              Test States
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button
                label="Show Users"
                variant="primary"
                onClick={handleShowUsers}
              />
              <Button
                label="Show Empty State"
                variant="ghost"
                onClick={handleShowEmpty}
              />
              <Button
                label="Reload (Loading State)"
                variant="secondary"
                onClick={handleReload}
              />
            </div>
          </section>
 
          <section aria-labelledby="userlist-heading">
            <h2
              id="userlist-heading"
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              {loading
                ? 'Loading users...'
                : isEmpty || users.length === 0
                ? 'No Users'
                : `All Users (${users.length})`}
            </h2>

            <UserList users={users} loading={loading} />
          </section>

        </main>
      </div>
    </div>
  );
}