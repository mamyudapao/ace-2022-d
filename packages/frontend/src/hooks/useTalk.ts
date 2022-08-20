import { apiClient, handleToken } from '@utils/api';
import { useSWRFormatted } from '@utils/swr';

export const useTalk = (talkId: string) =>
  useSWRFormatted(talkId ? ['/talks', talkId] : null, () =>
    handleToken(token => apiClient.talks.getTalk(talkId, `Bearer ${token}`))
  );
