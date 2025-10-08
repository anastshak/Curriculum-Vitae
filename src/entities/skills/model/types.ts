import { Profile } from 'cv-graphql';

export type GroupedSkillSelectProps = {
  user: Profile;
  value: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
};
