import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { SkillMastery } from 'cv-graphql';

type SkillsCategoryProps = {
  categories: { id: string; name: string }[];
  skills: SkillMastery[];
};

export const SkillsSummary = ({ categories, skills }: SkillsCategoryProps) => {
  const { t } = useTranslation();

  if (!skills.length) {
    return null;
  }

  const grouped = categories
    .map(({ id: categoryId, name: categoryName }) => {
      const mappingSkills = skills
        .filter(({ categoryId: skillCategoryId }) => skillCategoryId === categoryId)
        .map(({ name: skillName }) => ({
          id: `${skillName}:${categoryId}`,
          label: skillName,
        }));

      return { category: categoryName, mappingSkills };
    })
    .filter((group) => group.mappingSkills.length > 0);

  return (
    <>
      {grouped.map((group) => {
        return (
          <Box key={group.category}>
            <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>{t(group.category)}</Typography>
            <Typography>{group.mappingSkills.map((skill) => skill.label).join(', ')}.</Typography>
          </Box>
        );
      })}
    </>
  );
};
