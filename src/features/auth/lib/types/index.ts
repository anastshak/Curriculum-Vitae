import { ReactNode } from 'react';

import { AuthFormData } from '../validationSchema';

export type AuthFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (data: AuthFormData) => Promise<void>;
  footer?: ReactNode;
};
