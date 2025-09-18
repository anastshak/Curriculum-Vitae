import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
        Register now
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        Welcome! Sign up to continue
      </Typography>

      {/* Form */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <EmailField
          label="Email"
          register={register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <PasswordField
          label="Password"
          register={register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
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
          {isLoading ? 'Creating Account...' : 'create account'}
        </Button>

        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          sx={{
            py: 1.5,
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'text.secondary',
          }}
        >
          I have an account
        </Button>
      </Box>
    </Box>
  );
};
