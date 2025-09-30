import { SxProps, Theme } from '@mui/material';

export const wrapper: SxProps<Theme> = {
  paddingTop: 2,
  paddingLeft: 3,
  height: '44px',
};

export const linkItem: SxProps<Theme> = {
  color: 'text.secondary',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};
