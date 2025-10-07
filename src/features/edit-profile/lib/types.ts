import { EditUserData } from '@shared/lib/types/EditUserData';

export interface FormValues {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
}

export type DialogProps = {
  editingUser: EditUserData | null;
  setEditingUser: (user: EditUserData | null) => void;
};

export interface EditProfileFormProps {
  editingUser: EditUserData | null;
  onClose?: () => void;
  isOwner?: boolean;
  mode?: 'dialog' | 'inline';
}
