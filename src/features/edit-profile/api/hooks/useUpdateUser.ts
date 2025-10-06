import { useMutation } from '@apollo/client/react';
import { UpdateUserInput, User } from 'cv-graphql';

import { updateUserData, userVar } from '@features/auth';
import { USERS_QUERY } from '@features/users';

import { UPDATE_USER } from '../graphql/updateUser.graphql';

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
    onCompleted: (data) => {
      if (data?.updateUser) {
        const prevUser = userVar();

        if (prevUser) {
          const updatedUser = {
            ...prevUser,
            ...data.updateUser,
          };

          updateUserData(updatedUser);
        }
      }
    },
  });
}
