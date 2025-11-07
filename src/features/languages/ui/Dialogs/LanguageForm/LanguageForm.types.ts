import { LanguageProficiency, Profile } from 'cv-graphql';

export type LanguageFormProps = {
  user: Profile;
  defaultValues?: LanguageProficiency;
  loading?: boolean;
  disabledLanguage?: boolean;
  onSubmit: (data: LanguageProficiency) => void;
  onCancel: () => void;
};
