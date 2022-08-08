/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsResult, NextPageContext } from 'next';

type HocNextHandler = (
  context: NextPageContext,
  ...args: any
) =>
  | Promise<GetServerSidePropsResult<Record<string, any>>>
  | GetServerSidePropsResult<Record<string, any>>;

export type HocHandler = (next?: HocNextHandler, ...args: any) => HocNextHandler;
