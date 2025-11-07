import { useMutation } from '@apollo/client/react';
import { DeleteProfileLanguageInput, Language, Profile } from 'cv-graphql';

import { DELETE_PROFILE_LANGUAGE } from '../graphql/deleteLanguage.graphql';

type DeleteLanguageArgs = {
  language: DeleteProfileLanguageInput;
};

type DeleteLanguageResult = {
  deleteProfileLanguage: Profile;
};

export function useDeleteProfileLanguage() {
  return useMutation<DeleteLanguageResult, DeleteLanguageArgs>(DELETE_PROFILE_LANGUAGE, {
    update: (cache, { data }, { variables }) => {
      if (!data || !variables) return;

      const userId = variables.language.userId;
      const languages = variables.language.name;

      cache.modify({
        id: cache.identify({ __typename: 'Profile', id: userId }),
        fields: {
          languages(existingLanguages = []) {
            return existingLanguages.filter((language: Language) => !languages.includes(language.name));
          },
        },
      });
    },
  });
}
