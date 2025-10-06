import { SxProps, Theme } from '@mui/material';

export const editFormWrapper: SxProps<Theme> = (theme) => ({
  maxWidth: { lg: 900, md: 500, sm: 500 },

  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input': {
    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
  },
});
