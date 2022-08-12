import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { BsLine } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

type FirstStepProps = RegisterStepProps;

const FirstStep = (props: FirstStepProps) => {
  return (
    <PreviousLayout
      align="center"
      link={{
        href: 'login',
        text: 'ログイン',
      }}
    >
      <Typography className="select-none" variant="h3">
        新規登録
      </Typography>
      <Image src="/sns.png" width={173} height={112} alt="" />
      <Typography variant="subtitle2">
        認証を行っても、SNSや外部に利用状況が公開されることはありません。
      </Typography>
      <div className="flex w-full flex-col gap-3">
        <Button
          startIcon={<BsLine />}
          sx={{
            backgroundColor: '#02b902',
            boxShadow: 'none',
            ':hover': {
              backgroundColor: '#0bd00b',
            },
          }}
        >
          LINEで続ける
        </Button>
        <Button color="secondary" fullWidth startIcon={<FcGoogle />}>
          Googleで続ける
        </Button>
      </div>
      <Link href={props.nextStepHref}>
        <Button className="mt-4" color="primary" fullWidth>
          いずれもお持ちでない方
        </Button>
      </Link>
      <div className="flex w-72 flex-row justify-around">
        <Link href="https://static.tapple.me/policy/terms.html">
          <Typography className="cursor-pointer select-none" variant="subtitle2" color="#888fa1">
            利用規約
          </Typography>
        </Link>
        <Link href="https://static.tapple.me/policy/privacy.html">
          <Typography className="cursor-pointer select-none" variant="subtitle2" color="#888fa1">
            プライバシーポリシー
          </Typography>
        </Link>
      </div>
    </PreviousLayout>
  );
};

export default FirstStep;
