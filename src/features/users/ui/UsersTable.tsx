import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useCurrentUser } from '@features/auth';
import { EditProfileDialog } from '@features/profile';
import { Loader } from '@shared/ui/Loader';

import { useUsers } from '../api';
import { mapUsers } from '../lib/mapUsers';
import { EditUserForm, UserTableRow } from '../lib/types';
import { Searchbar } from './Searchbar';
import { getUsersTableColumns } from './UsersTableColumns';

export const UsersTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState<EditUserForm | null>(null);

  const { data, loading } = useUsers();
  const currentUser = useCurrentUser();

  const users: UserTableRow[] = useMemo(() => (data?.users ? mapUsers(data.users) : []), [data?.users]);

  const filteredUsers = useMemo(() => {
    if (!currentUser) return [];
    const otherUsers = users.filter(
      (user) => user.id !== currentUser.id && user.fullName.toLowerCase().includes(search.toLowerCase()),
    );
    const currentUserRow = users.find((user) => user.id === currentUser.id);
    return currentUserRow ? [currentUserRow, ...otherUsers] : otherUsers;
  }, [users, search, currentUser]);

  if (loading) return <Loader />;

  return (
    <>
      <Searchbar search={search} setSearch={setSearch} />
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          height: 'calc(100vh - 130px)',
          mb: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={getUsersTableColumns(t, currentUser?.id, navigate, setEditingUser)}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnResize
          disableColumnMenu
          sortingOrder={['asc', 'desc']}
          initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
          pageSizeOptions={[100]}
          paginationMode="client"
          getRowClassName={(params) => (params.row.id === currentUser?.id ? 'current-user-row' : '')}
          sx={{
            '& .current-user-row': {
              borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            border: 'none',
          }}
        />
      </Box>
      <EditProfileDialog editingUser={editingUser} setEditingUser={setEditingUser} />
    </>
  );
};
