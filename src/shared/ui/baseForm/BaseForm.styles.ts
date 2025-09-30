import { SxProps, Theme } from '@mui/material';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 560,
  height: 'calc(100% - 56px)',
  margin: '0 auto',
};

export const alertBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
};

export const footerBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  margin: '40px auto 0',
};

export const submitBtn: SxProps<Theme> = {
  py: 1.5,
  fontSize: '14px',
  fontWeight: 'medium',
};
