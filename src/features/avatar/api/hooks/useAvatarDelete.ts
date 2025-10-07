import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { DeleteAvatarInput } from 'cv-graphql';

import { updateUserData, userVar } from '@features/auth';
import { USERS_QUERY } from '@features/users';

type DeleteAvatarArgs = {
  avatar: DeleteAvatarInput;
};

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export function useAvatarDelete() {
  return useMutation<void, DeleteAvatarArgs>(DELETE_AVATAR, {
    refetchQueries: [{ query: USERS_QUERY }],
    onCompleted: () => {
      const prevUser = userVar();

      if (prevUser) {
        const updatedUser = {
          ...prevUser,
          profile: {
            ...prevUser.profile,
            avatar: null,
          },
        };

        updateUserData(updatedUser);
      }
    },
  });
}
