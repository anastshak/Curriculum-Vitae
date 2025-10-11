export const ROUTES = {
  AUTH: {
    ROOT: '/auth',
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
  },

  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  USERS: '/users',
  USER: {
    ROOT: '/users',
    DETAILS: '/users/:userId',
    PROFILE: '/users/:userId/profile',
    SKILLS: '/users/:userId/skills',
    LANGUAGES: '/users/:userId/languages',
    CVS: '/users/:userId/cvs',
  },

  SETTINGS: '/settings',

  SKILLS: '/skills',
  LANGUAGES: '/languages',
  CVS: '/cvs',
} as const;
