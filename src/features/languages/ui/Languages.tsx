import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { LanguageProficiency, Profile } from 'cv-graphql';

import { useCurrentUser } from '@features/auth';
import { useProfile } from '@features/skills/api';
import { AddButton } from '@shared/ui/Buttons';
import { ButtonsActions } from '@shared/ui/ButtonsActions';
import { Loader } from '@shared/ui/Loader';

import { useDeleteProfileLanguage } from '../api';
import { LanguagesList } from './LanguagesList/LanguagesList';
import { AddLanguageDialog, UpdateLanguageDialog } from './Dialogs';

export const ProfileLanguages = () => {
  const { t } = useTranslation();

  const { userId: paramUserId } = useParams<{ userId: string }>();
  const currentUser = useCurrentUser();

  const userId = paramUserId ?? currentUser?.id;

  const { data: profileData, loading: profileLoading } = useProfile(userId!);
  const [deleteLanguage, { loading: deleteLoading }] = useDeleteProfileLanguage();

  const [openAdd, setOpenAdd] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<LanguageProficiency | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const user = profileData?.profile || currentUser?.profile;
  const isOwner = !paramUserId || currentUser?.id === paramUserId;

  const languages = user?.languages || [];

  const isLoading = profileLoading;
  const hasLanguages = languages.length > 0;

  const handleLanguageSelect = (name: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(name) ? prev.filter((language) => language !== name) : [...prev, name],
    );
  };

  const handleDeleteSelected = async () => {
    if (!selectedLanguages.length || !userId) return;

    if (userId) {
      await deleteLanguage({
        variables: {
          language: {
            userId,
            name: selectedLanguages,
          },
        },
      });
    }

    setRemoveMode(false);
    setSelectedLanguages([]);
  };

  const handleCloseDialogs = useCallback(() => {
    setOpenAdd(false);
    setEditingLanguage(null);
  }, []);

  const handleCancel = useCallback(() => {
    setRemoveMode(false);
    setSelectedLanguages([]);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      {!hasLanguages ? (
        <Box textAlign="center">
          {isOwner ? (
            <AddButton location="languages" handleClick={() => setOpenAdd(true)} />
          ) : (
            <Typography color="text.secondary">{t('languages.noLanguages')}</Typography>
          )}
        </Box>
      ) : (
        <LanguagesList
          languages={languages}
          isOwner={isOwner}
          isRemoveMode={removeMode}
          onEdit={(language) => setEditingLanguage(language)}
          selectedLanguages={selectedLanguages}
          onSelectLanguage={removeMode ? handleLanguageSelect : undefined}
        />
      )}

      {isOwner && hasLanguages && (
        <ButtonsActions
          removeMode={removeMode}
          selectedItems={selectedLanguages}
          deleteLoading={deleteLoading}
          onAdd={() => setOpenAdd(true)}
          onDeleteMode={() => setRemoveMode(true)}
          onCancel={handleCancel}
          onDelete={handleDeleteSelected}
          location="languages"
        />
      )}

      {openAdd && isOwner && <AddLanguageDialog open={openAdd} user={user as Profile} onClose={handleCloseDialogs} />}

      {editingLanguage && user && (
        <UpdateLanguageDialog
          open={!!editingLanguage}
          user={user as Profile}
          languageName={editingLanguage.name}
          proficiency={editingLanguage.proficiency}
          onClose={handleCloseDialogs}
        />
      )}
    </Container>
  );
};
