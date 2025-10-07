import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthFormData } from '@features/auth/lib/validationSchema';
import { ROUTES } from '@shared/consts/routes';

import { useSignup } from '../api';
import { authSuccess } from '../lib/authState';
import { AuthForm } from './AuthForm';

export const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signupMutation] = useSignup();

  const handleSignup = async (data: AuthFormData) => {
    const { data: result } = await signupMutation({
      variables: { auth: data },
    });

    if (result?.signup) {
      authSuccess(
        {
          accessToken: result.signup.access_token,
          refreshToken: result.signup.refresh_token,
        },
        result.signup.user,
      );
      navigate(ROUTES.USERS, { replace: true });
    }
  };

  return (
    <AuthForm
      title="auth.signup.title"
      subtitle="auth.signup.subtitle"
      submitLabel="auth.signup.button"
      loadingLabel="auth.signup.loading"
      onSubmit={handleSignup}
      footer={
        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          sx={{ py: 1.5, fontSize: '14px', fontWeight: 500, color: 'text.secondary' }}
        >
          {t('auth.haveAccount')}
        </Button>
      }
    />
  );
};
