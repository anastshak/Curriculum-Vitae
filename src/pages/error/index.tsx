import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

const PageNotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          {t('errorPage.subtitle')}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('errorPage.title')}
        </Typography>

        <Button variant="contained" size="large" startIcon={<HomeIcon />} onClick={handleClick}>
          {t('errorPage.button')}
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
