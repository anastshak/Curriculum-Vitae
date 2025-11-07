import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';

import { useThemeContext } from '@app/providers/theme';

import { LanguageSelect } from './LanguageSelect';
import { ThemeSelect } from './ThemeSelect';

export const Settings = () => {
  const { i18n } = useTranslation();
  const { mode, setMode } = useThemeContext();

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleThemeChange = (value: string) => {
    setMode(value as 'light' | 'dark' | 'device');
  };

  return (
    <Container maxWidth="md" sx={{ px: 3, py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <LanguageSelect value={language} onChange={setLanguage} loading={false} />
      <ThemeSelect value={mode} onChange={handleThemeChange} loading={false} />
    </Container>
  );
};
