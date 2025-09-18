import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  register?: UseFormRegisterReturn;
}

export const PasswordField = ({ register, error, helperText, ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      autoComplete="new-password"
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ paddingRight: '3px' }}>
            <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...register}
      {...props}
    />
  );
};
