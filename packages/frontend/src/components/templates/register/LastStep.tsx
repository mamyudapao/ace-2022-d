import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

type LastStepProps = RegisterStepProps;

const LastStep = (props: LastStepProps) => {
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
        さあ、始めましょう！
      </Typography>
      <Typography variant="subtitle2">
        タップルは、好きなことから恋の相手を見つけることができるマッチングアプリです。
      </Typography>
    </PreviousLayout>
  );
};

export default LastStep;
