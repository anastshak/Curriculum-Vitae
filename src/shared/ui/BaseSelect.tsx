import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type BaseSelectProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  isOwner?: boolean;
  options: { id: string; label: string }[];
};

export const BaseSelect = ({ label, value, onChange, loading, isOwner = true, options }: BaseSelectProps) => {
  const { t } = useTranslation();

  const displayValue = options.length > 0 ? value : '';

  const handleChange = (event: SelectChangeEvent) => {
    if (isOwner) {
      onChange?.(event.target.value);
    }
  };

  return (
    <FormControl fullWidth margin="none" sx={{ maxWidth: 410 }}>
      <InputLabel>{t(label)}</InputLabel>
      <Select value={displayValue} label={t(label)} onChange={handleChange} disabled={loading || !isOwner} displayEmpty>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
