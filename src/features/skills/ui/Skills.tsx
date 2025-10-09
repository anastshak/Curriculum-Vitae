import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { Profile, SkillMastery } from 'cv-graphql';

import { useCurrentUser } from '@features/auth';
import { useDeleteProfileSkill, useProfile, useSkillCategories } from '@features/skills/api';
import { Loader } from '@shared/ui/Loader';

import { SkillsList } from './SkillsList/SkillsList';
import { AddButton } from './Buttons';
import { AddSkillDialog, UpdateSkillDialog } from './Dialogs';
import { SkillsActions } from './SkillsActions';

export const ProfileSkills = () => {
  const { t } = useTranslation();

  const { userId: paramUserId } = useParams<{ userId: string }>();
  const currentUser = useCurrentUser();

  const userId = paramUserId ?? currentUser?.id;

  const { data: profileData, loading: profileLoading, refetch } = useProfile(userId!);
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();
  const [deleteSkill, { loading: deleteLoading }] = useDeleteProfileSkill();

  const [openAdd, setOpenAdd] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillMastery | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const user = profileData?.profile || currentUser?.profile;
  const isOwner = !paramUserId || currentUser?.id === paramUserId;

  const categories = categoriesData?.skillCategories || [];
  const skills = user?.skills || [];

  const isLoading = profileLoading || categoriesLoading;
  const hasSkills = skills.length > 0;

  const handleSkillSelect = (name: string) => {
    setSelectedSkills((prev) => (prev.includes(name) ? prev.filter((skill) => skill !== name) : [...prev, name]));
  };

  const handleDeleteSelected = async () => {
    if (!selectedSkills.length || !userId) return;

    if (userId) {
      await deleteSkill({
        variables: {
          skill: {
            userId,
            name: selectedSkills,
          },
        },
      });
    }

    setRemoveMode(false);
    setSelectedSkills([]);
  };

  const handleCloseDialogs = useCallback(() => {
    setOpenAdd(false);
    setEditingSkill(null);
    refetch();
  }, [refetch]);

  const handleCancel = useCallback(() => {
    setRemoveMode(false);
    setSelectedSkills([]);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      {/* === main === */}
      {!hasSkills ? (
        <Box textAlign="center">
          {isOwner ? (
            <AddButton handleClick={() => setOpenAdd(true)} />
          ) : (
            <Typography color="text.secondary">{t('skills.noSkills')}</Typography>
          )}
        </Box>
      ) : (
        <SkillsList
          categories={categories}
          skills={skills}
          isOwner={isOwner}
          onEdit={(skill) => setEditingSkill(skill)}
          selectedSkills={selectedSkills}
          onSelectSkill={removeMode ? handleSkillSelect : undefined}
        />
      )}

      {/* === actions === */}
      {isOwner && hasSkills && (
        <SkillsActions
          removeMode={removeMode}
          selectedSkills={selectedSkills}
          deleteLoading={deleteLoading}
          onAdd={() => setOpenAdd(true)}
          onDeleteMode={() => setRemoveMode(true)}
          onCancel={handleCancel}
          onDelete={handleDeleteSelected}
        />
      )}

      {/* === dialogs === */}
      {openAdd && isOwner && <AddSkillDialog open={openAdd} user={user as Profile} onClose={handleCloseDialogs} />}

      {editingSkill && user && (
        <UpdateSkillDialog
          open={!!editingSkill}
          user={user as Profile}
          skillName={editingSkill.name}
          categoryId={editingSkill.categoryId || ''}
          mastery={editingSkill.mastery}
          onClose={handleCloseDialogs}
        />
      )}
    </Container>
  );
};
