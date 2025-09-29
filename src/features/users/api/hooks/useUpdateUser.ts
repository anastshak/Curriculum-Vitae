import { useMutation } from '@apollo/client/react';
import { UpdateUserInput, User } from 'cv-graphql';

import { UPDATE_USER } from '../graphql/updateUser.graphql';
import { USERS_QUERY } from '../graphql/users.graphql';

type UpdateUserArgs = {
  user: UpdateUserInput;
};

type UpdateUserResult = {
  updateUser: User;
};

export function useUpdateUser() {
  return useMutation<UpdateUserResult, UpdateUserArgs>(UPDATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
  });
}
