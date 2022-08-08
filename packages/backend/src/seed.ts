import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Gender, Prefecture, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const users: Prisma.UserCreateInput[] = [
  {
    id: randomUUID(),
    email: 'user1@example.com',
    nickname: 'user1',
    password: hashSync('password', 10),
    refresh_token: 'refresh1',
    gender: Gender.MALE,
    prefecture: Prefecture.TOKYO,
    birthday: '2000-1-1',
  },
  {
    id: randomUUID(),
    email: 'user2@example.com',
    nickname: 'user2',
    password: hashSync('password', 10),
    refresh_token: 'refresh2',
    gender: Gender.FEMALE,
    prefecture: Prefecture.TOKYO,
    birthday: '2000-1-1',
  },
  {
    id: randomUUID(),
    email: 'user3@example.com',
    nickname: 'user3',
    password: hashSync('password', 10),
    refresh_token: 'refresh3',
    gender: Gender.MALE,
    prefecture: Prefecture.OSAKA,
    birthday: '2000-12-25',
  },
];

prisma
  .$transaction(async p => {
    for (const user of users) {
      await p.user.create({
        data: user,
      });
    }
  })
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
