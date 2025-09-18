import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').min(5, 'Password must be at least 5 characters'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
