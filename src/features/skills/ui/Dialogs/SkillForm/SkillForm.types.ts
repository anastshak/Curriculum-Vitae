import { Profile } from 'cv-graphql';

export type SkillFormValues = {
  skill: string;
  mastery: string;
};

export type SkillFormProps = {
  user: Profile;
  defaultValues?: SkillFormValues;
  loading?: boolean;
  disabledSkill?: boolean;
  onSubmit: (data: SkillFormValues) => void;
  onCancel: () => void;
};
