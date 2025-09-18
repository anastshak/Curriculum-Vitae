import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthFormData } from '@features/auth/lib/validationSchema';
import { ROUTES } from '@shared/consts/routes';

import { useSignup } from '../api/signup';
import { useAuth } from '../model/useAuth';
import { AuthForm } from './AuthForm';

export const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [signupMutation] = useSignup();

  const handleSignup = async (data: AuthFormData) => {
    const { data: result } = await signupMutation({
      variables: { auth: data },
    });

    if (result?.signup) {
      login({
        accessToken: result.signup.access_token,
        refreshToken: result.signup.refresh_token,
      });
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  return (
    <AuthForm
      title="Register now"
      subtitle="Welcome! Sign up to continue."
      submitLabel="Create account"
      loadingLabel="Creating account"
      onSubmit={handleSignup}
      footer={
        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          sx={{ py: 1.5, fontSize: '14px', fontWeight: 500, color: 'text.secondary' }}
        >
          {t('I have an account')}
        </Button>
      }
    />
  );
};
