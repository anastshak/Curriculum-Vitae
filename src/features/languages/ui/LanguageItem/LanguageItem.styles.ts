import { SxProps, Theme } from '@mui/material';

export const getWrapperStyles = (isRemoveMode: boolean, onSelect?: () => void): SxProps<Theme> => ({
  height: 48,
  alignItems: 'center',
  gap: '1rem',
  cursor: onSelect && isRemoveMode ? 'pointer' : 'default',
  transition: '0.2s',
});

export const getProfBoxStyles = (color: string): SxProps<Theme> => ({
  color: color,
  marginRight: 2,
});
