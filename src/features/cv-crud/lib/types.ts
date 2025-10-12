import { Cv } from 'cv-graphql';

export interface CvFormValues {
  name: string;
  education: string;
  description: string;
}

export type EditDialogProps = {
  editingCv: Cv | null;
  setEditingCv: (cv: Cv | null) => void;
};

export interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface DeleteDialogProps extends CreateDialogProps {
  deletingCv: Cv;
}

export interface MultiCvFormProps {
  editingCv?: Cv | null;
  onClose?: () => void;
  isOwner?: boolean;
  uiMode?: 'dialog' | 'inline';
  functionMode?: 'create' | 'edit';
}
