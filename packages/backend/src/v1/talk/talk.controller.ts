import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@auth/auth.decorator';
import {
  MessageResponse,
  PostMessageRequest,
  TalkResponse,
  TalksResponse,
} from '@talk/talk.entity';
import { TalkService } from '@talk/talk.service';
import { Profile, Talk, User } from '@prisma/client';

@Controller({
  path: '/talks',
  version: '1',
})
@ApiTags('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @UseAuth()
  @Get('/')
  async getTalks(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } }
  ): Promise<TalksResponse[]> {
    const talks = await this.talkService.getTalks();

    return talks
      .filter(talk => talk.users.some(user => user.id === request.user.id))
      .map(talk => {
        const latestMessage = talk.messages[0];

        return {
          id: talk.id,
          users: talk.users.map(user => ({
            id: user.id,
            email: null,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            prefecture: user.prefecture,
            profile: user.profile,
            created_at: user.created_at,
            updated_at: user.updated_at,
          })),
          latest_message: latestMessage
            ? {
                id: latestMessage.id,
                talk_id: latestMessage.talk_id,
                author_id: latestMessage.author_id,
                content: latestMessage.content,
                created_at: latestMessage.created_at,
              }
            : null,
          unread_message_count:
            talk.unread_messages.find(u => u.user_id === request.user.id)?.count ?? 0,
        };
      });
  }

  @UseAuth()
  @Get('/:id')
  async getTalk(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } },
    @Param('id') id: string
  ): Promise<TalkResponse> {
    const talk = await this.talkService.getTalkById(id);

    if (!talk) {
      throw new NotFoundException('Talk not found');
    }

    if (!talk.users.some(u => u.id === request.user.id)) {
      throw new NotFoundException('Talk not found');
    }

    return {
      id: talk.id,
      users: talk.users.map(user => ({
        id: user.id,
        email: null,
        nickname: user.nickname,
        gender: user.gender,
        birthday: user.birthday,
        prefecture: user.prefecture,
        profile: user.profile,
        created_at: user.created_at,
        updated_at: user.updated_at,
      })),
      messages: talk.messages.map(message => ({
        id: message.id,
        talk_id: message.talk_id,
        author_id: message.author_id,
        content: message.content,
        created_at: message.created_at,
      })),
    };
  }

  @UseAuth()
  @Post('/:id/messages')
  async postMessage(
    @Req() request: { user: User & { profile: Profile | null; talks: Talk[] | null } },
    @Param('id') id: string,
    @Body() postMessageRequest: PostMessageRequest
  ): Promise<MessageResponse> {
    const result = await this.talkService.postMessage(
      id,
      request.user.id,
      postMessageRequest.content
    );
    return {
      id: result.id,
      talk_id: result.talk_id,
      author_id: result.author_id,
      content: result.content,
      created_at: result.created_at,
    };
  }
}
