const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const authStorage = {
  saveTokens: ({ accessToken, refreshToken }: AuthTokens) => {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_KEY);
  },

  hasToken: (): boolean => {
    return Boolean(localStorage.getItem(ACCESS_KEY));
  },

  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
