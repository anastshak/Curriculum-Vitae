import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SkillMastery } from 'cv-graphql';

import { categoryCell, head, lastCell, skillsCell, table } from './ProfSkillsSummary.styles';
import { SkillCell } from './SkillCell';

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
                <SkillCell skills={group.skills} field="name" />
              </TableCell>

              <TableCell sx={lastCell}>
                <SkillCell skills={group.skills} field="experience" />
              </TableCell>

              <TableCell sx={lastCell}>
                <SkillCell skills={group.skills} field="lastUsed" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
