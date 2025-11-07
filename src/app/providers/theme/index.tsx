import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { getTheme } from '@shared/config/theme/mainTheme';

type ThemeMode = 'light' | 'dark' | 'device';

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within AppThemeProvider');
  return ctx;
};

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return 'device';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  const resolvedMode =
    mode === 'device' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;

  const theme = useMemo(() => getTheme(resolvedMode), [resolvedMode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
