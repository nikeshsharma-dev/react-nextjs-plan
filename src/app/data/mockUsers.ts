import { User } from '@/app/types/user';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', joinedAt: '2024-01-15' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinedAt: '2024-02-20' },
  { id: 'u3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'pending', joinedAt: '2024-03-10' },
  { id: 'u4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'active', joinedAt: '2024-03-22' },
  { id: 'u5', name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'active', joinedAt: '2024-04-05' },
  { id: 'u6', name: 'Frank Lee', email: 'frank@example.com', role: 'Viewer', status: 'inactive', joinedAt: '2024-04-18' },
  { id: 'u7', name: 'Grace Kim', email: 'grace@example.com', role: 'Editor', status: 'active', joinedAt: '2024-05-01' },
  { id: 'u8', name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'pending', joinedAt: '2024-05-14' },
  { id: 'u9', name: 'Isla Thompson', email: 'isla@example.com', role: 'Admin', status: 'active', joinedAt: '2024-06-02' },
  { id: 'u10', name: 'James Anderson', email: 'james@example.com', role: 'Editor', status: 'inactive', joinedAt: '2024-06-20' },
  { id: 'u11', name: 'Karen Davis', email: 'karen@example.com', role: 'Viewer', status: 'active', joinedAt: '2024-07-08' },
  { id: 'u12', name: 'Liam Garcia', email: 'liam@example.com', role: 'Editor', status: 'pending', joinedAt: '2024-07-25' },
];