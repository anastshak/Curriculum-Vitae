import { useParams } from 'react-router-dom';
import { Container, useTheme } from '@mui/material';

import { useCurrentUser } from '@features/auth';
import { MultiCvForm } from '@features/cv-crud';
import { Loader } from '@shared/ui/Loader';

import { useCv } from '../api';

export const CvDetailsForm = () => {
  const theme = useTheme();
  const currentUser = useCurrentUser();
  const params = useParams<{ cvId?: string }>();

  const { data, loading } = useCv(params.cvId);

  const cvData = data?.cv;
  const isOwner = currentUser?.id === cvData?.user?.id;

  if (loading) return <Loader />;

  return (
    <Container
      maxWidth="md"
      sx={{
        px: 3,
        py: 4,
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input': {
          WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
      }}
    >
      <MultiCvForm editingCv={cvData} isOwner={isOwner} uiMode="inline" functionMode="edit" />
    </Container>
  );
};
