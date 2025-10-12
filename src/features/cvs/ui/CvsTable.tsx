import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Cv } from 'cv-graphql';

import { useCurrentUser } from '@features/auth';
import { CreateCvDialog, EditCvDialog } from '@features/cv-crud';
import { Loader } from '@shared/ui/Loader';
import { Searchbar } from '@shared/ui/Searchbar';

import { useCvs, useUser } from '../api';
import { CvTable } from '../lib/types';
import { getCvsTableColumns } from './CvsTableColumns';

export const CvsTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useCurrentUser();

  const [search, setSearch] = useState('');
  const [editingCv, setEditingCv] = useState<Cv | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: cvsData, loading: cvsLoading } = useCvs();
  const { data: userData, loading: userLoading } = useUser(userId);

  const isUserPage = Boolean(userId);

  const cvsSource = isUserPage ? userData?.user?.cvs : cvsData?.cvs;
  const showUserColumn = !isUserPage;

  const loading = isUserPage ? userLoading : cvsLoading;
  const isOwner = currentUser?.id === userId;

  const cvs: CvTable[] = useMemo(() => {
    if (!cvsSource) return [];
    return cvsSource.map((cv) => ({
      id: cv.id,
      name: cv.name,
      description: cv.description,
      employee: cv.user?.email ?? '',
      originalCv: cv,
    }));
  }, [cvsSource]);

  const filteredCvs = useMemo(() => {
    const searchLower = search.toLowerCase();
    return cvs.filter(
      (cv) => cv.name.toLowerCase().includes(searchLower) || cv.description.toLowerCase().includes(searchLower),
    );
  }, [cvs, search]);

  if (loading) return <Loader />;

  const handleCreateOpen = () => setCreateDialogOpen(true);
  const handleCreateClose = () => setCreateDialogOpen(false);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Searchbar search={search} setSearch={setSearch} />
        {isOwner && (
          <Button variant="text" startIcon={<AddIcon />} onClick={handleCreateOpen}>
            {t('cvs.createBtn')}
          </Button>
        )}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          mb: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <DataGrid
          rows={filteredCvs}
          columns={getCvsTableColumns(t, currentUser?.email, navigate, setEditingCv, showUserColumn)}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnResize
          disableColumnMenu
          localeText={{
            noRowsLabel: t('cvs.noData'),
          }}
          sortingOrder={['asc', 'desc']}
          initialState={{ pagination: { paginationModel: { pageSize: 7 } } }}
          pageSizeOptions={[7]}
          paginationMode="client"
          sx={{ border: 'none' }}
        />
      </Box>

      <EditCvDialog editingCv={editingCv} setEditingCv={setEditingCv} />
      <CreateCvDialog open={createDialogOpen} onClose={handleCreateClose} />
    </>
  );
};
