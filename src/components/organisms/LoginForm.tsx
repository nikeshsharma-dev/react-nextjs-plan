
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/app/validations/loginSchema';
import FormField from '@/components/atoms/FormField';
import Button from '@/components/atoms/Button';

export default function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched', // validate on blur — not on every keystroke
  });

  async function onSubmit(data: LoginFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Login Successful
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You have been logged in successfully.
        </p>
        <Button
          label="Back to Login"
          variant="ghost"
          onClick={() => setSubmitted(false)}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Login form"
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Email field */}
      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        required
        error={errors.email?.message}
        success={touchedFields.email && !errors.email}
        {...register('email')}
      />

      {/* Password field */}
      <div className="flex flex-col gap-1.5">
        <FormField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          required
          error={errors.password?.message}
          success={touchedFields.password && !errors.password}
          {...register('password')}
        />
        {/* Show/hide password toggle */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="self-end text-xs text-primary hover:underline"
        >
          {showPassword ? 'Hide password' : 'Show password'}
        </button>
      </div>

      {/* Submit — SEO: meaningful button text */}
      <Button
        label={isSubmitting ? 'Signing in...' : 'Sign In to Your Account'}
        type="submit"
        variant="primary"
        fullWidth
        disabled={isSubmitting}
      />

      {/* Forgot password — SEO: descriptive link text */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Forgot your password?{' '}

        <button
          type="button"
          className="text-primary font-medium hover:underline"
          onClick={() => alert('Password reset coming soon')}
        >
          Reset your password
        </button>
      </p>
    </form>
  );
}