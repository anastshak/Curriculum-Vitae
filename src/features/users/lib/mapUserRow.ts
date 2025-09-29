import { User } from 'cv-graphql';

import { EditUserForm } from './types';

export const mapUserData = (user: User): EditUserForm => ({
  id: user.id,
  firstName: user.profile.first_name ?? '',
  lastName: user.profile.last_name ?? '',
  email: user.email ?? '',
  department: user.department_name ?? '',
  position: user.position_name ?? '',
});
