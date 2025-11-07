import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListSubheader, MenuItem } from '@mui/material';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { useSkillCategories, useSkills } from '../api';
import { GroupedSkillSelectProps } from '../model/types';

export const GroupedSkillSelect = ({ user, value, onChange, loading, disabled }: GroupedSkillSelectProps) => {
  const { t } = useTranslation();

  const { data: skillsData, loading: skillsLoading } = useSkills();
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();

  const isLoading = loading || skillsLoading || categoriesLoading;

  const userSkillNames = useMemo(() => new Set(user?.skills.map((skill) => skill.name)), [user]);

  const groupedOptions = useMemo(() => {
    const skills = skillsData?.skills;
    const categories = categoriesData?.skillCategories;

    if (!skills || !categories) return [];

    const grouped = categories
      .map(({ id: categoryId, name: categoryName }) => {
        const mappingSkills = skills
          .filter(
            ({ name: skillName, category: skillCategory }) =>
              skillCategory?.id === categoryId && !userSkillNames.has(skillName),
          )
          .map(({ name: skillName }) => ({
            id: `${skillName}:${categoryId}`,
            label: skillName,
          }));

        return { category: categoryName, mappingSkills };
      })
      .filter((group) => group.mappingSkills.length > 0);

    return grouped;
  }, [skillsData, categoriesData, userSkillNames]);

  if (disabled && value) {
    return (
      <BaseSelect
        label={t('formFields.skill')}
        value={value}
        loading={isLoading}
        disabled
        options={[{ id: value, label: value.split(':')[0] }]}
        size={600}
      />
    );
  }

  return (
    <BaseSelect
      label={t('formFields.skill')}
      value={value}
      onChange={onChange}
      loading={isLoading}
      options={[]}
      size={600}
    >
      {groupedOptions.map((group) => [
        <ListSubheader key={group.category}>{group.category}</ListSubheader>,
        group.mappingSkills.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        )),
      ])}
    </BaseSelect>
  );
};
