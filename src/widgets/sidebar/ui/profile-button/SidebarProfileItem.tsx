import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { Divider, Menu, MenuItem, Typography } from '@mui/material';

import { useCurrentUser } from '@features/auth';
import { useLogout } from '@features/auth/model/useLogout';
import { ROUTES } from '@shared/consts/routes';
import { AvatarItem } from '@shared/ui/Avatar';

import * as Styled from './SidebarProfileItem.styles';

type SidebarProfileItemProps = {
  isCollapsed: boolean;
};

export const SidebarProfileItem = ({ isCollapsed }: SidebarProfileItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorRef, setAnchorRef] = useState<null | HTMLElement>(null);

  const currUser = useCurrentUser();
  const logout = useLogout();

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorRef(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorRef(null);
  };

  const handleProfileClick = () => {
    const userId = currUser ? currUser.id : '';
    navigate(ROUTES.USER.PROFILE.replace(':userId', userId));
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

  const userName = currUser?.profile.full_name || currUser?.email;

  return (
    <>
      <Styled.Box onClick={handleOpenMenu}>
        {currUser && <AvatarItem user={currUser} />}

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
          {t('navigation.profile')}
        </MenuItem>

        <MenuItem onClick={handleSettingsClick}>
          <Settings sx={{ mr: 1.5 }} />
          {t('navigation.settings')}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutClick}>
          <Logout sx={{ mr: 1.5 }} />
          {t('auth.logout')}
        </MenuItem>
      </Menu>
    </>
  );
};
