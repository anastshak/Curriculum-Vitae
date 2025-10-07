import { SxProps, Theme } from '@mui/material';

export const wrapper: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  paddingX: 3,
  width: '100%',
  transition: 'all 0.3s ease-in-out',
  marginBottom: { xs: 8, md: 0 },
  minHeight: { xs: 'calc(100vh - 56px)', md: '100vh' },
};
