import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

type NicknameStepProps = RegisterStepProps;

const NicknameStep = (props: NicknameStepProps) => {
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
        ニックネーム
      </Typography>
      <Typography variant="subtitle2">
        8文字以内で入力してください。
        <br />
        ニックネームはあとから変更できます。
      </Typography>
    </PreviousLayout>
  );
};

export default NicknameStep;
