import axios from 'axios';
import { NextPageContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { apiClient } from '@utils/api';
import { saveCookie } from '@utils/cookie';
import { HocHandler } from '@utils/hoc';

export const withAuth: HocHandler = (next?) => async (context: NextPageContext) => {
  const { access_token: accessToken, refresh_token: refreshToken } = parseCookies(context);

  const redirectToGetStarted = {
    redirect: {
      destination: '/get_started',
      permanent: false,
    },
  };

  if (!accessToken || !refreshToken) return redirectToGetStarted;

  context.res?.setHeader(
    'Cache-Control',
    'public, s-maxage=300,max-age=180, stale-while-revalidate=180'
  );

  try {
    const user = (await apiClient.users.me(`Bearer ${accessToken}`)).data;

    return next
      ? next(context, user)
      : {
          props: {
            user,
          },
        };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const { data } = await apiClient.auth.refreshToken({ refresh_token: refreshToken });

        saveCookie('access_token', data.access_token);
        data.refresh_token && saveCookie('refresh_token', data.refresh_token);

        const user = (await apiClient.users.me(`Bearer ${data.access_token}`)).data;

        return next
          ? next(context, user)
          : {
              props: {
                user,
              },
            };
      } catch (e) {
        destroyCookie(context, 'access_token');
        destroyCookie(context, 'refresh_token');
        return redirectToGetStarted;
      }
    }

    return redirectToGetStarted;
  }
};
