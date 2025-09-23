import { User } from 'cv-graphql';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user';

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

  saveUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
