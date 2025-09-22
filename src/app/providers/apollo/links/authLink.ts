import { SetContextLink } from '@apollo/client/link/context';

import { accessTokenVar } from '@features/auth';

export const authLink = new SetContextLink(async (prevContext) => {
  const token = accessTokenVar();

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
