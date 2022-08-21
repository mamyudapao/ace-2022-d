import { Inject, forwardRef } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '@auth/auth.service';
import { TalkService } from '@talk/talk.service';
import { User } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://front.d.ace2208.net'],
    credentials: true,
  },
})
export class TalkGateway {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => TalkService))
    private readonly talkService: TalkService
  ) {}

  async handleConnection(socket: Socket) {
    const jwtToken = socket.handshake.auth['access_token'] as string;

    if (!jwtToken) {
      socket.disconnect(true);
      return;
    }

    let user: User | null;

    try {
      user = await this.authService.getUserFromToken(jwtToken);
    } catch (e) {
      socket.disconnect(true);
      return;
    }

    if (!user) {
      socket.disconnect(true);
      return;
    }

    const talks = await this.talkService.getTalks();
    const joinedTalks = talks.filter(talk => talk.users.some(member => member.id === user?.id));

    joinedTalks.forEach(talk => void socket.join(talk.id));
  }
}
