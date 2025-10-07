import { useMutation } from '@apollo/client/react';
import { ResetPasswordInput } from 'cv-graphql';

import { PASSWORD_MUTATION } from '../graphql/resetPsw.graphql';

type ResetPasswordArgs = {
  auth: ResetPasswordInput;
};

export function useResetPassword() {
  return useMutation<void, ResetPasswordArgs>(PASSWORD_MUTATION);
}
