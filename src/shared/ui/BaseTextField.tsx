import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps } from '@mui/material';

type BaseTextFieldProps = TextFieldProps & {
  name: string;
  loading?: boolean;
};

export const BaseTextField = ({ name, loading, ...props }: BaseTextFieldProps) => {
  const { t } = useTranslation();

  return <TextField fullWidth sx={{ maxWidth: 410 }} label={t(name)} disabled={loading} {...props} />;
};
