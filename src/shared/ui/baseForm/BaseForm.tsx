import { ReactNode, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Typography } from '@mui/material';

import { alertBox, footerBox, submitBtn, wrapper } from './BaseForm.styles';

type BaseFormProps<TFieldValues extends FieldValues> = {
  title: string;
  subtitle: string;
  submitLabel: string;
  loadingLabel: string;
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => Promise<void>;
  footer?: ReactNode;
  fields: ReactNode;
  successMessage?: string;
  isSuccess?: boolean;
};

export const BaseForm = <TFieldValues extends FieldValues>({
  title,
  subtitle,
  submitLabel,
  loadingLabel,
  form,
  onSubmit,
  footer,
  fields,
  successMessage,
  isSuccess = false,
}: BaseFormProps<TFieldValues>) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (data: TFieldValues) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const isLoading = isSubmitting;

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={wrapper}>
      {isSuccess && successMessage && (
        <Alert variant="filled" severity="success" sx={{ marginBottom: '24px' }}>
          {t(successMessage)}
        </Alert>
      )}

      <Typography variant="h4" textAlign="center" sx={{ marginBottom: '24px' }}>
        {t(title)}
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ marginBottom: '40px' }}>
        {t(subtitle)}
      </Typography>

      <Box sx={alertBox}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        {fields}
      </Box>

      <Box sx={footerBox}>
        <Button type="submit" variant="contained" disabled={isLoading || isSuccess} sx={submitBtn}>
          {isLoading ? t(loadingLabel) : t(submitLabel)}
        </Button>

        {footer}
      </Box>
    </Box>
  );
};
