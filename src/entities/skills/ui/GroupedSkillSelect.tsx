import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListSubheader, MenuItem } from '@mui/material';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { useSkillCategories, useSkills } from '../api';
import { GroupedSkillSelectProps } from '../model/types';

export const GroupedSkillSelect = ({ user, value, onChange, loading }: GroupedSkillSelectProps) => {
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
      .map((category) => {
        const mappingSkills = skills
          .filter((skill) => skill.category?.id === category.id && !userSkillNames.has(skill.name))
          .map((skill) => ({
            id: `${skill.name}:${category.id}`,
            label: skill.name,
          }));

        return { category: category.name, mappingSkills };
      })
      .filter((group) => group.mappingSkills.length > 0);

    return grouped;
  }, [skillsData, categoriesData, userSkillNames]);

  return (
    <BaseSelect
      label={t('formFields.skill')}
      value={value}
      onChange={onChange}
      loading={loading || isLoading}
      isOwner
      options={[]}
      size={600}
    >
      {groupedOptions.map((group) => [
        <ListSubheader key={group.category}>{group.category}</ListSubheader>,
        group.mappingSkills.map((skill) => (
          <MenuItem key={skill.id} value={skill.id}>
            {skill.label}
          </MenuItem>
        )),
      ])}
    </BaseSelect>
  );
};
