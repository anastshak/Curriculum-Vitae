export const ROUTES = {
  AUTH: {
    ROOT: '/auth',
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
  },

  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  HOME: '/home', // временно
} as const;
