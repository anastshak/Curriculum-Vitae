import { ChangeEvent, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Close, FileUploadOutlined } from '@mui/icons-material';
import { Badge, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { User } from 'cv-graphql';

import { useNotification } from '@shared/config/notification';
import { AvatarItem } from '@shared/ui/Avatar';

import { useAvatarDelete, useAvatarUpload } from '../api';
import { fileToBase64 } from '../lib/fileToBase64';

type Props = {
  user: User;
  isOwner: boolean;
};

export const AvatarUpdate = ({ user, isOwner }: Props) => {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const [uploadAvatar, { loading: uploading }] = useAvatarUpload();
  const [deleteAvatar, { loading: deleting }] = useAvatarDelete();
  const loading = uploading || deleting;

  const handleUpload = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      showNotification(t('profile.avatarMsg.size'), 'warning');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showNotification(t('profile.avatarMsg.types'), 'error');
      return;
    }

    fileToBase64(file).then((avatar) => {
      uploadAvatar({
        variables: { avatar: { userId: user.id, ...avatar } },
      })
        .then(() => showNotification(t('profile.avatarMsg.uploadSuccess'), 'success'))
        .catch(() => showNotification(t('profile.avatarMsg.uploadError'), 'error'));
    });
  };

  const handleDelete = () => {
    deleteAvatar({ variables: { avatar: { userId: user.id } } })
      .then(() => showNotification(t('profile.avatarMsg.deleteSuccess'), 'success'))
      .catch(() => showNotification(t('profile.avatarMsg.deleteError'), 'error'));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpload(event.target.files);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" my={4}>
      <Badge
        badgeContent={
          user.profile.avatar &&
          isOwner && (
            <IconButton
              disabled={loading}
              onClick={handleDelete}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              {loading ? <CircularProgress size={16} /> : <Close />}
            </IconButton>
          )
        }
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <AvatarItem user={user} isProfile />
      </Badge>

      {isOwner && (
        <Box
          component="div"
          ml={6}
          textAlign="center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          sx={{
            cursor: 'pointer',
          }}
        >
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            disabled={loading}
            onChange={handleChange}
            style={{
              display: 'none',
            }}
            id="avatar-upload-input"
          />

          <label htmlFor="avatar-upload-input" style={{ cursor: 'pointer' }}>
            <Typography variant="h6" component="div" display="flex" alignItems="flex-end">
              <FileUploadOutlined fontSize="large" sx={{ mr: 2 }} />
              {t('profile.uploadAvatar')}
            </Typography>

            <Typography variant="body1" color="text.secondary" mt={1}>
              {t('profile.avatarParams')}
            </Typography>

            {loading && <CircularProgress size={24} sx={{ mt: 1 }} />}
          </label>
        </Box>
      )}
    </Box>
  );
};
