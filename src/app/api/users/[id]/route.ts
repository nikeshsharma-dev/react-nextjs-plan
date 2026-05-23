// DAY 15: Route handler for single user
// GET /api/users/[id]
// PUT /api/users/[id]
// DELETE /api/users/[id]

import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USERS } from '@/app/data/mockUsers';
import { User } from '@/app/types/user';

let users: User[] = [...MOCK_USERS];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users[index] = { ...users[index], ...body };
  return NextResponse.json({ user: users[index] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users = users.filter((u) => u.id !== id);
  return NextResponse.json({ message: 'User deleted' });
}