import { createTheme } from '@mui/material';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#C63031',
        light: '#d95557',
        dark: '#8c2122',
      },
      background: {
        default: mode === 'dark' ? '#353535' : '#F5F5F7',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#2E2E2E',
        secondary: '#767676',
      },
      action: {
        hover: 'rgba(118, 118, 118, 0.04)',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': { width: 5, height: 5 },
          '::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd' },
          '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
          html: { height: '100%' },
          body: { height: '100%' },
          '#root': { height: '100%', minHeight: '100vh', margin: '0 auto' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            borderRadius: 40,
            height: 48,
            minWidth: 220,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            height: 56,
            paddingTop: 6,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#2e2e2e' : '#f5f5f7',
            minWidth: 150,
            '&:active': {
              fontWeight: 600,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: 48,
            padding: '12px',
            borderRadius: 0,
          },
          input: {
            padding: 0,
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${mode === 'dark' ? '#353535' : '#F5F5F7'} inset`,
              WebkitTextFillColor: mode === 'dark' ? '#FFFFFF' : '#2E2E2E',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            transform: 'translate(12px, 12px) scale(1)',
          },
          shrink: {
            transform: 'translate(12px, -9px) scale(0.75)',
          },
        },
      },
    },
  });
