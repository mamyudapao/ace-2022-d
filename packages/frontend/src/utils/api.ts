import { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { Configuration } from '@api/configuration';

const configuration = new Configuration({
  basePath: process.env['NEXT_PUBLIC_API_ENDPOINT'],
});

export const apiClient = {};

type AuthParameters<F> = F extends (
  authorization: string,
  ...args: infer R
) => Promise<AxiosResponse>
  ? R
  : never;

type ApiResponse<F> = F extends Promise<AxiosResponse<infer R>> ? R : never;

export const handleToken = async <T extends Promise<AxiosResponse>>(
  call: (token: string) => T
): Promise<ApiResponse<T>> => {
  const request = async (accessToken: string) => {
    return (
      await call(accessToken).catch((e: AxiosError) => {
        throw e;
      })
    ).data as Promise<ApiResponse<T>>;
  };

  const { access_token: accessToken, refresh_token: refreshToken } = parseCookies();

  if (!accessToken || !refreshToken) throw Error('No access token or refresh token was found.');

  return request(accessToken);
};

export const handleAuth = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (authorization: string, ...args: any) => Promise<AxiosResponse>
>(
  fn: F,
  ...parameters: AuthParameters<F>
): Promise<ApiResponse<ReturnType<F>>> =>
  handleToken(async (token: string) =>
    fn.call(configuration, `Bearer ${token}`, ...parameters)
  ) as Promise<ApiResponse<ReturnType<F>>>;
