import { Avatar } from '@mui/material';
import { User } from 'cv-graphql';

interface AvatarProps {
  user: User;
  isProfile?: boolean;
  color?: string | null;
}

export const AvatarItem = ({ user, isProfile, color = null }: AvatarProps) => {
  const userAvatar = user?.profile.avatar;
  const userAvatarLetter = (user?.profile.first_name || user?.email)?.[0]?.toUpperCase();

  const size = isProfile ? 120 : 40;
  const fontSize = isProfile ? 40 : 20;

  return (
    <>
      {userAvatar ? (
        <Avatar src={userAvatar} sx={{ width: size, height: size }} />
      ) : (
        <Avatar sx={{ width: size, height: size, bgcolor: color, fontSize: fontSize }}>{userAvatarLetter}</Avatar>
      )}
    </>
  );
};
