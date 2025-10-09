import { SxProps, Theme } from '@mui/material';

export const title: SxProps<Theme> = () => ({
  mb: 2,
  color: 'text.primary',
});

export const grid: SxProps<Theme> = () => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 2.5,
});
