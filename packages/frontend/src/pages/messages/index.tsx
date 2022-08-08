import { withAuth } from '@hoc/withAuth';

const Messages = () => {
  return <h1>Messages</h1>;
};

export const getServerSideProps = withAuth();

export default Messages;
