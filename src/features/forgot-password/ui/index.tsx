import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { EmailField } from '@shared/ui/EmailField';

import { useForgotPassword } from '../api';
import { forgotPswFormData, forgotPswSchema } from '../lib/validationSchema';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgotPswFormData>({
    resolver: zodResolver(forgotPswSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const [forgotPasswordMutation, { loading }] = useForgotPassword();

  const onSubmit = async (data: forgotPswFormData) => {
    try {
      setError(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const isLoading = isSubmitting || loading;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 560,
        height: 'calc(100% - 56px)',
        margin: '0 auto',
      }}
    >
      {isSent && (
        <Alert variant="filled" severity="success" sx={{ marginBottom: '24px' }}>
          {t('Check your email. You will be redirected to login page in 5 seconds.')}
        </Alert>
      )}

      <Typography variant="h4" textAlign="center" sx={{ marginBottom: '24px' }}>
        {t('Forgot password')}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        {t('We will sent you an email with further instructions')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <EmailField register={register('email')} error={!!errors.email} helperText={t(errors.email?.message || '')} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '40px auto 0' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isSent}
          sx={{
            py: 1.5,
            fontSize: '14px',
            fontWeight: 'medium',
          }}
        >
          {isLoading ? t('Wait') : t('Reset password')}
        </Button>

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
      </Box>
    </Box>
  );
};
