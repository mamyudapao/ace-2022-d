import styled from '@emotion/styled';
import { InputBase, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { TbCamera } from 'react-icons/tb';

const MessageRoom = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden p-4">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center py-2">
          <FiArrowLeft className="mr-3 cursor-pointer" size={32} onClick={router.back} />
          <Image className="rounded-full" src="/avatar.jpg" width={32} height={32} alt="" />
          <Typography className="ml-2 text-lg" variant="h6">
            なつき
          </Typography>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          <Message content="こんにちは！" isSelf={true} />
          <Message
            content="じゃあ、デートの日は12月の27日で決定ですね！楽しみです！"
            isSelf={false}
          />
          <Message content="楽しみですねー！どのあたりで飲みますか？" isSelf={true} />
          <Message content="予定入れておきます！" isSelf={true} />
          <Message content="新宿あたりどうでしょう、渋谷でもOKです！" isSelf={false} />
          <Message content="何時にしましょう？" isSelf={false} />
          <Message
            content="こことか超いいと思うんだけど興味ありません？https://tabelog.com/tokyo/A1318/A131805/13132982/"
            isSelf={true}
          />
          <Message content="とてもいいと思います！" isSelf={false} />
        </div>
      </div>
      <div className="flex flex-none items-center gap-4">
        <TbCamera size={24} color="#A1A6B5" />
        <InputBase
          placeholder="メッセージを入力"
          className="flex-1"
          sx={{
            background: 'rgba(48, 61, 80, 0.05)',
            border: '1px solid rgba(48, 61, 80, 0.05);',
            borderRadius: 18,
            paddingLeft: '14px',
          }}
        />
      </div>
    </div>
  );
};

interface MessageProps {
  content: string;
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
          src="/avatar.jpg"
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
      )}
      <MessageContent>{props.content}</MessageContent>
      <Typography className="self-end" variant="subtitle2" fontSize="10px">
        21:03
      </Typography>
    </MessageLine>
  );
};

export default MessageRoom;
