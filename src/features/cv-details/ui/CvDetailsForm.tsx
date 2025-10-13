import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import { useCurrentUser } from '@features/auth';
import { MultiCvForm } from '@features/cv-crud';
import { Loader } from '@shared/ui/Loader';

import { useCv } from '../api';

export const CvDetailsForm = () => {
  const currentUser = useCurrentUser();
  const params = useParams<{ cvId?: string }>();

  const { data, loading } = useCv(params.cvId);

  const cvData = data?.cv;
  const isOwner = currentUser?.id === cvData?.user?.id;

  if (loading) return <Loader />;

  return (
    <Container maxWidth="md" sx={{ px: 3, py: 4 }}>
      <MultiCvForm editingCv={cvData} isOwner={isOwner} uiMode="inline" functionMode="edit" />
    </Container>
  );
};
