import { Typography } from '@mui/material';

interface SkillCellProps {
  skills: {
    id: string | undefined | null;
    name: string;
    experience: string;
    lastUsed: string;
  }[];
  field: 'name' | 'experience' | 'lastUsed';
}

export const SkillCell = ({ skills, field }: SkillCellProps) => {
  return (
    <>
      {skills.map((skill, index) => (
        <Typography key={skill.id || index} variant="body2" sx={{ mb: 0.5 }}>
          {skill[field]}
        </Typography>
      ))}
    </>
  );
};
