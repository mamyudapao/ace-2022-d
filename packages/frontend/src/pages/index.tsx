import { withAuth } from '@hoc/withAuth';

const Index = () => {
  return null;
};

export const getServerSideProps = withAuth(() => {
  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  };
});

export default Index;
