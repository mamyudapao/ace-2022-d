/* eslint-disable */
import { DrawerSelector, SelectOptions } from '../components/molucules/DrawerSelector';
import { FullScreenDialog } from '../components/molucules/FullScreenDialog';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight, MdVerifiedUser } from 'react-icons/md';
import FooterLayout from '@organisms/FooterLayout';
import { useAuth } from '@hooks/useAuth';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';
import { apiClient, handleAuth } from '@utils/api';
import { getAge } from '@utils/getAge';
import {
  educationList,
  incomeList,
  marryIntentionList,
  prefectureList,
  weightList,
} from '@utils/localize';
import { UpdateUserRequest } from '@api/model';

const dataObj: SelectOptions = {
  prefectures: Object.entries(prefectureList),
  bloods: ['A', 'B', 'AB', 'O'],
  height: Array.from({ length: 50 }, (_, i) => i + 150),
  weight: Object.entries(weightList),
  education: Object.entries(educationList),
  marryIntention: Object.entries(marryIntentionList),
  income: Object.entries(incomeList),
};
type EditableField =
  | 'prefecture'
  | 'work_prefecture'
  | 'born_prefecture'
  | 'blood_type'
  | 'height'
  | 'weight'
  | 'education'
  | 'marry_intention'
  | 'income'
  | 'description';

