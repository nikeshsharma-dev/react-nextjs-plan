import Badge from "@/components/atoms/Badge";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

interface UserCardProps {
  user: User;
}

const statusVariant: Record<User['status'], 'success' | 'muted' | 'warning'> = {
  active:   'success',
  inactive: 'muted',
  pending:  'warning',
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Role + Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
          {user.role}
        </span>
        <Badge
          label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          variant={statusVariant[user.status]}
        />
      </div>
    </div>
  );
}