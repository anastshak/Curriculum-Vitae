import { SkillMastery } from 'cv-graphql';

type Category = {
  id: string;
  name: string;
};

export type SkillsListProps = {
  categories: Category[];
  skills: SkillMastery[];
  isOwner?: boolean;
  onEdit?: (skill: SkillMastery) => void;
  onDelete?: (skill: SkillMastery) => void;
  selectedSkills?: string[];
  onSelectSkill?: (name: string) => void;
};
