import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';

const Index = () => {
  return null;
};

export const getServerSideProps = withAuth(
  withProfile(() => {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  })
);

export default Index;
