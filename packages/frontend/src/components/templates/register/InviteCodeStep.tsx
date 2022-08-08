import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

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
    </PreviousLayout>
  );
};

export default InviteCodeStep;
