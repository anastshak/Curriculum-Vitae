export type LanguageSelectProps = {
  value: string;
  onChange?: (value: string) => void;
  loading: boolean;
};

export interface ThemeSelectProps extends LanguageSelectProps {
  onChange?: (value: string) => void;
}
