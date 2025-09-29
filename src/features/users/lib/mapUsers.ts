import { User } from 'cv-graphql';

import { UserTableRow } from './types';

export const mapUsers = (users: User[]): UserTableRow[] =>
  users.map((user: User) => ({
    id: user.id,
    avatar: user.profile?.avatar || null,
    firstName: user.profile?.first_name || '—',
    lastName: user.profile?.last_name || '—',
    fullName: user.profile?.full_name || '',
    email: user.email,
    department: user.department?.name || '—',
    position: user.position?.name || '—',
    originalUser: user,
  }));
