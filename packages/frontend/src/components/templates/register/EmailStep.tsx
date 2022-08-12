import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface EmailStepProps extends RegisterStepProps {
  setEmail: (email: string) => void;
}

const EmailStep = (props: EmailStepProps) => {
  const {
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email('メールアドレスを入力してください'),
      })
    ),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const email = useWatch({
    control,
    name: 'email',
  });

  useEffect(() => {
    if (isValid) props.setEmail(email);
  }, [isValid, email, props]);

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
        メールアドレス
      </Typography>
      <Typography variant="subtitle2">メールアドレスはあとから変更できます。</Typography>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <EmailInput
            fullWidth
            placeholder="入力してください"
            error={Boolean(fieldState.error?.message)}
            helperText={fieldState.error?.message}
            {...field}
          />
        )}
      />
    </PreviousLayout>
  );
};

const EmailInput = styled(TextField)`
  height: 88px;

  & > div {
    height: 64px;
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

export default EmailStep;
