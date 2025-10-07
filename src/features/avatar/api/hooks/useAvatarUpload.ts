import { useMutation } from '@apollo/client/react';
import { UploadAvatarInput } from 'cv-graphql';

import { updateUserData, userVar } from '@features/auth';
import { USERS_QUERY } from '@features/users';

import { UPLOAD_AVATAR } from '../graphql/upload.graphql';

type UploadAvatarArgs = {
  avatar: UploadAvatarInput;
};

type UploadAvatarResult = {
  uploadAvatar: string;
};

export function useAvatarUpload() {
  return useMutation<UploadAvatarResult, UploadAvatarArgs>(UPLOAD_AVATAR, {
    refetchQueries: [{ query: USERS_QUERY }],
    onCompleted: (data) => {
      if (data?.uploadAvatar) {
        const prevUser = userVar();

        if (prevUser) {
          const updatedUser = {
            ...prevUser,
            profile: {
              ...prevUser.profile,
              avatar: data.uploadAvatar,
            },
          };

          updateUserData(updatedUser);
        }
      }
    },
  });
}
