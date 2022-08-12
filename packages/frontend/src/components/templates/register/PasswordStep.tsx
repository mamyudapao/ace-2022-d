import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, TextFieldProps, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface PasswordStepProps extends RegisterStepProps {
  setPassword: (password: string) => void;
}

const PasswordStep = (props: PasswordStepProps) => {
  const {
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(
      z
        .object({
          password: z
            .string()
            .min(6, 'パスワードは半角英数6文字以上で入力してください')
            .max(1024, 'パスワードは半角英数1024文字以下で入力してください')
            .regex(/^[\u0020-\u007e]+$/, '不正な文字が含まれています'),
          passwordConfirm: z.string(),
        })
        .refine(data => data.password === data.passwordConfirm, {
          message: '入力内容が一致していません',
          path: ['passwordConfirm'],
        })
    ),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const password = useWatch({
    control,
    name: 'password',
  });

  useEffect(() => {
    if (isValid) props.setPassword(password);
  }, [isValid, password, props]);

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
        パスワード
      </Typography>
      <Typography variant="subtitle2">半角英数字6文字以上で入力してください。</Typography>
      <form className="flex flex-col gap-3">
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              fullWidth
              placeholder="パスワードの入力"
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              fullWidth
              placeholder="パスワードの確認入力"
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </form>
    </PreviousLayout>
  );
};

const StyledInput = styled(TextField)`
  height: 88px;

  & > div {
    height: 64%;
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

const PasswordInput = forwardRef<HTMLInputElement, TextFieldProps>((props: TextFieldProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledInput
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: showPassword ? (
          <AiFillEyeInvisible
            color="#a2a7b4"
            size={24}
            className="mr-2 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <AiFillEye
            color="#a2a7b4"
            size={24}
            className="mr-2 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        ),
      }}
      ref={ref}
      {...props}
    />
  );
});
export default PasswordStep;
