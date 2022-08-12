import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface LastStepProps extends RegisterStepProps {
  handleRegister: () => Promise<void> | void;
}

const LastStep = (props: LastStepProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      await props.handleRegister();
    } finally {
      setLoading(false);
    }
    await router.push(props.nextStepHref);
  };

  return (
    <PreviousLayout
      footer={
        <Button
          className="rounded-lg"
          color="primary"
          disabled={isLoading}
          fullWidth
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={register}
        >
          登録する
        </Button>
      }
    >
      <div className="flex flex-1 flex-col gap-6">
        <Typography className="select-none" variant="h3">
          さあ、始めましょう！
        </Typography>
        <Typography variant="subtitle2">
          タップルは、好きなことから恋の相手を見つけることができるマッチングアプリです。
        </Typography>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <FaCheck size={24} />
            <Typography variant="h4">
              毎日
              <Typography
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
                component="span"
                variant="h4"
              >
                8,000人
              </Typography>
              が登録
              <Typography component="span" variant="subtitle2">
                ※1
              </Typography>
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <FaCheck size={24} />
            <Typography variant="h4">
              会員数
              <Typography
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
                component="span"
                variant="h4"
              >
                700万人
              </Typography>
              突破
              <Typography component="span" variant="subtitle2">
                ※2
              </Typography>
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <FaCheck size={24} />
            <Typography variant="h4">
              毎月
              <Typography
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
                component="span"
                variant="h4"
              >
                10,000人
              </Typography>
              に恋人が誕生
              <Typography component="span" variant="subtitle2">
                ※3
              </Typography>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography variant="caption" color="#888fa1">
            ※1 月間の登録会員数をその月の日数でわって算出(2021年6月時点)
          </Typography>
          <Typography variant="caption" color="#888fa1">
            ※2 退会者を除く累計登録会員社数(2021年7月時点)
          </Typography>
          <Typography variant="caption" color="#888fa1">
            ※3 アプリ内の大会アンケートで「タップルで恋人ができた」を選択した人数(2021年5月時点)
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Typography variant="subtitle2">
          <Link href="https://static.tapple.me/policy/terms.html">
            <Typography
              className="cursor-pointer"
              component="span"
              variant="subtitle2"
              color="#fc5c6c"
            >
              利用規約
            </Typography>
          </Link>
          及び
          <Link href="https://static.tapple.me/policy/privacy.html">
            <Typography
              className="cursor-pointer"
              component="span"
              variant="subtitle2"
              color="#fc5c6c"
            >
              コミュニティガイドライン
            </Typography>
          </Link>
          、
          <Link href="https://hasura.io/">
            <Typography
              className="cursor-pointer"
              component="span"
              variant="subtitle2"
              color="#fc5c6c"
            >
              プライバシーポリシー
            </Typography>
          </Link>
          への同意が必要となります。
        </Typography>
      </div>
    </PreviousLayout>
  );
};

export default LastStep;
