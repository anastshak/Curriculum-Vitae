import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';

import { EditDialogProps } from '../lib/types';
import { MultiCvForm } from './MultiCvForm';

export const EditCvDialog = ({ editingCv, setEditingCv }: EditDialogProps) => {
  const { t } = useTranslation();

  if (!editingCv) return null;

  const handleClose = () => {
    setEditingCv(null);
  };

  return (
    <Dialog open={!!editingCv} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{t('titles.updateCv')}</DialogTitle>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <MultiCvForm editingCv={editingCv} onClose={handleClose} isOwner={true} uiMode="dialog" functionMode="edit" />
    </Dialog>
  );
};
