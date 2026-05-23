// DAY 15: Edit user form — Client Component
// Pre-fills form with existing user data

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/app/types/user';
import FormField from '@/components/atoms/FormField';
import Button from '@/components/atoms/Button';

interface Props {
  user: User;
}

export default function Day15EditClient({ user }: Props) {
  const router = useRouter();
  const [name,   setName]   = useState(user.name);
  const [email,  setEmail]  = useState(user.email);
  const [role,   setRole]   = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim())  newErrors.name  = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => router.push(`/day15/users/${user.id}`), 1000);
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
          ✓
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          User updated successfully
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Redirecting to user profile...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSave(); }}
      aria-label={`Edit ${user.name} form`}
      noValidate
      className="flex flex-col gap-5"
    >
      <FormField
        id="edit-name"
        label="Full Name"
        {...({ value: name, onChange: setName } as any)}
        error={errors.name}
        success={!!name && !errors.name}
        required
      />
      <FormField
        id="edit-email"
        label="Email Address"
        type="email"
        {...({ value: email, onChange: setEmail } as any)}
        error={errors.email}
        success={!!email && !errors.email}
        required
      />

      {/* Role select */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-role"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Role <span className="text-red-500 ml-1" aria-hidden="true">*</span>
        </label>
        <select
          id="edit-role"
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      {/* Status select */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-status"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Status <span className="text-red-500 ml-1" aria-hidden="true">*</span>
        </label>
        <select
          id="edit-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as User['status'])}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          label={saving ? 'Saving...' : 'Save Changes'}
          type="submit"
          variant="primary"
          fullWidth
          disabled={saving}
        />
        <Button
          label="Cancel"
          type="button"
          variant="ghost"
          fullWidth
          onClick={() => router.push(`/day15/users/${user.id}`)}
        />
      </div>
    </form>
  );
}