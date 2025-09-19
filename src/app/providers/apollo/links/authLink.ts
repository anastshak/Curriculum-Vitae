import { SetContextLink } from '@apollo/client/link/context';

import { authStorage } from '@features/auth';

export const authLink = new SetContextLink(async (prevContext) => {
  const token = authStorage.getAccessToken();

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
