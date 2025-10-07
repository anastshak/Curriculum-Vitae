import { User } from 'cv-graphql';

import { EditUserData } from '@shared/lib/types/EditUserData';

export interface UserTableRow {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  originalUser: User;
}

export interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export type UserRowMenuProps = {
  user: User;
  setEditingUser: (user: EditUserData) => void;
};
