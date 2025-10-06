import { User } from 'cv-graphql';

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
