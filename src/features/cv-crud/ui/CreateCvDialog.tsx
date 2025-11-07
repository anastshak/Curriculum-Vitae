import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';

import { CreateDialogProps } from '../lib/types';
import { MultiCvForm } from './MultiCvForm';

export const CreateCvDialog = ({ open, onClose }: CreateDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{t('titles.createCv')}</DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <MultiCvForm onClose={onClose} isOwner={true} uiMode="dialog" functionMode="create" />
    </Dialog>
  );
};
