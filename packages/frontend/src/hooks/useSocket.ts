import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { mutate } from 'swr';
import { MessageResponse, TalkResponse, TalksResponse } from '@api/model';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(process.env['NEXT_PUBLIC_API_ENDPOINT'] ?? 'http://localhost:3001', {
      auth: callback => {
        const { access_token: accessToken } = parseCookies();
        callback({ access_token: accessToken });
      },
    });

    socket.on('connect_error', err => {
      if (err.message === 'invalid_credentials') {
        const { refresh_token: refreshToken } = parseCookies();

        if (refreshToken) {
          socket.connect();
        } else throw new Error('Failed to connect gateway');
      }
    });

    socket.on('message_create', async (msg: MessageResponse) => {
      await mutate(
        ['/talks', msg.talk_id],
        (prev: TalkResponse) => ({
          ...prev,
          messages: [...prev.messages, msg],
        }),
        {
          revalidate: false,
        }
      );

      await mutate(
        ['/talks'],
        (prev: TalksResponse[]) =>
          prev.map(talk =>
            talk.id === msg.talk_id
              ? {
                  ...talk,
                  latest_message: msg,
                }
              : talk
          ),
        {
          revalidate: false,
        }
      );
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};
