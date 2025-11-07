export type ButtonsActionsProps = {
  removeMode: boolean;
  selectedItems: string[];
  deleteLoading: boolean;
  onAdd: () => void;
  onDeleteMode: () => void;
  onCancel: () => void;
  onDelete: () => void;
  location: 'skills' | 'languages';
};
