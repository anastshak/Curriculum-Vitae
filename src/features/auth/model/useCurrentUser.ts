import { useReactiveVar } from '@apollo/client/react';

import { userVar } from '../lib/authState';

export default function useCurrentUser() {
  return useReactiveVar(userVar);
}
