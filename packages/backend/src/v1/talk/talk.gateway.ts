import { Inject, forwardRef } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '@auth/auth.service';
import { TalkService } from '@talk/talk.service';

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
      throw new WsException('Unauthorized');
    }

    const user = await this.authService.getUserFromToken(jwtToken);

    if (!user) {
      throw new WsException('Unauthorized');
    }

    const talks = await this.talkService.getTalks();
    const joinedTalks = talks.filter(talk => talk.users.some(member => member.id === user.id));

    joinedTalks.forEach(talk => void socket.join(talk.id));
  }
}
