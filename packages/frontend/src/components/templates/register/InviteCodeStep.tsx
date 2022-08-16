import { Button, TextField, Typography, styled } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

type InviteCodeStepProps = RegisterStepProps;

const InviteCodeStep = (props: InviteCodeStepProps) => {
  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button className="rounded-lg" color="primary" fullWidth>
            次へ
          </Button>
        </Link>
      }
    >
      <Typography className="select-none" variant="h3">
        招待コード
      </Typography>
      <Typography variant="subtitle2">お持ちの方のみ(任意)</Typography>
      <InviteCodeInput placeholder="招待コード" />
      <Typography variant="subtitle2">
        ※LINEのクーポンコードの入力は、こちらの画面では対応しておりません。登録完了後、マイページの設定画面をご覧ください。
      </Typography>
    </PreviousLayout>
  );
};

const InviteCodeInput = styled(TextField)`
  width: 100%;
  height: 64px;

  & > div {
    height: 100%;
  }

  & > div > input {
    height: 100%;
    padding-right: 0;
    padding-left: 0;
    font-size: 1.3rem;
  }

  & > div > input::placeholder {
    color: #2c3038;
    font-size: 1.3rem;
  }
`;

export default InviteCodeStep;
