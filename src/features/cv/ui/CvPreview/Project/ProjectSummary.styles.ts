import { SxProps, Theme } from '@mui/material';

export const wrapper: SxProps<Theme> = () => ({
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  marginBottom: 4,
});

export const title: SxProps<Theme> = () => ({
  fontWeight: 'bold',
  marginTop: 2,
  marginBottom: 1,
});

export const main: SxProps<Theme> = (theme) => ({
  paddingLeft: 3,
  paddingBottom: 2,
  borderLeft: `1px ${theme.palette.primary.main} solid`,
});

export const responWrapper: SxProps<Theme> = (theme) => ({
  margin: 0,
  paddingLeft: 1,

  '& > li::marker': {
    color: theme.palette.primary.main,
  },
});
