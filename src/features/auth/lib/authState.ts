import { makeVar } from '@apollo/client';
import { User } from 'cv-graphql';

import { authStorage, AuthTokens } from './authStorage';

export const isAuthenticatedVar = makeVar<boolean>(authStorage.hasToken());
export const accessTokenVar = makeVar<string | null>(authStorage.getAccessToken());
export const refreshTokenVar = makeVar<string | null>(authStorage.getRefreshToken());
export const userVar = makeVar<User | null>(authStorage.getUser());

export function authSuccess(tokens: AuthTokens, user?: User) {
  authStorage.saveTokens(tokens);
  accessTokenVar(tokens.accessToken);
  refreshTokenVar(tokens.refreshToken);
  isAuthenticatedVar(true);

  if (user) {
    authStorage.saveUser(user);
    userVar(user);
  }
}

export function clearAuth() {
  authStorage.clear();
  accessTokenVar(null);
  refreshTokenVar(null);
  userVar(null);
  isAuthenticatedVar(false);
}
