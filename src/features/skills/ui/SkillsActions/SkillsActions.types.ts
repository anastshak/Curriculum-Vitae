export type SkillsActionsProps = {
  removeMode: boolean;
  selectedSkills: string[];
  deleteLoading: boolean;
  onAdd: () => void;
  onDeleteMode: () => void;
  onCancel: () => void;
  onDelete: () => void;
};
