import { useMutation } from '@apollo/client/react';
import { ForgotPasswordInput } from 'cv-graphql';

import { PASSWORD_MUTATION } from '../graphql/forgotPsw.graphql';

type ForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export function useForgotPassword() {
  return useMutation<void, ForgotPasswordArgs>(PASSWORD_MUTATION);
}
