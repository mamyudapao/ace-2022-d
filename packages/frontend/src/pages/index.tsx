import { withAuth } from '@hoc/withAuth';

const Index = () => {
  return null;
};

export const getServerSideProps = withAuth(() => {
  return {
    redirect: {
      destination: '/messages',
      permanent: false,
    },
  };
});

export default Index;
