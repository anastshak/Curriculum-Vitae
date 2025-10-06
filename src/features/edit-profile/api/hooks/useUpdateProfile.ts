import { useMutation } from '@apollo/client/react';
import { UpdateProfileInput, User } from 'cv-graphql';

import { updateUserData, userVar } from '@features/auth';
import { USERS_QUERY } from '@features/users';

import { UPDATE_PROFILE } from '../graphql/updateProfile.graphql';

type UpdateProfileArgs = {
  profile: UpdateProfileInput;
};

type UpdateProfileResult = {
  updateProfile: User;
};

export function useUpdateProfile() {
  return useMutation<UpdateProfileResult, UpdateProfileArgs>(UPDATE_PROFILE, {
    refetchQueries: [{ query: USERS_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (data?.updateProfile) {
        const prevUser = userVar();

        if (prevUser) {
          const updatedUser = {
            ...prevUser,
            profile: {
              ...prevUser.profile,
              ...data.updateProfile,
            },
          };

          updateUserData(updatedUser);
        }
      }
    },
  });
}
