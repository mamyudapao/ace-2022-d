import { Injectable } from '@nestjs/common';
import { MessageResponse } from '@talk/talk.entity';
import { TalkGateway } from '@talk/talk.gateway';
import { Message, Profile, Talk, UnreadMessage, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class TalkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly talkGateway: TalkGateway
  ) {}

  async getTalks(): Promise<
    (Talk & {
      users: (User & { profile: Profile | null })[];
      messages: Message[];
      unread_messages: UnreadMessage[];
    })[]
  > {
    return this.prismaService.talk.findMany({
      include: {
        users: {
          include: {
            profile: true,
          },
        },
        messages: {
          orderBy: {
            created_at: 'desc',
          },
          take: 1,
        },
        unread_messages: true,
      },
    });
  }

  async getTalkById(id: string): Promise<
    | (Talk & {
        users: (User & { profile: Profile | null })[];
        messages: Message[];
        unread_messages: UnreadMessage[];
      })
    | null
  > {
    return this.prismaService.talk.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            profile: true,
          },
        },
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
        unread_messages: true,
      },
    });
  }

  async postMessage(talkId: string, authorId: string, content: string): Promise<Message> {
    const result = await this.prismaService.message.create({
      data: {
        talk_id: talkId,
        author_id: authorId,
        content: content,
      },
    });
    this.talkGateway.server.to(talkId).emit('message_create', {
      id: result.id,
      talk_id: result.talk_id,
      author_id: result.author_id,
      content: result.content,
      created_at: result.created_at,
    } as MessageResponse);
    return result;
  }

  async getUnreadMessageCount(talkId: string, userId: string): Promise<number> {
    const unreadMessage = await this.prismaService.unreadMessage.findUnique({
      where: {
        user_id_talk_id: {
          talk_id: talkId,
          user_id: userId,
        },
      },
      include: {
        message: true,
      },
    });

    if (!unreadMessage) return 0;

    return await this.prismaService.message.count({
      where: {
        created_at: {
          lt: unreadMessage.message.created_at,
        },
      },
    });
  }

  async markAsRead(talkId: string, userId: string): Promise<void> {
    const latestMessage = await this.prismaService.message.findFirst({
      where: {
        talk_id: talkId,
        author_id: userId,
      },
      orderBy: {
        created_at: 'asc',
      },
      take: 1,
    });

    if (!latestMessage) return;

    await this.prismaService.unreadMessage.upsert({
      where: {
        user_id_talk_id: {
          talk_id: talkId,
          user_id: userId,
        },
      },
      create: {
        talk_id: talkId,
        user_id: userId,
        message_id: latestMessage.id,
      },
      update: {
        message_id: latestMessage.id,
      },
    });
  }
}
