import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BirthdayStep from '@templates/register/BirthdayStep';
import EmailStep from '@templates/register/EmailStep';
import FirstStep from '@templates/register/FirstStep';
import GenderStep from '@templates/register/GenderStep';
import InviteCodeStep from '@templates/register/InviteCodeStep';
import LastStep from '@templates/register/LastStep';
import NicknameStep from '@templates/register/NicknameStep';
import PasswordStep from '@templates/register/PasswordStep';
import PrefectureStep from '@templates/register/PrefectureStep';
import { useAuth } from '@hooks/useAuth';
import { apiClient } from '@utils/api';
import { saveCookie } from '@utils/cookie';
import { RegisterRequestGenderEnum, RegisterRequestPrefectureEnum } from '@api/model';

export interface RegisterStepProps {
  nextStepHref: string;
}

const Register = (props: { step: string }) => {
  const router = useRouter();
  const { mutate } = useAuth();

  const [gender, setGender] = useState<RegisterRequestGenderEnum>();
  const [birthday, setBirthday] = useState<string>();
  const [prefecture, setPrefecture] = useState<RegisterRequestPrefectureEnum>();
  const [nickname, setNickname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleRegister = useCallback(async () => {
    if (!gender || !birthday || !prefecture || !nickname || !email || !password) return;

    const res = await apiClient.auth.register({
      gender,
      prefecture,
      birthday,
      nickname,
      email,
      password,
    });

    const { access_token: accessToken, refresh_token: refreshToken } = res.data;

    accessToken && saveCookie('access_token', accessToken);
    refreshToken && saveCookie('refresh_token', refreshToken);

    await mutate();
  }, [birthday, email, gender, mutate, nickname, password, prefecture]);

  const stepPage = useMemo(() => {
    switch (props.step) {
      case '1':
        return <FirstStep nextStepHref="/register?step=2" />;
      case '2':
        return <GenderStep nextStepHref="/register?step=3" setGender={setGender} />;
      case '3':
        return <BirthdayStep nextStepHref="/register?step=4" setBirthday={setBirthday} />;
      case '4':
        return <PrefectureStep nextStepHref="/register?step=5" setPrefecture={setPrefecture} />;
      case '5':
        return <NicknameStep nextStepHref="/register?step=6" setNickname={setNickname} />;
      case '6':
        return <EmailStep nextStepHref="/register?step=7" setEmail={setEmail} />;
      case '7':
        return <PasswordStep nextStepHref="/register?step=8" setPassword={setPassword} />;
      case '8':
        return <InviteCodeStep nextStepHref="/register?step=9" />;
      case '9':
        return <LastStep nextStepHref="/profile" handleRegister={handleRegister} />;
      default:
        return null;
    }
  }, [handleRegister, props.step]);

  useEffect(() => {
    if (stepPage === null && router.isReady) void router.push('/404');
  }, [router, stepPage]);

  return (
    <>
      <Head>
        <title>??????????????? - ????????????</title>
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
