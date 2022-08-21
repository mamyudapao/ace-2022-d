import { useTalks } from '@hooks/useTalks';
import { apiClient, handleToken } from '@utils/api';
import { useSWRFormatted } from '@utils/swr';

export const useTalk = (talkId: string) => {
  const { mutate } = useTalks();
  const swr = useSWRFormatted(talkId ? ['/talks', talkId] : null, () =>
    handleToken(token => apiClient.talks.getTalk(talkId, `Bearer ${token}`))
  );

  return {
    ...swr,
    markAsRead: async () => {
      await handleToken(token => apiClient.talks.markAsRead(talkId, `Bearer ${token}`));
      await mutate(
        prev =>
          prev?.map(talk => (talk.id === talkId ? { ...talk, unread_message_count: 0 } : talk)),
        {
          revalidate: false,
        }
      );
    },
  };
};
