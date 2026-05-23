// DAY 15: Next.js Route Handler — mock API
// GET /api/users — returns all users
// POST /api/users — adds a new user

import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USERS } from '@/app/data/mockUsers';
import { User } from '@/app/types/user';

// In-memory store — resets on server restart
// In real app: use a database
let users: User[] = [...MOCK_USERS];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || 'all';
  const role   = searchParams.get('role')   || 'all';

  let filtered = users;

  if (search) {
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
    );
  }
  if (status !== 'all') {
    filtered = filtered.filter((u) => u.status === status);
  }
  if (role !== 'all') {
    filtered = filtered.filter((u) => u.role === role);
  }

  return NextResponse.json({ users: filtered, total: filtered.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newUser: User = {
    id:       `u${Date.now()}`,
    name:     body.name,
    email:    body.email,
    role:     body.role,
    status:   'active',
    joinedAt: new Date().toISOString().split('T')[0],
  };

  users = [newUser, ...users];

  return NextResponse.json({ user: newUser }, { status: 201 });
}