const Mypage = () => {
  const { data, mutate } = useAuth();
  const [openTarget, setOpenTarget] = useState<EditableField | null>(null);
  const [prefecture, setPrefecture] = useState<string | null>(null);
  const [workPrefecture, setWorkPrefecture] = useState<string | null>(null);
  const [borPrefecture, setBornPrefecture] = useState<string | null>(null);
  const [blood, setBlood] = useState<string | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [marryIntention, setMarryIntention] = useState<string | null>(null);
  const [income, setIncome] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      setOpenTarget(null);
    }
  }, [open]);

  if (!data || !data.profile) {
    return null;
  }

  const handleSubmit = async (
    key: keyof UpdateUserRequest,
    value: string | number | null
  ): Promise<void> => {
    const newData: UpdateUserRequest = {
      prefecture: data.prefecture,
      avatar: data.profile?.avatar,
      holiday: data.profile?.holiday,
      work_prefecture: data.profile?.work_prefecture,
      born_prefecture: data.profile?.born_prefecture,
      blood_type: data.profile?.blood_type,
      height: data.profile?.height,
      weight: data.profile?.weight,
      education: data.profile?.education,
      marry_intention: data.profile?.marry_intention,
      income: data.profile?.income,
      description: data.profile?.description,
    };
    // eslint-disable-next-line security/detect-object-injection
    // @ts-expect-error
    newData[key] = value;
    const res = await handleAuth(apiClient.users.updateMe, newData);
    await mutate(res, { revalidate: false });
  };
  const jp = {
    prefecture: prefectureList,
    weight: weightList,
    education: educationList,
    marryIntention: marryIntentionList,
    income: incomeList,
  };

  const FormSwitcher = (target: EditableField) => {
    switch (target) {
      case 'prefecture':
        return (
          <DrawerSelector
            data={dataObj.prefectures}
            currentDataValue={data.prefecture}
            formValue={prefecture}
            setFormValue={setPrefecture}
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'work_prefecture':
        return (
          <DrawerSelector
            open={open}
            data={dataObj.prefectures}
            currentDataValue={data.profile?.work_prefecture}
            formValue={workPrefecture}
            setFormValue={setWorkPrefecture}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'born_prefecture':
        return (
          <DrawerSelector
            data={dataObj.prefectures}
            currentDataValue={data.profile?.born_prefecture}
            formValue={borPrefecture}
            setFormValue={setBornPrefecture}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={'born_prefecture'}
          />
        );
      case 'blood_type':
        return (
          <DrawerSelector
            data={dataObj.bloods}
            currentDataValue={data.profile?.blood_type}
            formValue={blood}
            setFormValue={setBlood}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'height':
        return (
          <DrawerSelector
            data={dataObj.height}
            currentDataValue={data.profile?.height}
            formValue={height}
            setFormValue={setHeight}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'weight':
        return (
          <DrawerSelector
            data={dataObj.weight}
            currentDataValue={data.profile?.weight}
            formValue={weight}
            setFormValue={setWeight}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'education':
        return (
          <DrawerSelector
            data={dataObj.education}
            currentDataValue={data.profile?.education}
            formValue={education}
            setFormValue={setEducation}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'marry_intention':
        return (
          <DrawerSelector
            data={dataObj.marryIntention}
            currentDataValue={data.profile?.marry_intention}
            formValue={marryIntention}
            setFormValue={setMarryIntention}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'income':
        return (
          <DrawerSelector
            data={dataObj.income}
            currentDataValue={data.profile?.income}
            formValue={income}
            setFormValue={setIncome}
            setOpen={setOpen}
            open={open}
            handleSubmit={handleSubmit}
            submitKey={target}
          />
        );
      case 'description':
        return (
          <FullScreenDialog
            currentDataValue={data.profile?.description}
            formValue={description}
            setValue={setDescription}
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FooterLayout>
      {openTarget && FormSwitcher(openTarget)}
      <div className="flex flex-none flex-col">
        <div className="mt-3 flex items-center justify-between px-4">
          <AiOutlineSetting size={35} />
          <h3>マイページ</h3>
          <IoMdNotificationsOutline size={35} />
        </div>
      </div>
      <div className="overflow-y-auto">
        <div className="relative mx-auto mt-10 h-52 w-52 overflow-hidden rounded-full bg-black">
          <Image src="/avatar.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className="mt-4 flex items-center justify-evenly px-20">
          <h3>{data.nickname}</h3>
          <p>
            {jp.prefecture[data.prefecture]}・{getAge(data.birthday)}歳
          </p>
          <MdVerifiedUser color="#4C97F3" />
        </div>
        <div className="mt-4 h-6 bg-gray-100" />
        <div className="relative mt-3 justify-between px-4">
          <div>
            <h3>自己紹介</h3>
            <p className="mt-4 w-80">{data.profile.description}</p>
          </div>
          <div className="absolute right-2 bottom-4">
            <IconButton
              onClick={() => {
                setOpen(true);
                setOpenTarget('description');
              }}
            >
              <MdOutlineKeyboardArrowRight className="absolute mt-4" />
            </IconButton>
          </div>
        </div>
        <div className="pr-4s mt-3  pl-4">
          <h3>プロフィール</h3>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>年齢</p>
            <div>
              <div className="flex items-center pr-2">
                <p>{getAge(data.birthday)}歳</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>住居地</p>
            <div>
              <div className="flex items-center">
                <p>{jp.prefecture[data.prefecture]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('prefecture');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>勤務地</p>
            <div>
              <div className="flex items-center">
                <p>{jp.prefecture[data.profile.work_prefecture!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('work_prefecture');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>出身地</p>
            <div>
              <div className="flex items-center">
                <p>{jp.prefecture[data.profile.born_prefecture!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('born_prefecture');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>血液型</p>
            <div>
              <div className="flex items-center">
                <p>{data.profile.blood_type}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('blood_type');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>身長</p>
            <div>
              <div className="flex items-center">
                <p>{data.profile.height + 'cm'}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('height');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>体型</p>
            <div>
              <div className="flex items-center">
                <p>{jp.weight[data.profile.weight!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('weight');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>学歴</p>
            <div>
              <div className="flex items-center">
                <p>{jp.education[data.profile.education!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('education');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>年収</p>
            <div>
              <div className="flex items-center">
                <p>{jp.income[data.profile.income!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('income');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #EBECEF' }}
          >
            <p>結婚に対する意志</p>
            <div>
              <div className="flex items-center">
                <p>{jp.marryIntention[data.profile.marry_intention!]}</p>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpenTarget('marry_intention');
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FooterLayout>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Mypage;
