import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

type BirthdayStepProps = RegisterStepProps;

const BirthdayStep = (props: BirthdayStepProps) => {
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
        生年月日
      </Typography>
      <Typography variant="subtitle2">
        登録後は変更できません。誤って登録されますとやりとりなどができなくなる場合があります。
      </Typography>
    </PreviousLayout>
  );
};

export default BirthdayStep;
