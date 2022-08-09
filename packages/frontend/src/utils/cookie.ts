import { NextPageContext } from 'next';
import { setCookie } from 'nookies';

export const saveCookie = (name: string, value: string, context?: NextPageContext) => {
  setCookie(context, name, value, {
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
    sameSite: 'strict',
  });
};
