import Spinner from '@/components/atoms/Spinner';
import UserCard from '@/components/molecules/UserCard';
import { User } from '@/app/types/user';

interface UserListProps {
  users: User[];
  loading: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <span className="text-3xl">👥</span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        No users found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        There are no users to display right now.
      </p>
    </div>
  );
}

export default function UserList({ users, loading }: UserListProps) {
  if (loading) return <Spinner />;

  if (users.length === 0) return <EmptyState />;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}