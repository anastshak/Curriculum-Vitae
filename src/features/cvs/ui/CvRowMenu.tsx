import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Edit, MoreVert } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { DeleteCvDialog } from '@features/cv-crud';
import { ROUTES } from '@shared/consts/routes';

import { CvRowMenuProps } from '../lib/types';

export const CvRowMenu = ({ cv, setEditingCv }: CvRowMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.CV.DETAILS.replace(':cvId', cv.id));
    handleClose();
  };

  const handleEditClick = () => {
    setEditingCv(cv);
    handleClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
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
          <ArticleIcon sx={{ mr: 1.5 }} /> {t('navigation.cvDetails')}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleEditClick}>
          <Edit sx={{ mr: 1.5 }} /> {t('titles.updateCv')}
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon sx={{ mr: 1.5 }} /> {t('titles.deleteCv')}
        </MenuItem>
      </Menu>

      <DeleteCvDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} deletingCv={cv} />
    </>
  );
};
