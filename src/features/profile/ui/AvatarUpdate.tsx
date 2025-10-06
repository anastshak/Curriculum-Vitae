import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { User } from 'cv-graphql';

import { AvatarItem } from '@shared/ui/Avatar';

type Props = {
  user: User;
  isOwner: boolean;
};

export const AvatarUpdate = ({ user, isOwner }: Props) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={4}>
      <AvatarItem user={user} isProfile />
      {isOwner && <Box ml={6}>Owner!!!</Box>}
    </Box>
  );
};
