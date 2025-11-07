import { SxProps, Theme } from '@mui/material';

export const table: SxProps<Theme> = (theme) => ({
  borderCollapse: 'collapse',
  '& td': { borderBottom: `1px #bdbdbd solid` },
  '& th': { borderBottom: `1px ${theme.palette.primary.main}  solid` },
});

export const head: SxProps<Theme> = () => ({
  textTransform: 'uppercase',
});

export const categoryCell: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  verticalAlign: 'top',
});

export const skillsCell: SxProps<Theme> = () => ({
  verticalAlign: 'top',
  textAlign: 'left',
});

export const lastCell: SxProps<Theme> = () => ({
  verticalAlign: 'top',
  textAlign: 'center',
});
