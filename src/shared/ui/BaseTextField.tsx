import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps } from '@mui/material';

type BaseTextFieldProps = TextFieldProps & {
  name: string;
  loading?: boolean;
  width?: number;
};

export const BaseTextField = ({ name, loading, width = 410, ...props }: BaseTextFieldProps) => {
  const { t } = useTranslation();

  return <TextField fullWidth sx={{ maxWidth: width }} label={t(name)} disabled={loading} {...props} />;
};
