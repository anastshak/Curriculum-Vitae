import { useMutation } from '@apollo/client/react';
import { UpdateUserInput, User } from 'cv-graphql';

import { updateUserData, userVar } from '@features/auth';

import { UPDATE_USER } from '../graphql/updateUser.graphql';

type UpdateUserArgs = {
  user: UpdateUserInput;
};

type UpdateUserResult = {
  updateUser: User;
};

export function useUpdateUser() {
  return useMutation<UpdateUserResult, UpdateUserArgs>(UPDATE_USER, {
    onCompleted: (data) => {
      if (data?.updateUser) {
        const prevUser = userVar();

        if (prevUser) {
          const updatedUser = {
            ...prevUser,
            ...data.updateUser,
            department: data.updateUser.department,
            position: data.updateUser.position,
          };

          updateUserData(updatedUser);
        }
      }
    },
  });
}
