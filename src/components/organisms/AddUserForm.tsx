'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserSchema, AddUserFormData } from '@/app/validations/addUserSchema';
import FormField from '@/components/atoms/FormField';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

// FIX: onCancel prop remove kiya — Server Component se function pass nahi hota
interface AddUserFormProps {
  onSuccess?: (data: AddUserFormData) => void;
}

export default function AddUserForm({ onSuccess }: AddUserFormProps) {
  const router = useRouter(); // FIX: useRouter add kiya navigation ke liye
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<AddUserFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      role: 'Viewer',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: AddUserFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    setSubmitted(true);
    onSuccess?.(data);
  }

  function handleReset() {
    reset();
    setSubmitted(false);
    setSubmittedData(null);
  }

  if (submitted && submittedData) {
    return (
      <div className="flex flex-col gap-5">
        {/* Success banner */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300 text-sm">
              User added successfully
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              {submittedData.name} has been added as {submittedData.role}
            </p>
          </div>
        </div>

        {/* Summary card */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            User Details
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {submittedData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {submittedData.name}
              </p>
              <p className="text-xs text-gray-500">{submittedData.email}</p>
            </div>
            <div className="ml-auto">
              <Badge label={submittedData.role} variant="info" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            label="Add Another User"
            variant="primary"
            onClick={handleReset}
          />
          {/* FIX: onCancel ki jagah router.push */}
          <Button
            label="Go to Users"
            variant="ghost"
            onClick={() => router.push('/day15/users')}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Add new user form"
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Personal info group */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Personal Information
        </legend>

        <FormField
          id="name"
          label="Full Name"
          type="text"
          placeholder="e.g. Alice Johnson"
          required
          error={errors.name?.message}
          success={touchedFields.name && !errors.name}
          {...register('name')}
        />

        <FormField
          id="add-email"
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          required
          error={errors.email?.message}
          success={touchedFields.email && !errors.email}
          {...register('email')}
        />
      </fieldset>

      {/* Role select */}
      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Role <span className="text-red-500 ml-1">*</span>
        </legend>

        <label htmlFor="role" className="sr-only">
          Select user role
        </label>
        <select
          id="role"
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? 'role-error' : undefined}
          className={[
            'w-full rounded-lg border px-4 py-2.5 text-sm',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2',
            errors.role
              ? 'border-red-500 focus:ring-red-400/40'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary/40 focus:border-primary',
          ].join(' ')}
          {...register('role')}
        >
          <option value="">Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        {errors.role && (
          <p id="role-error" role="alert" className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {errors.role.message}
          </p>
        )}
      </fieldset>

      {/* Password group */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Security
        </legend>

        <FormField
          id="add-password"
          label="Password"
          type="password"
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          required
          error={errors.password?.message}
          success={touchedFields.password && !errors.password}
          {...register('password')}
        />

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          required
          error={errors.confirmPassword?.message}
          success={touchedFields.confirmPassword && !errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </fieldset>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          label={isSubmitting ? 'Adding User...' : 'Add New User'}
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
        />
        {/* FIX: onCancel ki jagah router.push */}
        <Button
          label="Cancel"
          type="button"
          variant="ghost"
          fullWidth
          onClick={() => router.push('/day15/users')}
        />
      </div>
    </form>
  );
}