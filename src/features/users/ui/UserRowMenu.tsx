import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Edit, MoreVert } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { mapEditUserData } from '@shared/lib/mapEditUserData';

import { UserRowMenuProps } from '../lib/types';

export const UserRowMenu = ({ user, setEditingUser }: UserRowMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.USER.PROFILE.replace(':userId', user.id));
    handleClose();
  };

  const handleEditClick = () => {
    setEditingUser(mapEditUserData(user));
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoFocus={false}
      >
        <MenuItem onClick={handleProfileClick}>
          <AccountCircle sx={{ mr: 1.5 }} /> {t('navigation.profile')}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleEditClick}>
          <Edit sx={{ mr: 1.5 }} /> {t('titles.editProfile')}
        </MenuItem>
      </Menu>
    </>
  );
};
