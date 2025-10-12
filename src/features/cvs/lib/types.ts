import { Cv } from 'cv-graphql';

export type CvRowMenuProps = {
  cv: Cv;
  setEditingCv: (cv: Cv) => void;
};

export interface CvTable {
  id: string;
  name: string;
  description: string;
  employee: string;
  originalCv: Cv;
}
