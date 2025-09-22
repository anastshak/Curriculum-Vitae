import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { BaseForm } from '@shared/ui/BaseForm';
import { EmailField } from '@shared/ui/EmailField';

import { useForgotPassword } from '../api';
import { forgotPswFormData, forgotPswSchema } from '../lib/validationSchema';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const form = useForm<forgotPswFormData>({
    resolver: zodResolver(forgotPswSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const [forgotPasswordMutation] = useForgotPassword();

  const onSubmit = async (data: forgotPswFormData) => {
    const { data: result } = await forgotPasswordMutation({
      variables: {
        auth: {
          email: data.email,
        },
      },
    });

    if (result) {
      setIsSent(true);
      setTimeout(() => {
        navigate(ROUTES.AUTH.LOGIN, { replace: true });
      }, 5000);
    }
  };

  const fields = (
    <EmailField register={register('email')} error={!!errors.email} helperText={t(errors.email?.message || '')} />
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
      {t('Cancel')}
    </Button>
  );

  return (
    <BaseForm
      title="Forgot password"
      subtitle="We will sent you an email with further instructions"
      submitLabel="Reset password"
      loadingLabel="Wait"
      form={form}
      onSubmit={onSubmit}
      footer={footer}
      fields={fields}
      successMessage="Check your email. You will be redirected to login page in 5 seconds."
      isSuccess={isSent}
    />
  );
};
