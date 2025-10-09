export type SkillItemProps = {
  name: string;
  mastery: string;
  isOwner?: boolean;
  isRemoveMode?: boolean;
  onEdit?: () => void;
  selected?: boolean;
  onSelect?: () => void;
};
