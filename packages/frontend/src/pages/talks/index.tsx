import { Avatar, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BsCheckCircleFill } from 'react-icons/bs';
import FooterLayout from '@organisms/FooterLayout';
import { withAuth } from '@hoc/withAuth';

const Messages = () => {
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
          <Tabs variant="fullWidth" value="message" centered>
            <Tab value="matching" label="マッチング" />
            <Tab value="message" label="メッセージ" />
          </Tabs>
        </div>
        <div className="flex flex-1 flex-col gap-6 divide-y overflow-y-auto p-4">
          <MessageLine
            name="bn004812"
            avatar="/avatar.jpg"
            latestMessage="ぜひ行きましょう！土曜日だったらおいしい"
            latestMessageDate="10分前"
            unreadMessageCount={3}
          />
          <MessageLine
            name="2n001418"
            avatar="/avatar.jpg"
            latestMessage="はじめまして。マッチありがとうございます"
            latestMessageDate="16:21"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n003140"
            avatar="/avatar.jpg"
            latestMessage="初めまして！よろしくお願いします。"
            latestMessageDate="木曜日"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="木曜日"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="木曜日"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="木曜日"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="木曜日"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="7/12"
            unreadMessageCount={0}
          />
          <MessageLine
            name="8n002414"
            avatar="/avatar.jpg"
            latestMessage="あいう"
            latestMessageDate="7/12"
            unreadMessageCount={0}
          />
        </div>
      </FooterLayout>
    </>
  );
};

interface MessageLineProps {
  name: string;
  avatar: string;
  latestMessage: string;
  latestMessageDate: string;
  unreadMessageCount: number;
}

const MessageLine = (props: MessageLineProps) => {
  return (
    <Link href="/talks/1">
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

export const getServerSideProps = withAuth();

export default Messages;
