import { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AvatarStep from '@templates/profile/AvatarStep';
import BasicProfileStep from '@templates/profile/BasicProfileStep';
import DatePlanStep from '@templates/profile/DatePlanStep';
import HobbyGenreStep from '@templates/profile/HobbyGenreStep';
import HobbyStep from '@templates/profile/HobbyStep';
import { useAuth } from '@hooks/auth';
import {
  useDatePlanCategories,
  useDatePlans,
  useHobbies,
  useHobbyCategories,
} from '@hooks/constant';
import { withAuth } from '@hoc/withAuth';
import { apiClient, handleAuth } from '@utils/api';
import {
  UpdateUserRequestEducationEnum,
  UpdateUserRequestHolidayEnum,
  UpdateUserRequestIncomeEnum,
  UpdateUserRequestMarryIntentionEnum,
  UpdateUserRequestWeightEnum,
  UserResponse,
} from '@api/model';

export interface ProfileStepProps {
  nextStepHref: string;
}

const Profile = (props: { step: string }) => {
  const router = useRouter();

  const { mutate } = useAuth();

  const { data: datePlans } = useDatePlans();
  const { data: datePlanCategories } = useDatePlanCategories();

  const { data: hobbies } = useHobbies();
  const { data: hobbyCategories } = useHobbyCategories();

  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<UpdateUserRequestWeightEnum>();
  const [holiday, setHoliday] = useState<UpdateUserRequestHolidayEnum>();
  const [income, setIncome] = useState<UpdateUserRequestIncomeEnum>();
  const [marryIntention, setMarryIntention] = useState<UpdateUserRequestMarryIntentionEnum>();
  const [education, setEducation] = useState<UpdateUserRequestEducationEnum>();
  const [selectedDatePlans, setSelectedDatePlans] = useState<string[]>();
  const [selectedHobbyCategories, setSelectedHobbyCategories] = useState<string[]>();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>();
  const [avatar, setAvatar] = useState<string>();

  const submit = useCallback(async () => {
    const res = await handleAuth(apiClient.users.updateMe, {
      height,
      weight,
      holiday,
      income,
      marry_intention: marryIntention,
      education,
      date_plans: selectedDatePlans,
      hobbies: selectedHobbies,
      avatar,
    });
    await mutate(res);
  }, [
    avatar,
    education,
    height,
    holiday,
    income,
    marryIntention,
    mutate,
    selectedDatePlans,
    selectedHobbies,
    weight,
  ]);

  const stepPage = useMemo(() => {
    switch (props.step) {
      case '1':
        return (
          <BasicProfileStep
            nextStepHref="/profile?step=2"
            setHeight={setHeight}
            setWeight={setWeight}
            setHoliday={setHoliday}
            setIncome={setIncome}
            setMarryIntention={setMarryIntention}
            setEducation={setEducation}
          />
        );
      case '2':
        return (
          <DatePlanStep
            nextStepHref="/profile?step=3"
            datePlans={datePlans}
            datePlanCategories={datePlanCategories}
            setDatePlan={setSelectedDatePlans}
          />
        );
      case '3':
        return (
          <HobbyGenreStep
            nextStepHref="/profile?step=4"
            hobbyCategories={hobbyCategories}
            setHobbyCategories={setSelectedHobbyCategories}
          />
        );
      case '4':
        return (
          <HobbyStep
            nextStepHref="/profile?step=5"
            hobbies={hobbies}
            hobbyCategories={hobbyCategories}
            selectedHobbyCategories={selectedHobbyCategories}
            setHobbies={setSelectedHobbies}
          />
        );
      case '5':
        return <AvatarStep nextStepHref="/home" setAvatar={setAvatar} handleSubmit={submit} />;
      default:
        return null;
    }
  }, [
    datePlanCategories,
    datePlans,
    hobbies,
    hobbyCategories,
    props.step,
    selectedHobbyCategories,
    submit,
  ]);

  useEffect(() => {
    if (stepPage === null && router.isReady) void router.push('/404');
  }, [router, stepPage]);

  return (
    <>
      <Head>
        <title>プロフィール - タップル</title>
      </Head>
      {stepPage}
    </>
  );
};

export const getServerSideProps = withAuth((ctx: NextPageContext, user: UserResponse) => {
  if (user.profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { step } = ctx.query;

  if (!step) {
    return {
      redirect: {
        destination: '/profile?step=1',
        permanent: false,
      },
    };
  }

  return {
    props: {
      step,
    },
  };
});

export default Profile;
