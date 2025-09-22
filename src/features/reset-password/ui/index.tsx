import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { PasswordField } from '@shared/ui/PasswordField';

import { useResetPassword } from '../api';
import { resetPswFormData, resetPswSchema } from '../lib/validationSchema';

export const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPswFormData>({
    resolver: zodResolver(resetPswSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
    },
  });

  const [resetPasswordMutation, { loading }] = useResetPassword();

  const onSubmit = async (data: resetPswFormData) => {
    try {
      setError(null);

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
    } catch (err) {
      // GraphQL error: Action expired - token?
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
      {isSubmit && (
        <Alert variant="filled" severity="success" sx={{ marginBottom: '24px' }}>
          {t('Password has been updated')}
        </Alert>
      )}

      <Typography variant="h4" textAlign="center" sx={{ marginBottom: '24px' }}>
        {t('Set a new password')}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        {t('Almost done! Now create a new password')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <PasswordField
          register={register('newPassword')}
          error={!!errors.newPassword}
          helperText={t(errors.newPassword?.message || '')}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '40px auto 0' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isSubmit}
          sx={{
            py: 1.5,
            fontSize: '14px',
            fontWeight: 'medium',
          }}
        >
          {isLoading ? t('Wait') : t('Submit')}
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
          {t('Back to log in')}
        </Button>
      </Box>
    </Box>
  );
};
