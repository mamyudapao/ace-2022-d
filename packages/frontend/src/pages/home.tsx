import FooterLayout from '@organisms/FooterLayout';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';

const Home = () => {
  return (
    <FooterLayout>
      <h1>Home</h1>
    </FooterLayout>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Home;
