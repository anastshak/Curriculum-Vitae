import { Profile } from 'cv-graphql';

export type Props = {
  user: Profile;
  value: string;
  onChange?: (value: string) => void;
  loading: boolean;
  disabled: boolean;
};
