import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { authLink } from './links/authLink';
import { errorLink } from './links/errorLink';
import { httpLink } from './links/httpLink';

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
