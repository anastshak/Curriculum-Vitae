import { z } from 'zod';

import i18n from '@shared/config/i18next';

export const authSchema = z.object({
  email: z.string().min(1, i18n.t('auth.validation.emailRequired')).email(i18n.t('auth.validation.emailInvalidFormat')),
  password: z
    .string()
    .min(1, i18n.t('auth.validation.passwordRequired'))
    .min(5, i18n.t('auth.validation.passwordLength')),
});

export type AuthFormData = z.infer<typeof authSchema>;
