import { RegisterStepProps } from '../../../pages/register';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import PreviousLayout from '@organisms/PreviousLayout';

type GenderStepProps = RegisterStepProps;

const GenderStep = (props: GenderStepProps) => {
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
        性別
      </Typography>
      <Typography variant="subtitle2">一度登録した性別は変更できません。</Typography>
    </PreviousLayout>
  );
};

export default GenderStep;
