import { useQuery } from '@apollo/client/react';
import { Language } from 'cv-graphql';

import { LANGUAGES_QUERY } from '../graphql/languages.graphql';

type LanguagesResult = {
  languages: Language[];
};

export function useLanguages() {
  return useQuery<LanguagesResult>(LANGUAGES_QUERY);
}
