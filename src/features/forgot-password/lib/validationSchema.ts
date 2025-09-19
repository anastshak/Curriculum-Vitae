import { z } from 'zod';

import i18n from '@shared/config/i18next';

export const forgotPswSchema = z.object({
  email: z.string().min(1, i18n.t('Email is required')).email(i18n.t('Invalid email format')),
});

export type forgotPswFormData = z.infer<typeof forgotPswSchema>;
