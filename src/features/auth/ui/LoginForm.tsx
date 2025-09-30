import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthFormData } from '@features/auth/lib/validationSchema';
import { ROUTES } from '@shared/consts/routes';

import { useLogin } from '../api';
import { authSuccess } from '../lib/authState';
import { AuthForm } from './AuthForm';

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginQuery] = useLogin();

  const handleLogin = async (data: AuthFormData) => {
    const { data: result } = await loginQuery({
      variables: { auth: data },
    });

    if (result?.login) {
      authSuccess(
        {
          accessToken: result.login.access_token,
          refreshToken: result.login.refresh_token,
        },
        result.login.user,
      );
      navigate(ROUTES.USERS, { replace: true });
    }
  };

  return (
    <AuthForm
      title="auth.login.title"
      subtitle="auth.login.subtitle"
      submitLabel="auth.login.button"
      loadingLabel="buttonMessages.wait"
      onSubmit={handleLogin}
      footer={
        <Button
          onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
          sx={{ py: 1.5, fontSize: '14px', fontWeight: 500, color: 'text.secondary' }}
        >
          {t('auth.forgotPassword.title')}
        </Button>
      }
    />
  );
};
