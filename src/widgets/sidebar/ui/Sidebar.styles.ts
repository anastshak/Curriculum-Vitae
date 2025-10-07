import { styled } from '@mui/material';
import { Box as MuiBox } from '@mui/material';
import { Drawer as MuiDrawer } from '@mui/material';
import { List as MuiList } from '@mui/material';

interface StyledProps {
  isCollapsed: boolean;
}

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<StyledProps>(({ theme, isCollapsed }) => ({
  boxSizing: 'border-box',
  width: isCollapsed ? '56px' : '200px',
  flexShrink: 0,

  [`& .MuiDrawer-paper`]: {
    width: isCollapsed ? '56px' : '200px',
    transition: 'width 0.5s',
    paddingTop: '44px',
    borderRight: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 56,
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: '9999',

    [`& .MuiDrawer-paper`]: {
      width: '100%',
      height: 56,
      position: 'fixed',
      bottom: 0,
      top: 'auto',
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 16px',
      overflowY: 'hidden',
      backgroundColor: theme.palette.background.default,
      borderTop: `1px solid #e0e0e0`,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      zIndex: '9999',
    },
  },
}));

export const List = styled(MuiList)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0,
  },
}));

export const Box = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<StyledProps>(({ theme, isCollapsed }) => ({
  display: 'flex',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  padding: '8px',
  margin: '8px',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const SpacerBox = styled(MuiBox)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
