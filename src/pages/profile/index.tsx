import { useParams } from 'react-router-dom';

import { Layout } from '@widgets/layout';

const ProfilePage = () => {
  const { userId } = useParams();
  const greeting = `Hello, dear user ${userId}`;
  return (
    <Layout>
      <h1>{greeting}</h1>
    </Layout>
  );
};

export default ProfilePage;
