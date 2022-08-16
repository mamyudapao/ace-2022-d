import FooterLayout from '@organisms/FooterLayout';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';

const Outing = () => {
  return (
    <FooterLayout>
      <h1>Outing</h1>
    </FooterLayout>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Outing;
