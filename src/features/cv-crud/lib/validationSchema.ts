import { z } from 'zod';

import i18n from '@shared/config/i18next';

export const cvSchema = z.object({
  name: z.string().min(1, i18n.t('cvs.validation.nameRequired')),
  education: z.string(),
  description: z.string().min(1, i18n.t('cvs.validation.descRequired')),
});

export type CvFormData = z.infer<typeof cvSchema>;
