import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

type PasswordStepProps = RegisterStepProps;

const PasswordStep = (props: PasswordStepProps) => {
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
        パスワード
      </Typography>
      <Typography variant="subtitle2">半角英数字6文字以上で入力してください。</Typography>
    </PreviousLayout>
  );
};

export default PasswordStep;
