import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsApple, BsFacebook, BsLine } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { HiXCircle } from 'react-icons/hi';
import { z } from 'zod';
import PreviousLayout from '@organisms/PreviousLayout';
import { useAuth } from '@hooks/auth';
import { apiClient } from '@utils/api';
import { saveCookie } from '@utils/cookie';

const Login = () => {
  const router = useRouter();
  const { mutate } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email('正しいメールアドレスを入力してください'),
        password: z
          .string()
          .regex(/^[\u0020-\u007e]+$/, 'パスワードは半角英数字で入力してください'),
      })
    ),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <>
      <Head>
        <title>ログインページ - タップル</title>
      </Head>
      <PreviousLayout
        align="center"
        link={{
          href: '/register',
          text: '新規登録',
        }}
      >
        <Typography className="select-none" variant="h3">
          ログイン
        </Typography>
        <form
          className="flex w-full flex-col gap-6"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(async values => {
            setLoading(true);
            const res = await apiClient.auth
              .login({
                email: values.email,
                password: values.password,
              })
              .catch((e: AxiosError) => {
                if (e.response?.status === 401) setError(true);
                else throw e;
              });

            if (res) {
              const { access_token: accessToken, refresh_token: refreshToken } = res.data;

              accessToken && saveCookie('access_token', accessToken);
              refreshToken && saveCookie('refresh_token', refreshToken);

              await router.push('/');
              await mutate();
            }

            setLoading(false);
          })}
        >
          <div className="flex flex-col gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  placeholder="メールアドレスまたはID"
                  InputProps={{
                    endAdornment: (
                      <HiXCircle
                        color="#a2a7b4"
                        size={24}
                        className="mr-2 cursor-pointer"
                        onClick={() => resetField('email')}
                      />
                    ),
                  }}
                  error={Boolean(fieldState.error?.message)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="パスワード"
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
                  fullWidth
                  error={Boolean(fieldState.error?.message)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>
          {isError && (
            <Typography align="right" variant="subtitle2" color="#EA6770">
              ユーザー名またはパスワードが間違っています
            </Typography>
          )}
          <Button color="primary" disabled={!isValid || isLoading} type="submit" fullWidth>
            ログイン
          </Button>
          <div>
            <Divider>または</Divider>
          </div>
          <div className="flex flex-col gap-3">
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
            <Button startIcon={<FcGoogle />} color="secondary">
              Googleで続ける
            </Button>
            <Button
              startIcon={<BsFacebook />}
              sx={{
                backgroundColor: '#1a77f2',
                ':hover': {
                  backgroundColor: '#3184f3',
                },
              }}
            >
              Facebookで続ける
            </Button>
            <Button
              startIcon={<BsApple />}
              sx={{
                backgroundColor: 'black',
                ':hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              Appleで続ける
            </Button>
          </div>
        </form>
        <div className="flex w-72 flex-row justify-between">
          <Typography className="cursor-pointer select-none" variant="subtitle2" color="#888fa1">
            パスワードの再設定
          </Typography>
          <Typography className="cursor-pointer select-none" variant="subtitle2" color="#888fa1">
            ログインできない方
          </Typography>
        </div>
      </PreviousLayout>
    </>
  );
};

export default Login;
