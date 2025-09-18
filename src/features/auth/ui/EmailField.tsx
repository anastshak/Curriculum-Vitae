import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps } from '@mui/material';

interface EmailFieldProps extends Omit<TextFieldProps, 'type'> {
  register?: UseFormRegisterReturn;
}

export const EmailField = ({ register, error, helperText, ...props }: EmailFieldProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('Email')}
      type="email"
      autoComplete="email"
      placeholder="example@mail.com"
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      {...register}
      {...props}
    />
  );
};
