import { CombinedGraphQLErrors, ServerError } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

import { authStorage } from '@shared/lib/authStorage';

export const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error(`GraphQL error: ${message}`);

      if (message === 'Unauthorized') {
        authStorage.clear();
      }
    });
  } else if (ServerError.is(error)) {
    console.error(`Server error: ${error.message}`);
  } else if (error) {
    console.error(`Other error: ${error.message}`);
  }
});
