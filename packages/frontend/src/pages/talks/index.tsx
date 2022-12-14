import { Avatar, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import FooterLayout from '@organisms/FooterLayout';
import { useAuth } from '@hooks/useAuth';
import { useSocket } from '@hooks/useSocket';
import { useTalks } from '@hooks/useTalks';
import { withAuth } from '@hoc/withAuth';
import { withProfile } from '@hoc/withProfile';
import { TalksResponse, UserResponse } from '@api/model';

const Talks = () => {
  useSocket();

  const { data: user } = useAuth();
  const { data: talks } = useTalks();

  const sortedTalks = talks?.concat()?.sort((a, b) => {
    const aTime = new Date(a.latest_message?.created_at ?? '');
    const bTime = new Date(b.latest_message?.created_at ?? '');
    return bTime.getTime() - aTime.getTime();
  });

  const getPairUser: (talk: TalksResponse) => UserResponse | null = useCallback(
    (talk: TalksResponse) => talk.users.find(u => u.id !== user?.id) ?? null,
    [user?.id]
  );

  const getDifferenceText: (date: Date) => string = useCallback((date: Date) => {
    const diffRaw = new Date().getTime() - date.getTime();

    if (diffRaw < 60000) {
      return `たった今`;
    }

    if (diffRaw < 3600000) {
      return `${Math.round(diffRaw / 60000)}分前`;
    }

    if (diffRaw < 21600000) {
      return `${Math.round(diffRaw / 60000)}時間前`;
    }

    if (diffRaw < 86400000) {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2)}`;
    }

    if (diffRaw < 172800000) {
      return `昨日`;
    }

    if (diffRaw < 604800000) {
      return (
        ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][date.getDay()] ?? ''
      );
    }

    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2)}/${date
      .getDate()
      .toString()
      .padStart(2)}`;
  }, []);

  return (
    <>
      <Head>
        <title>タップル(tapple) - メッセージ</title>
      </Head>
      <FooterLayout>
        <div className="flex flex-none flex-col">
          <Typography className="my-4" variant="h6" align="center" color="black">
            やりとり
          </Typography>
          <Tabs variant="fullWidth" value={1} centered>
            <Tab label="マッチング" />
            <Tab label="メッセージ" />
          </Tabs>
        </div>
        <div className="flex flex-1 flex-col gap-6 divide-y overflow-y-auto p-4">
          {sortedTalks?.map(talk => (
            <MessageLine
              key={talk.id}
              id={talk.id}
              name={getPairUser(talk)?.nickname ?? ''}
              avatar={getPairUser(talk)?.profile?.avatar ?? ''}
              latestMessage={talk.latest_message?.content ?? ''}
              latestMessageDate={
                talk.latest_message
                  ? getDifferenceText(new Date(talk.latest_message.created_at))
                  : ''
              }
              unreadMessageCount={talk.unread_message_count}
            />
          ))}
        </div>
      </FooterLayout>
    </>
  );
};

interface MessageLineProps {
  id: string;
  name: string;
  avatar: string;
  latestMessage: string;
  latestMessageDate: string;
  unreadMessageCount: number;
}

const MessageLine = (props: MessageLineProps) => {
  return (
    <Link href={`/talks/${props.id}`}>
      <div className="flex cursor-pointer items-center gap-4">
        <Image className="rounded-full" src={props.avatar} width={56} height={56} alt="" />
        <div className="flex flex-1 overflow-x-hidden">
          <div className="flex flex-1 flex-col justify-between overflow-x-hidden">
            <Typography variant="h5" fontSize="18px" fontWeight={600}>
              {props.name}
            </Typography>
            <Typography
              variant="h6"
              fontSize="14px"
              fontWeight={props.unreadMessageCount ? 'bold' : 'normal'}
              noWrap
            >
              {props.latestMessage}
            </Typography>
          </div>
          <div className="flex flex-none flex-col items-end justify-between">
            <Typography variant="subtitle2" fontSize={12} color="#142346">
              {props.latestMessageDate}
            </Typography>
            {props.unreadMessageCount > 0 ? (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '15px',
                  lineHeight: '18px',
                }}
              >
                {props.unreadMessageCount}
              </Avatar>
            ) : (
              <BsCheckCircleFill color="#d0d3d9" size={16} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const getServerSideProps = withAuth(withProfile());

export default Talks;
