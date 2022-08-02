import { Fetcher, KeyedMutator, SWRHook } from 'swr';

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

export function useHandledSWR<Data, Key>(
  hook: SWRHook,
  key: Key,
  fetcher: Fetcher<Data, Key>
): SWRResponseType<Data> {
  const { data, isValidating, error, mutate } = hook(key, fetcher) as {
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
