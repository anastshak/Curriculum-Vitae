import { Theme } from '@mui/material';

import { ColorValues, ThemedColorValues } from './types';

export function getValuesFromTheme(theme: Theme, color: ThemedColorValues | ColorValues) {
  const mode = theme.palette.mode as 'light' | 'dark';
  return (mode in color ? (color as ThemedColorValues)[mode] : color) as ColorValues;
}
