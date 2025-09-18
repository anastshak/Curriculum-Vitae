import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthFormData } from '@features/auth/lib/validationSchema';
import { ROUTES } from '@shared/consts/routes';

import { useLogin } from '../api/login';
import { useAuth } from '../model/useAuth';
import { AuthForm } from './AuthForm';

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginQuery] = useLogin();

  const handleLogin = async (data: AuthFormData) => {
    const { data: result } = await loginQuery({
      variables: { auth: data },
    });

    if (result?.login) {
      login({
        accessToken: result.login.access_token,
        refreshToken: result.login.refresh_token,
      });
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Hello again! Log in to continue"
      submitLabel="Log in"
      loadingLabel="Wait"
      onSubmit={handleLogin}
      footer={
        <Button
          // onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
          sx={{ py: 1.5, fontSize: '14px', fontWeight: 500, color: 'text.secondary' }}
        >
          {t('Forgot password')}
        </Button>
      }
    />
  );
};
