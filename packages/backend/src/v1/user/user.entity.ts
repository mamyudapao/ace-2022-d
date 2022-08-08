import { Gender, Prefecture } from '@entity/user.entity';

export class UserResponse {
  id!: string;
  email!: string;
  nickname!: string;
  gender!: Gender;
  birthday!: string;
  prefecture!: Prefecture;
}
