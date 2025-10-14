import { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { CvProject } from 'cv-graphql';

import downloadPdf from '@features/cv/lib/downloadPdf';
import prepareHtml from '@features/cv/lib/prepareHtml';
import { useSkillCategories } from '@features/skills/api';
import { Loader } from '@shared/ui/Loader';

import { useCv, useExportPdf } from '../../api';
import { ProfSkillsSummary } from './ProfSkills/ProfSkillsSummary';
import { ProjectSummary } from './Project/ProjectSummary';
import { SkillsSummary } from './Skills/SkillsSummary';
import { head, main, noPrint, PageBreak, summary, title, wrapper } from './CvPreview.styles';

export const CVPreview = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { cvId } = useParams<{ cvId: string }>();

  const { data, loading: cvLoading } = useCv(cvId);
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();
  const [exportPdf, { loading: exportLoading }] = useExportPdf();

  const loading = cvLoading || categoriesLoading;
  const cvData = data?.cv;
  const categories = categoriesData?.skillCategories || [];

  if (loading) return <Loader />;
  if (!cvData) return <Typography>No CV found</Typography>;

  const handleExport = async () => {
    if (!pdfRef.current) {
      return;
    }

    const html = prepareHtml(pdfRef.current);

    try {
      const { data } = await exportPdf({
        variables: {
          pdf: {
            html,
            margin: {
              top: '20mm',
              bottom: '20mm',
              left: '15mm',
              right: '15mm',
            },
          },
        },
      });
      if (data?.exportPdf) {
        downloadPdf(cvData.name, data.exportPdf);
      }
    } catch (error) {
      console.error('Export PDF error:', error);
    }
  };

  return (
    <Container ref={pdfRef} maxWidth="md" sx={wrapper}>
      {/* HEADER */}
      <Box sx={head}>
        <Box>
          <Typography variant="h4">{cvData.user?.profile.full_name || cvData.user?.email}</Typography>
          <Typography variant="subtitle1" textTransform="uppercase" color="text.secondary">
            {cvData.user?.position_name}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={handleExport}
          disabled={exportLoading}
          startIcon={exportLoading ? <CircularProgress size={16} /> : null}
          sx={noPrint}
        >
          {t('cvs.preview.button')}
        </Button>
      </Box>

      {/* SUMMARY */}
      <Box sx={summary}>
        {/* LEFT COLUMN */}
        <Box sx={{ paddingRight: 3 }}>
          <Typography sx={title}>{t('cvs.preview.education')}</Typography>
          <Typography variant="body2">{cvData.education || '—'}</Typography>

          <Typography sx={title}>{t('cvs.preview.lang')}</Typography>
          {cvData.languages.map(({ name, proficiency }) => (
            <Typography key={name}>
              {name} — {proficiency}
            </Typography>
          ))}

          {cvData.projects?.length !== 0 && (
            <>
              <Typography sx={title}>{t('cvs.preview.domains')}</Typography>
              {cvData.projects?.map((project: CvProject) => (
                <Typography key={project.domain}>{project.domain}</Typography>
              ))}
            </>
          )}
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={main}>
          <Typography sx={title}>{cvData.name}</Typography>

          <Typography>{cvData.description}</Typography>

          <SkillsSummary categories={categories} skills={cvData.skills} />
        </Box>
      </Box>

      <PageBreak />

      {/* PROJECTS */}
      {cvData.projects?.length !== 0 && (
        <>
          <Box sx={head}>
            <Typography variant="h4">{t('cvs.preview.projects')}</Typography>
          </Box>
          {cvData.projects?.map((project) => (
            <Fragment key={project.id}>
              <ProjectSummary cv={cvData} project={project} />
              <PageBreak />
            </Fragment>
          ))}
        </>
      )}

      {/* PROF SKILLS */}
      <Box sx={head}>
        <Typography variant="h4">{t('cvs.preview.skills.title')}</Typography>
      </Box>
      <ProfSkillsSummary categories={categories} skills={cvData.skills} />
    </Container>
  );
};
