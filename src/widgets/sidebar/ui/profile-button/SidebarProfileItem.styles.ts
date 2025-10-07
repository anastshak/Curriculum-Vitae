import { styled } from '@mui/material';
import { Box as MuiBox } from '@mui/material';

export const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  height: '56px',
  padding: '0px 8px',
  cursor: 'pointer',
  justifyContent: 'flex-start',
  overflowX: 'hidden',
  transition: 'background 200ms, color 200ms',
  borderTopRightRadius: 200,
  borderBottomRightRadius: 200,

  '&:hover': {
    background: theme.palette.action.hover,
  },

  [theme.breakpoints.down('sm')]: {
    height: 'fit-content',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 200,
    justifyContent: 'center',
    padding: '0px 8px',

    span: {
      display: 'none',
    },
  },
}));
