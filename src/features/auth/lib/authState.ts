import { makeVar } from '@apollo/client';

import { authStorage, AuthTokens } from './authStorage';

export const isAuthenticatedVar = makeVar<boolean>(authStorage.hasToken());
export const accessTokenVar = makeVar<string | null>(authStorage.getAccessToken());
export const refreshTokenVar = makeVar<string | null>(authStorage.getRefreshToken());

export function authSuccess(tokens: AuthTokens) {
  authStorage.saveTokens(tokens);
  accessTokenVar(tokens.accessToken);
  refreshTokenVar(tokens.refreshToken);
  isAuthenticatedVar(true);
}

export function clearAuth() {
  authStorage.clear();
  accessTokenVar(null);
  refreshTokenVar(null);
  isAuthenticatedVar(false);
}
