import { useMutation } from '@apollo/client/react';
import { AddProfileLanguageInput, Profile } from 'cv-graphql';

import { ADD_PROFILE_LANGUAGE } from '../graphql/addLanguage.graphql';

type AddLanguageArgs = {
  language: AddProfileLanguageInput;
};

type AddLanguageResult = {
  addProfileLanguage: Profile;
};

export function useAddProfileLanguage() {
  return useMutation<AddLanguageResult, AddLanguageArgs>(ADD_PROFILE_LANGUAGE);
}
