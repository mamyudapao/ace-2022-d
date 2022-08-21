import styled from '@emotion/styled';
import { InputBase, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { TbCamera } from 'react-icons/tb';
import UserDetailModal from '@organisms/UserDetailModal';
import { useAuth } from '@hooks/useAuth';
import { useSocket } from '@hooks/useSocket';
import { useTalk } from '@hooks/useTalk';
import { apiClient, handleToken } from '@utils/api';
import { TalkResponse, UserResponse } from '@api/model';

const MessageRoom = () => {
  useSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const talkId = router.query['id']?.toString() ?? '';

  const { data: user } = useAuth();
  const { data: talk, state, markAsRead } = useTalk(talkId);

  const getPairUser: (talk: TalkResponse | undefined) => UserResponse | null = useCallback(
    (talk: TalkResponse | undefined) => talk?.users.find(u => u.id !== user?.id) ?? null,
    [user?.id]
  );

  useEffect(() => {
    if (state === 'success') {
      markAsRead().catch(console.error);
    }
  }, [state, markAsRead, talk?.messages]);

  if (state === 'error') {
    void router.push('/404');
    return null;
  }

  //TODO: プロフィール画像リストの取得
  //TODO: 年齢計算、県名変換
  return (
    <>
      <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden py-4">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center px-4 pt-2 pb-3">
            <FiArrowLeft
              className="mr-3 cursor-pointer"
              size={32}
              onClick={!isModalOpen ? router.back : () => setIsModalOpen(false)}
            />
            <div className="flex items-center" onClick={() => setIsModalOpen(true)}>
              {talk && (
                <Image
                  className="rounded-full"
                  src={getPairUser(talk)?.profile?.avatar ?? ''}
                  width={32}
                  height={32}
                  alt=""
                />
              )}
              <Typography className="ml-2 text-lg" variant="h6">
                {getPairUser(talk)?.nickname}
              </Typography>
            </div>
          </div>
          {!isModalOpen ? (
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4">
              {talk?.messages.map(message => (
                <Message
                  key={message.id}
                  content={message.content ?? ''}
                  time={new Date(message.created_at)}
                  isSelf={message.author_id === user?.id}
                  avatar={getPairUser(talk)?.profile?.avatar ?? ''}
                />
              ))}
            </div>
          ) : (
            <UserDetailModal
              nickname={getPairUser(talk)?.nickname ?? ''}
              avatar={getPairUser(talk)?.profile?.avatar ?? ''}
              age={0}
              prefecture={getPairUser(talk)?.prefecture ?? ''}
              hobbies={getPairUser(talk)?.profile?.hobbies ?? []}
              imageList={[getPairUser(talk)?.profile?.avatar ?? '']}
            />
          )}
        </div>
        <div className="flex flex-none items-center gap-4 px-4">
          <TbCamera size={24} color="#A1A6B5" />
          <MessageInput talkId={talkId} />
        </div>
      </div>
    </>
  );
};

interface MessageInputProps {
  talkId: string;
}

const MessageInput = (props: MessageInputProps) => {
  const [message, setMessage] = useState<string>('');

  return (
    <InputBase
      placeholder="メッセージを入力"
      className="flex-1"
      sx={{
        background: 'rgba(48, 61, 80, 0.05)',
        border: '1px solid rgba(48, 61, 80, 0.05);',
        borderRadius: 18,
        paddingLeft: '14px',
      }}
      value={message}
      onChange={e => setMessage(e.currentTarget.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
          return;
        }

        handleToken(token =>
          apiClient.talks.postMessage(props.talkId, `Bearer ${token}`, {
            content: e.currentTarget.value,
          })
        ).catch(console.error);

        setMessage('');
      }}
    />
  );
};

interface MessageProps {
  content: string;
  avatar: string;
  time: Date;
  isSelf: boolean;
}

const Message = (props: MessageProps) => {
  const MessageLine = styled.div`
    display: flex;
    flex-direction: ${props.isSelf ? 'row-reverse' : 'row'};
    align-self: ${props.isSelf ? 'flex-end' : 'flex-start'};
    gap: 8px;
  `;

  const MessageContent = styled.div`
    display: flex;
    max-width: 234px;
    align-items: center;
    padding: 8px 8px 8px 12px;
    background-color: ${props.isSelf ? '#FC5C6C' : 'rgba(20, 35, 70, 0.06)'};
    border-radius: 20px;
    color: ${props.isSelf ? '#fff' : '#142346'};
    font-size: 16px;
    line-height: 24px;
    word-break: break-all;
  `;

  return (
    <MessageLine>
      {!props.isSelf && (
        <Image
          className="rounded-full"
          src={props.avatar}
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
      )}
      <MessageContent>{props.content}</MessageContent>
      <Typography className="self-end" variant="subtitle2" fontSize="10px">
        {props.time.getHours().toString().padStart(2, '0')}:
        {props.time.getMinutes().toString().padStart(2, '0')}
      </Typography>
    </MessageLine>
  );
};

export default MessageRoom;
