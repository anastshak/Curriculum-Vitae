import { styled, SxProps, Theme } from '@mui/material';

export const wrapper: SxProps<Theme> = () => ({
  paddingTop: 4,
  paddingBottom: 4,
  '@media print': {
    margin: 0,
    padding: 0,
    printColorAdjust: 'exact',
  },
});

export const head: SxProps<Theme> = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const summary: SxProps<Theme> = () => ({
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  marginBottom: 4,
});

export const PageBreak = styled('div')({
  pageBreakAfter: 'always',
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

export const noPrint: SxProps<Theme> = () => ({
  '@media print': {
    display: 'none',
  },
});
