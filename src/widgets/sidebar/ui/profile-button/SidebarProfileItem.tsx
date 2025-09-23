import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { Avatar, Divider, Menu, MenuItem, Typography } from '@mui/material';

import useCurrentUser from '@features/auth/model/useCurrentUser';
import { useLogout } from '@features/auth/model/useLogout';
import { ROUTES } from '@shared/consts/routes';

import * as Styled from './SidebarProfileItem.styles';

type SidebarProfileItemProps = {
  isCollapsed: boolean;
};

export const SidebarProfileItem = ({ isCollapsed }: SidebarProfileItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorRef, setAnchorRef] = useState<null | HTMLElement>(null);

  const user = useCurrentUser();
  const logout = useLogout();

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorRef(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorRef(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.USER.PROFILE);
    handleCloseMenu();
  };

  const handleSettingsClick = () => {
    navigate(ROUTES.SETTINGS);
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    logout();
    handleCloseMenu();
  };

  const userName = user?.profile.full_name || user?.email;
  const userAvatar = user?.profile.avatar;
  const userAvatarLetter = (user?.profile.first_name || user?.email)?.[0]?.toUpperCase();

  return (
    <>
      <Styled.Box onClick={handleOpenMenu}>
        {userAvatar ? (
          <Avatar src={userAvatar} sx={{ width: 40, height: 40 }} />
        ) : (
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>{userAvatarLetter}</Avatar>
        )}

        {!isCollapsed && (
          <Typography noWrap sx={{ ml: 1 }}>
            <span>{userName}</span>
          </Typography>
        )}
      </Styled.Box>

      <Menu
        anchorEl={anchorRef}
        open={Boolean(anchorRef)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            width: '200px',
          },
        }}
        autoFocus={false}
      >
        <MenuItem onClick={handleProfileClick}>
          <AccountCircle sx={{ mr: 1.5 }} />
          {t('Profile')}
        </MenuItem>

        <MenuItem onClick={handleSettingsClick}>
          <Settings sx={{ mr: 1.5 }} />
          {t('Settings')}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutClick}>
          <Logout sx={{ mr: 1.5 }} />
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};
