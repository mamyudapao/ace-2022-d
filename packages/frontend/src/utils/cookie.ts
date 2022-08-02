import { NextPageContext } from 'next';
import { setCookie } from 'nookies';

export const saveCookie = (
  name: string,
  value: string,
  isSession?: boolean,
  context?: NextPageContext
) => {
  setCookie(context, name, value, {
    path: '/',
    maxAge: isSession ? undefined : 30 * 24 * 60 * 60,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};
