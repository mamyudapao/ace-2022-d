import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface NicknameStepProps extends RegisterStepProps {
  setNickname: (nickname: string) => void;
}

const NicknameStep = (props: NicknameStepProps) => {
  const {
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        nickname: z
          .string()
          .min(1, 'ニックネームを入力してください')
          .max(8, 'ニックネームは8文字以下で入力してください'),
      })
    ),
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  const nickname = useWatch({
    control,
    name: 'nickname',
  });

  useEffect(() => {
    if (isValid) props.setNickname(nickname);
  }, [isValid, nickname, props]);

  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button className="rounded-lg" color="primary" disabled={!isValid} fullWidth>
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
      <div className="flex w-full flex-col gap-2">
        <Controller
          name="nickname"
          control={control}
          render={({ field, fieldState }) => (
            <NicknameInput
              fullWidth
              placeholder="入力してください"
              error={Boolean(fieldState.error?.message)}
              {...field}
            />
          )}
        />
        <Typography align="right" variant="subtitle2">
          {nickname.length}/8
        </Typography>
      </div>
    </PreviousLayout>
  );
};

const NicknameInput = styled(TextField)`
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

export default NicknameStep;
