import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface EmailFieldProps extends Omit<TextFieldProps, 'type'> {
  register?: UseFormRegisterReturn;
}

export const EmailField = ({ register, error, helperText, ...props }: EmailFieldProps) => {
  return (
    <TextField
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
