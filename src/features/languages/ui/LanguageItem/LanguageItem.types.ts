export type LanguageItemProps = {
  name: string;
  proficiency: string;
  isOwner?: boolean;
  isRemoveMode?: boolean;
  onEdit?: () => void;
  selected?: boolean;
  onSelect?: () => void;
};
