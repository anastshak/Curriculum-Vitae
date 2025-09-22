import { CombinedGraphQLErrors, ServerError } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

import { UPDATE_TOKEN, UpdateTokenResponse } from '@features/auth/api/updateToken';
import { authSuccess, clearAuth, refreshTokenVar } from '@features/auth/lib/authState';

import { cleanClient } from '../cleanClient';

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error(`GraphQL error: ${message}`);

      if (message === 'Unauthorized') {
        const refreshToken = refreshTokenVar();

        if (!refreshToken) {
          clearAuth();
          return;
        }

        return cleanClient
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

              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${tokens.access_token}`,
                },
              });

              return forward(operation);
            } else {
              clearAuth();
            }
          })
          .catch(() => {
            clearAuth();
          });
      }
    });
  } else if (ServerError.is(error)) {
    console.error(`Server error: ${error.message}`);
  } else if (error) {
    console.error(`Other error: ${error.message}`);
  }
});
