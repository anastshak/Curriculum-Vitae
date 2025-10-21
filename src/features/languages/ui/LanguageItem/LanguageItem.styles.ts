import { SxProps, Theme } from '@mui/material';

export const getWrapperStyles = (theme: Theme, isRemoveMode: boolean, onSelect?: () => void): SxProps<Theme> => ({
  height: 48,
  alignItems: 'center',
  gap: '1rem',
  cursor: onSelect && isRemoveMode ? 'pointer' : 'default',
  transition: '0.2s',
  padding: 2,
  borderRadius: 3,
  width: 'fit-content',
  '&:hover': {
    background: onSelect && isRemoveMode ? theme.palette.action.hover : null,
  },
});

export const getProfBoxStyles = (color: string): SxProps<Theme> => ({
  color: color,
  marginRight: 2,
});
