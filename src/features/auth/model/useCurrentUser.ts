import { useReactiveVar } from '@apollo/client/react';

import { userVar } from '../lib/authState';

export const useCurrentUser = () => {
  return useReactiveVar(userVar);
};
