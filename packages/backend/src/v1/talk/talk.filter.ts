import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { IncomingMessage } from 'http';

@Catch()
export class TalkFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    host.switchToWs().getClient<IncomingMessage>().socket.end();
  }
}
