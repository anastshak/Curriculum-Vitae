import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { BaseForm } from '@shared/ui/BaseForm';
import { PasswordField } from '@shared/ui/PasswordField';

import { useResetPassword } from '../api';
import { resetPswFormData, resetPswSchema } from '../lib/validationSchema';

export const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const form = useForm<resetPswFormData>({
    resolver: zodResolver(resetPswSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const [resetPasswordMutation] = useResetPassword();

  const onSubmit = async (data: resetPswFormData) => {
    const { data: result } = await resetPasswordMutation({
      variables: {
        auth: {
          newPassword: data.newPassword,
        },
      },
    });

    if (result) {
      setIsSubmit(true);
      setTimeout(() => {
        navigate(ROUTES.AUTH.LOGIN, { replace: true });
      }, 3000);
    }
  };

  const fields = (
    <PasswordField
      register={register('newPassword')}
      error={!!errors.newPassword}
      helperText={t(errors.newPassword?.message || '')}
    />
  );

  const footer = (
    <Button
      onClick={() => navigate(ROUTES.AUTH.LOGIN)}
      sx={{
        py: 1.5,
        fontSize: '14px',
        fontWeight: '500',
        color: 'text.secondary',
      }}
    >
      {t('auth.resetPassword.backToLogin')}
    </Button>
  );

  return (
    <BaseForm
      title="auth.resetPassword.title"
      subtitle="auth.resetPassword.subtitle"
      submitLabel="auth.resetPassword.button"
      loadingLabel="buttonMessages.wait"
      form={form}
      onSubmit={onSubmit}
      footer={footer}
      fields={fields}
      successMessage="auth.resetPassword.successMessage"
      isSuccess={isSubmit}
    />
  );
};
