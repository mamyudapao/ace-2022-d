import { AxiosResponse } from 'axios';
import { Fetcher, KeyedMutator, SWRConfiguration } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { ApiResponse, AuthParameters, handleAuth } from '@utils/api';

type SWRResponseType<Data> =
  | {
      data: undefined;
      state: 'loading';
      mutate: KeyedMutator<Data>;
    }
  | {
      data: undefined;
      state: 'error';
      mutate: KeyedMutator<Data>;
    }
  | {
      data: Data;
      state: 'success';
      mutate: KeyedMutator<Data>;
    };

export function useSWRFormatted<Data, Key>(
  key: Key,
  fetcher: Fetcher<Data, Key> | null,
  config?: SWRConfiguration
): SWRResponseType<Data> {
  const { data, isValidating, error, mutate } = useSWRImmutable(key, fetcher, config) as {
    data: Data | undefined;
    isValidating: boolean;
    error: Error | undefined;
    mutate: KeyedMutator<Data>;
  };

  if (error) {
    return {
      data: undefined,
      state: 'error',
      mutate,
    };
  }

  if (isValidating || !data) {
    return {
      data: undefined,
      state: 'loading',
      mutate,
    };
  }

  return {
    data: data,
    state: 'success',
    mutate,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiHandled = <F extends (...args: any) => Promise<AxiosResponse>>(
  fn: F | null,
  ...parameters: AuthParameters<F>
): SWRResponseType<ApiResponse<ReturnType<F>>> =>
  useSWRFormatted(
    fn ? [fn.name, ...parameters] : null,
    fn ? () => handleAuth(fn, ...parameters) : null
  );
