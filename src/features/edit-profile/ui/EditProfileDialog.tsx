import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';

import { EditUserData } from '@shared/lib/types/EditUserData';

import { EditProfileForm } from './EditProfileForm';

type Props = {
  editingUser: EditUserData | null;
  setEditingUser: (user: EditUserData | null) => void;
};

export const EditProfileDialog = ({ editingUser, setEditingUser }: Props) => {
  const { t } = useTranslation();

  if (!editingUser) return null;

  const handleClose = () => {
    setEditingUser(null);
  };

  return (
    <Dialog open={!!editingUser} onClose={handleClose} maxWidth="md" fullWidth>
      <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{t('titles.updateUser')}</DialogTitle>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <EditProfileForm editingUser={editingUser} onClose={handleClose} isOwner={true} mode="dialog" />
    </Dialog>
  );
};
