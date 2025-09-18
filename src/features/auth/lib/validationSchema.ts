import { z } from 'zod';

import i18n from '@shared/config/i18next';

export const signupSchema = z.object({
  email: z.string().min(1, i18n.t('Email is required')).email(i18n.t('Invalid email format')),
  password: z.string().min(1, i18n.t('Password is required')).min(5, i18n.t('At least 5 characters')),
});

export type SignupFormData = z.infer<typeof signupSchema>;
