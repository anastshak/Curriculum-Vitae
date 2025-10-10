import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type BaseSelectProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  isOwner?: boolean;
  disabled?: boolean;
  options: { id: string; label: string }[];
  children?: ReactNode;
  size?: number;
};

export const BaseSelect = ({
  label,
  value,
  onChange,
  loading,
  isOwner = true,
  disabled,
  options,
  children,
  size = 410,
}: BaseSelectProps) => {
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    if (isOwner) {
      onChange?.(event.target.value);
    }
  };

  const renderOptions = useMemo(
    () =>
      options.map(({ id, label }) => (
        <MenuItem key={id} value={id}>
          {label}
        </MenuItem>
      )),
    [options],
  );

  return (
    <FormControl fullWidth margin="none" sx={{ maxWidth: size }}>
      <InputLabel>{t(label)}</InputLabel>
      <Select value={value} label={t(label)} onChange={handleChange} disabled={loading || !isOwner || disabled}>
        {children ?? renderOptions}
      </Select>
    </FormControl>
  );
};
