import { User } from 'cv-graphql';

import { EditUserData } from './types/EditUserData';

export const mapEditUserData = (user: User): EditUserData => ({
  id: user.id,
  firstName: user.profile.first_name ?? '',
  lastName: user.profile.last_name ?? '',
  email: user.email ?? '',
  department: user.department ? { id: user.department.id, name: user.department.name } : { id: '', name: '' },
  position: user.position ? { id: user.position.id, name: user.position.name } : { id: '', name: '' },
});
