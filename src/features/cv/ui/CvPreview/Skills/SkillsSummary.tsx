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
    .map((category) => {
      const mappingSkills = skills
        .filter((skill) => skill.categoryId === category.id)
        .map((skill) => ({
          id: `${skill.name}:${category.id}`,
          label: skill.name,
        }));

      return { category: category.name, mappingSkills };
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
