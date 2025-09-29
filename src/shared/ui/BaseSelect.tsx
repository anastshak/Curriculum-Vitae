import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type BaseSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  options: { id: string; label: string }[];
};

export const BaseSelect = ({ label, value, onChange, loading, options }: BaseSelectProps) => {
  const { t } = useTranslation();

  return (
    <FormControl fullWidth margin="none" sx={{ maxWidth: 410 }}>
      <InputLabel>{t(label)}</InputLabel>
      <Select
        value={value}
        label={t(label)}
        onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
        disabled={loading}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
