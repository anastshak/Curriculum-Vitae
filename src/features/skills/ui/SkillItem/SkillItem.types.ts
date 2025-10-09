export type SkillItemProps = {
  name: string;
  mastery: string;
  isOwner?: boolean;
  onEdit?: () => void;
  selected?: boolean;
  onSelect?: () => void;
};
