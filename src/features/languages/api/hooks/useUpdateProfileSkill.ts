import { useMutation } from '@apollo/client/react';
import { Profile, UpdateProfileLanguageInput } from 'cv-graphql';

import { UPDATE_PROFILE_LANGUAGE } from '../graphql/updateLanguage.graphql';

type UpdateLanguageArgs = {
  language: UpdateProfileLanguageInput;
};

type UpdateLanguageResult = {
  updateProfileLanguage: Profile;
};

export function useUpdateProfileLanguage() {
  return useMutation<UpdateLanguageResult, UpdateLanguageArgs>(UPDATE_PROFILE_LANGUAGE);
}
