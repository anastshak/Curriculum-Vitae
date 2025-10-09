import { linearProgressClasses, SxProps, Theme } from '@mui/material';

export const getWrapperStyles = (isRemoveMode: boolean, onSelect?: () => void): SxProps<Theme> => ({
  height: 48,
  alignItems: 'center',
  gap: '1rem',
  cursor: onSelect && isRemoveMode ? 'pointer' : 'default',
  transition: '0.2s',
});

export const getProgressBarStyles = (progress: string, background: string): SxProps<Theme> => ({
  width: '5rem',
  height: 5,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: background,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: progress,
  },
});
