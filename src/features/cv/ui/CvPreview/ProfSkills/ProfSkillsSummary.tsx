import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { SkillMastery } from 'cv-graphql';

import { categoryCell, head, lastCell, skillsCell, table } from './ProfSkillsSummary.styles';

type SkillsCategoryProps = {
  categories: { id: string; name: string }[];
  skills: SkillMastery[];
};

export const ProfSkillsSummary = ({ categories, skills }: SkillsCategoryProps) => {
  const { t } = useTranslation();

  if (!skills.length) {
    return null;
  }

  const grouped = categories
    .map((category) => {
      const mappingSkills = skills
        .filter((skill) => skill.categoryId === category.id)
        .map((skill) => ({
          id: skill.categoryId,
          name: skill.name,
          experience: '—',
          lastUsed: '—',
        }));

      return {
        category: category.name,
        skills: mappingSkills,
      };
    })
    .filter((group) => group.skills.length > 0);

  return (
    <TableContainer>
      <Table sx={table}>
        <TableHead sx={head}>
          <TableRow>
            <TableCell align="left" width={'30%'}>
              {t('cvs.preview.skills.skills')}
            </TableCell>

            <TableCell align="left" width={'50%'}></TableCell>

            <TableCell align="center" width={'10%'}>
              {t('cvs.preview.skills.exp')}
            </TableCell>

            <TableCell align="center" width={'10%'}>
              {t('cvs.preview.skills.last')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {grouped.map((group) => (
            <TableRow key={group.category}>
              <TableCell sx={categoryCell}>{group.category}</TableCell>

              <TableCell sx={skillsCell}>
                {group.skills.map((skill) => (
                  <Typography key={skill.id} variant="body2" sx={{ mb: 0.5 }}>
                    {skill.name}
                  </Typography>
                ))}
              </TableCell>

              <TableCell sx={lastCell}>
                {group.skills.map((skill) => (
                  <Typography key={skill.id} variant="body2" sx={{ mb: 0.5 }}>
                    {skill.experience}
                  </Typography>
                ))}
              </TableCell>

              <TableCell sx={lastCell}>
                {group.skills.map((skill) => (
                  <Typography key={skill.id} variant="body2" sx={{ mb: 0.5 }}>
                    {skill.lastUsed}
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
