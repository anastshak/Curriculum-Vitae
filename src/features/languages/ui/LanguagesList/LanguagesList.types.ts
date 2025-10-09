import { LanguageProficiency } from 'cv-graphql';

export type LanguagesListProps = {
  languages: LanguageProficiency[];
  isOwner?: boolean;
  isRemoveMode?: boolean;
  onEdit?: (language: LanguageProficiency) => void;
  onDelete?: (language: LanguageProficiency) => void;
  selectedLanguages?: string[];
  onSelectLanguage?: (name: string) => void;
};
