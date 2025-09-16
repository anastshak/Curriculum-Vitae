import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';

import { client } from './providers/apollo/client';
import { router } from './providers/router/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </ApolloProvider>
  </StrictMode>,
);
