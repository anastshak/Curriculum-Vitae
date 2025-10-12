import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Cv } from 'cv-graphql';

import { ROUTES } from '@shared/consts/routes';

import { CvTable } from '../lib/types';
import { CvRowMenu } from './CvRowMenu';

export const getCvsTableColumns = (
  t: (key: string) => string,
  currentUserEmail: string | undefined,
  navigate: (path: string) => void,
  setEditingCv: (cv: Cv) => void,
  showUserColumn: boolean = false,
): GridColDef<CvTable>[] => {
  const columns: GridColDef<CvTable>[] = [
    {
      field: 'name',
      headerName: t('formFields.cvName'),
      flex: 1.2,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('formFields.description'),
      flex: 2,
      sortable: false,
    },
  ];

  if (showUserColumn) {
    columns.push({
      field: 'employee',
      headerName: t('formFields.employee'),
      flex: 1.3,
      sortable: true,
      valueGetter: (_value, row) => row.originalCv.user?.email || '—',
    });
  }

  columns.push({
    field: 'actions',
    headerName: '',
    width: 60,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const isOwner = params.row.originalCv.user?.email === currentUserEmail;

      return isOwner ? (
        <CvRowMenu cv={params.row.originalCv} setEditingCv={setEditingCv} />
      ) : (
        <IconButton onClick={() => navigate(ROUTES.CV.DETAILS.replace(':cvId', params.row.id.toString()))}>
          <ChevronRightIcon />
        </IconButton>
      );
    },
  });

  return columns;
};
