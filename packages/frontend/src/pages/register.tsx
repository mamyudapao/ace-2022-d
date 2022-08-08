import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { useMemo } from 'react';
import BirthdayStep from '@templates/register/BirthdayStep';
import FirstStep from '@templates/register/FirstStep';
import GenderStep from '@templates/register/GenderStep';
import InviteCodeStep from '@templates/register/InviteCodeStep';
import LastStep from '@templates/register/LastStep';
import NicknameStep from '@templates/register/NicknameStep';
import PasswordStep from '@templates/register/PasswordStep';
import PrefectureStep from '@templates/register/PrefectureStep';

export interface RegisterStepProps {
  nextStepHref: string;
}

const Register = (props: { step: string }) => {
  const stepPage = useMemo(() => {
    switch (props.step) {
      case '1':
        return <FirstStep nextStepHref="/register?step=2" />;
      case '2':
        return <GenderStep nextStepHref="/register?step=3" />;
      case '3':
        return <BirthdayStep nextStepHref="/register?step=4" />;
      case '4':
        return <PrefectureStep nextStepHref="/register?step=5" />;
      case '5':
        return <NicknameStep nextStepHref="/register?step=6" />;
      case '6':
        return <PasswordStep nextStepHref="/register?step=7" />;
      case '7':
        return <InviteCodeStep nextStepHref="/register?step=8" />;
      case '8':
        return <LastStep nextStepHref="/" />;
      default:
        return null;
    }
  }, [props.step]);

  return (
    <>
      <Head>
        <title>登録ページ - タップル</title>
      </Head>
      {stepPage}
    </>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { step } = ctx.query;

  if (!step) {
    return {
      redirect: {
        destination: '/register?step=1',
        permanent: false,
      },
    };
  }

  return {
    props: {
      step,
    },
  };
};

export default Register;
