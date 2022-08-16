import FooterLayout from '@organisms/FooterLayout';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';

const Mypage = () => {
  return (
    <FooterLayout>
      <h1>Mypage</h1>
    </FooterLayout>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Mypage;
