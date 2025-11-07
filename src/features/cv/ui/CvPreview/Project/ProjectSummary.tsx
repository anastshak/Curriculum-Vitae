import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Cv, CvProject } from 'cv-graphql';

import { main, responWrapper, title, wrapper } from './ProjectSummary.styles';

type ProjectProps = {
  cv: Cv;
  project: CvProject;
};

export const ProjectSummary = ({ cv, project }: ProjectProps) => {
  const { t } = useTranslation();
  const { name, description, roles, responsibilities, start_date, end_date, environment } = project;

  return (
    <Box sx={wrapper}>
      <Box sx={{ paddingRight: 3 }}>
        <Typography sx={title}>{name}</Typography>
        <Typography>{description}</Typography>
      </Box>

      <Box sx={main}>
        <Typography sx={title}>{t('cvs.preview.project.roles')}</Typography>
        <Typography>{roles.join(', ') || cv.user?.position_name}</Typography>

        <Typography sx={title}>{t('cvs.preview.project.period')}</Typography>
        <Typography>
          {start_date} – {end_date ? end_date : t('cvs.preview.project.now')}
        </Typography>

        <Typography sx={title}>{t('cvs.preview.project.responsibilities')}</Typography>
        <Box sx={responWrapper}>
          {responsibilities.map((responsibility, index) => (
            <li key={responsibility}>
              <Typography>{responsibility.replace(/\.$/, '')}</Typography>
              {index === responsibilities.length - 1 ? '.' : ';'}
            </li>
          ))}
        </Box>

        <Typography sx={title}>{t('cvs.preview.project.environment')}</Typography>
        <Typography>{environment.join(', ')}.</Typography>
      </Box>
    </Box>
  );
};
