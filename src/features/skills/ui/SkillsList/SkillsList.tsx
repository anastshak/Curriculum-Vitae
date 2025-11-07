import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { SkillItem } from '../SkillItem';
import { grid, title } from './SkillsList.styles';
import { SkillsListProps } from './SkillsList.types';

export const SkillsList = React.memo(
  ({
    categories,
    skills,
    isOwner = false,
    isRemoveMode = false,
    onEdit,
    selectedSkills = [],
    onSelectSkill,
  }: SkillsListProps) => {
    return (
      <Stack spacing={3}>
        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.categoryId === category.id);
          if (categorySkills.length === 0) return null;

          return (
            <Box key={category.id}>
              <Typography variant="subtitle1" sx={title}>
                {category.name}
              </Typography>

              <Box sx={grid}>
                {categorySkills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    name={skill.name}
                    mastery={skill.mastery}
                    isOwner={isOwner}
                    isRemoveMode={isRemoveMode}
                    onEdit={() => onEdit?.(skill)}
                    selected={selectedSkills.includes(skill.name)}
                    onSelect={() => onSelectSkill?.(skill.name)}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Stack>
    );
  },
);
