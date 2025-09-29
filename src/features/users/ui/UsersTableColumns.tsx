import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { ROUTES } from '@shared/consts/routes';
import { AvatarItem } from '@shared/ui/Avatar';

import { EditUserForm, UserTableRow } from '../lib/types';
import { UserRowMenu } from './UserRowMenu';

export const getUsersTableColumns = (
  t: (key: string) => string,
  currentUserId: string | undefined,
  navigate: (path: string) => void,
  setEditingUser: (user: EditUserForm) => void,
): GridColDef<UserTableRow>[] => [
  {
    field: 'avatar',
    headerName: '',
    width: 80,
    renderCell: (params) => (
      <Box sx={{ px: 1, py: '5px' }}>
        <AvatarItem user={params.row.originalUser} />
      </Box>
    ),
    sortable: false,
  },
  { field: 'firstName', headerName: t('First Name'), flex: 1 },
  { field: 'lastName', headerName: t('Last Name'), flex: 1 },
  { field: 'email', headerName: t('Email'), flex: 1 },
  { field: 'department', headerName: t('Department'), flex: 1 },
  { field: 'position', headerName: t('Position'), flex: 1 },
  {
    field: 'actions',
    headerName: '',
    width: 60,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const isCurrent = params.row.id === currentUserId;
      return isCurrent ? (
        <UserRowMenu user={params.row.originalUser} setEditingUser={setEditingUser} />
      ) : (
        <IconButton onClick={() => navigate(ROUTES.USER.PROFILE.replace(':userId', params.row.id.toString()))}>
          <ChevronRightIcon />
        </IconButton>
      );
    },
  },
];
