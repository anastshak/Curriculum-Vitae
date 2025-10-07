import { CombinedGraphQLErrors, Observable, ServerError } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

import { UPDATE_TOKEN, UpdateTokenResponse } from '@features/auth/api';
import { authSuccess, clearAuth, refreshTokenVar } from '@features/auth/lib/authState';

import { cleanClient } from '../cleanClient';

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const { message } of error.errors) {
      if (message === 'Unauthorized') {
        const refreshToken = refreshTokenVar();

        if (!refreshToken) {
          clearAuth();
          return;
        }

        return new Observable((observer) => {
          cleanClient
            .mutate<UpdateTokenResponse>({
              mutation: UPDATE_TOKEN,
              context: {
                headers: {
                  authorization: `Bearer ${refreshToken}`,
                },
              },
            })
            .then((response) => {
              const tokens = response.data?.updateToken;

              if (tokens) {
                authSuccess({
                  accessToken: tokens.access_token,
                  refreshToken: tokens.refresh_token,
                });

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    authorization: `Bearer ${tokens.access_token}`,
                  },
                }));

                forward(operation).subscribe(observer);
              } else {
                clearAuth();
                observer.error(error);
              }
            })
            .catch((err) => {
              clearAuth();
              observer.error(err);
            });
        });
      }
    }
  }

  if (ServerError.is(error)) {
    console.error(`Server error: ${error.message}`);
  }

  if (error) {
    console.error(`Other error: ${error.message}`);
  }
});
