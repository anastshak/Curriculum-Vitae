import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { httpLink } from './links/httpLink';

export const cleanClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});
