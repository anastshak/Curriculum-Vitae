import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

export const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  gap: 16,
  padding: '9px 16px',
  marginBottom: '16px',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  width: '100%',
  overflowX: 'hidden',
  transition: 'background 200ms, color 200ms',
  borderTopRightRadius: 200,
  borderBottomRightRadius: 200,

  '&.active': {
    color: theme.palette.text.primary,
    background: theme.palette.action.hover,
  },

  '&:hover': {
    background: theme.palette.action.hover,
  },

  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    height: 40,
    borderRadius: 200,
    padding: '4px 8px',
    marginBottom: 0,
  },

  [theme.breakpoints.down('sm')]: {
    span: {
      display: 'none',
    },
  },
}));
