import FooterLayout from '@organisms/FooterLayout';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';

const Discover = () => {
  return (
    <FooterLayout>
      <h1>Discover</h1>
    </FooterLayout>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Discover;
