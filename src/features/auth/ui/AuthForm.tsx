import { ReactNode, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';

import { AuthFormData, authSchema } from '@features/auth/lib/validationSchema';
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
  const [error, setError] = useState<string | null>(null);

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
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleFormSubmit = async (data: AuthFormData) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
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
        {t(title)}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        {t(subtitle)}
      </Typography>

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
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            fontSize: '14px',
            fontWeight: 'medium',
          }}
        >
          {isSubmitting ? t(loadingLabel) : t(submitLabel)}
        </Button>

        {footer}
      </Box>
    </Box>
  );
};
