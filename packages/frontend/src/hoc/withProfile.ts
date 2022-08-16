import { NextPageContext } from 'next';
import { HocHandler } from '@utils/hoc';
import { UserResponse } from '@api/model';

export const withProfile: HocHandler =
  (next?) => async (context: NextPageContext, user: UserResponse) => {
    if (!user.profile) {
      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        },
      };
    }

    return next
      ? next(context, user)
      : {
          props: {
            user,
          },
        };
  };
