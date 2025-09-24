import { Avatar } from '@mui/material';
import { User } from 'cv-graphql';

interface AvatarProps {
  user: User;
}

export const AvatarItem = ({ user }: AvatarProps) => {
  const userAvatar = user?.profile.avatar;
  const userAvatarLetter = (user?.profile.first_name || user?.email)?.[0]?.toUpperCase();

  return (
    <>
      {userAvatar ? (
        <Avatar src={userAvatar} sx={{ width: 40, height: 40 }} />
      ) : (
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>{userAvatarLetter}</Avatar>
      )}
    </>
  );
};
