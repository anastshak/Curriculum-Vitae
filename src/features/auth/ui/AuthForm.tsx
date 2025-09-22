import { ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthFormData, authSchema } from '@features/auth/lib/validationSchema';
import { BaseForm } from '@shared/ui/BaseForm';
import { EmailField } from '@shared/ui/EmailField';
import { PasswordField } from '@shared/ui/PasswordField';

type AuthFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (data: AuthFormData) => Promise<void>;
  footer?: ReactNode;
};

export const AuthForm = ({ title, subtitle, submitLabel, loadingLabel, onSubmit, footer }: AuthFormProps) => {
  const { t } = useTranslation();

  const form: UseFormReturn<AuthFormData> = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const fields = (
    <>
      <EmailField register={register('email')} error={!!errors.email} helperText={t(errors.email?.message || '')} />
      <PasswordField
        register={register('password')}
        error={!!errors.password}
        helperText={t(errors.password?.message || '')}
      />
    </>
  );

  return (
    <BaseForm
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      loadingLabel={loadingLabel}
      form={form}
      onSubmit={onSubmit}
      footer={footer}
      fields={fields}
    />
  );
};
