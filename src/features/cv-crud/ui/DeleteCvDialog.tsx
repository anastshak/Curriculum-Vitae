import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

import { useDeleteCv } from '../api';
import { DeleteDialogProps } from '../lib/types';

export const DeleteCvDialog = ({ open, onClose, deletingCv }: DeleteDialogProps) => {
  const { t } = useTranslation();
  const cvId = deletingCv ? deletingCv.id : '';

  const [deleteCv, { loading }] = useDeleteCv(cvId);

  const handleConfirm = async () => {
    try {
      await deleteCv({
        variables: {
          cv: {
            cvId: cvId,
          },
        },
      });
      onClose?.();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{t('titles.deleteCv')}</DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Typography>
          {t('cvs.confirmDelete')}{' '}
          <Typography component="span" fontWeight="bold">
            {deletingCv.name}
          </Typography>
          ?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ mb: 2, mr: 2, display: 'flex', flexWrap: 'wrap' }}>
        <Button onClick={onClose} disabled={loading}>
          {t('buttonMessages.cancel')}
        </Button>

        <Button onClick={handleConfirm} variant="contained" disabled={loading}>
          {loading ? t('buttonMessages.wait') : t('buttonMessages.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
