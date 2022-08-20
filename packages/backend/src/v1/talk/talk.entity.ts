import { UserResponse } from '@user/user.entity';

export class TalksResponse {
  id!: string;
  users!: UserResponse[];
  latest_message!: MessageResponse | null;
  unread_message_count!: number;
}

export class TalkResponse {
  id!: string;
  users!: UserResponse[];
  messages!: MessageResponse[];
}

export class PostMessageRequest {
  content!: string;
}

export class MessageResponse {
  id!: string;
  talk_id!: string;
  author_id!: string;
  content!: string | null;
  created_at!: Date;
}
