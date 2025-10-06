import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useCurrentUser } from '@features/auth';
import { EditProfileForm } from '@features/edit-profile';
import { formatMemberSince } from '@shared/lib/formatDate';
import { mapEditUserData } from '@shared/lib/mapEditUserData';
import { Loader } from '@shared/ui/Loader';

import { useUser } from '../../api';
import { AvatarUpdate } from '../AvatarUpdate';
import { editFormWrapper } from './Profile.styles';

export const Profile = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const { userId } = useParams<{ userId: string }>();

  const { data, loading } = useUser(userId);

  if (loading) return <Loader />;
  if (!data?.user) return <div>{t('profile.error')}</div>;

  const user = data.user;

  const username = user.profile.full_name;
  const isOwner = currentUser?.id === userId;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mx={3} my={4}>
      <AvatarUpdate user={user} isOwner={isOwner} />

      {username && <Typography variant="h5">{username}</Typography>}

      <Typography color="text.secondary" mt={1}>
        {user.email}
      </Typography>

      <Typography variant="body1">
        {t('profile.date')} {formatMemberSince(+user.created_at)}
      </Typography>

      <Box sx={editFormWrapper} width={'100%'}>
        <EditProfileForm editingUser={mapEditUserData(user)} isOwner={isOwner} mode="inline" />
      </Box>
    </Box>
  );
};
