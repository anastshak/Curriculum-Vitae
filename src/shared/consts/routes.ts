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
    PROFILE: '/users/:userId',
    SKILLS: '/users/skills',
    LANGUAGES: '/users/languages',
    CVS: '/users/cvs',
  },

  SETTINGS: '/settings',

  SKILLS: '/skills',
  LANGUAGES: '/languages',
  CVS: '/cvs',
} as const;
