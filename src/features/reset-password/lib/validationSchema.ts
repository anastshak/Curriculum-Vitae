import { z } from 'zod';

import i18n from '@shared/config/i18next';

export const resetPswSchema = z.object({
  newPassword: z.string().min(1, i18n.t('Password is required')).min(5, i18n.t('At least 5 characters')),
});

export type resetPswFormData = z.infer<typeof resetPswSchema>;
