import { AxiosError, AxiosResponse } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';
import { saveCookie } from '@utils/cookie';
import { AuthApi, UsersApi, UsersApiInterface } from '@api/api';
import { Configuration } from '@api/configuration';

const configuration = new Configuration({
  basePath: process.env['NEXT_PUBLIC_API_ENDPOINT'],
  baseOptions: {
    withCredentials: true,
    timeout: 30000,
  },
});

export const apiClient = {
  auth: new AuthApi(configuration),
  users: new UsersApi(configuration) as UsersApiInterface,
};

export type AuthParameters<F> = F extends (
  authorization: string,
  ...args: infer R
) => Promise<AxiosResponse>
  ? R
  : never;

export type ApiResponse<F> = F extends Promise<AxiosResponse<infer R>> ? R : never;

async function refresh(refreshToken: string) {
  const {
    data: { access_token: refreshedAccessToken, refresh_token: refreshedRefreshToken },
  } = await apiClient.auth
    .refreshToken({
      refresh_token: refreshToken,
    })
    .catch((e: AxiosError) => {
      destroyCookie(null, 'access_token');
      destroyCookie(null, 'refresh_token');
      throw e;
    });

  saveCookie('access_token', refreshedAccessToken);
  refreshedRefreshToken && saveCookie('refresh_token', refreshedRefreshToken);

  return refreshedRefreshToken;
}

export function handleToken<T extends Promise<AxiosResponse>>(
  call: (token: string) => T
): Promise<ApiResponse<T>> {
  const { access_token: accessToken, refresh_token: refreshToken } = parseCookies();

  if (!accessToken || !refreshToken) throw Error('No access token or refresh token was found.');

  return call(accessToken)
    .catch(async (e: AxiosError) => {
      if (e.response?.status === 401) {
        return call(await refresh(refreshToken));
      }

      throw e;
    })
    .then(res => res.data as T) as Promise<ApiResponse<T>>;
}

export function handleAuth<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (authorization: string, ...args: any) => Promise<AxiosResponse>
>(fn: F, ...parameters: AuthParameters<F>): Promise<ApiResponse<ReturnType<F>>> {
  return handleToken((token: string) =>
    fn.call(configuration, `Bearer ${token}`, ...parameters)
  ) as Promise<ApiResponse<ReturnType<F>>>;
}
