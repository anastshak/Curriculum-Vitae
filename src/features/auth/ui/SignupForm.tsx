import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';

import { SignupFormData, signupSchema } from '@features/auth/lib/validationSchema';
import { ROUTES } from '@shared/consts/routes';

import { useSignup } from '../api/signup';
import { useAuth } from '../model/useAuth';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';

export const SignupForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const [signupMutation, { loading }] = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);

      const { data: result } = await signupMutation({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (result?.signup) {
        const { access_token, refresh_token } = result.signup;
        login({
          accessToken: access_token,
          refreshToken: refresh_token,
        });

        navigate(ROUTES.HOME, { replace: true });
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
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: '24px' }}>
        {t('Register now')}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        {t('Welcome! Sign up to continue.')}
      </Typography>

      {/* Form */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <EmailField register={register('email')} error={!!errors.email} helperText={t(errors.email?.message || '')} />

        <PasswordField
          register={register('password')}
          error={!!errors.password}
          helperText={t(errors.password?.message || '')}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '40px auto 0' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            py: 1.5,
            fontSize: '14px',
            fontWeight: 'medium',
          }}
        >
          {isLoading ? t('Creating account') : t('Create account')}
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
          {t('I have an account')}
        </Button>
      </Box>
    </Box>
  );
};
