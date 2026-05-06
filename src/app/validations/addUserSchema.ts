
import { z } from 'zod';

export const addUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  role: z.enum(['Admin', 'Editor', 'Viewer'] as const, {
    error: 'Please select a valid role',
  }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type AddUserFormData = z.infer<typeof addUserSchema>;