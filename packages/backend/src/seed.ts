import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', e => {
  const params = e.params
    .slice(1)
    .slice(0, -1)
    .split(',')
    .map(p => p.trim());
  let count = 0;
  console.log(
    e.query.replaceAll(/\?/g, () => {
      count++;
      return params[count - 1]?.toString() ?? '?';
    })
  );
});

const datePlanGenres = [
  {
    genre: 'アート',
    plans: [
      'リノカット（Linocut）展を観に行きたい',
      'オリジナルミュージカル ガランドウの虹を観に行きたい',
      'スーパースター・ガラ2022を観に行きたい',
      'ミッツァロのカラスを観に行きたい',
      '白い恋人パークに行きたい',
    ],
  },
  {
    genre: '映画',
    plans: [
      '恋は光を観に行きたい',
      '薔薇のスタビスキー＜HDリマスター版＞を観に行きたい',
      'バッドマン 史上最低のスーパーヒーローを観に行きたい',
      '哭悲/THE SADNESSを観に行きたい',
      'MIRRORLIAR FILMS Season4 を観に 行きたい',
    ],
  },
  {
    genre: '演劇・舞台',
    plans: [
      'ミュージカルを観に行きたい',
      '伝統芸能を嗜みたい',
      '歌舞伎を観に行きたい',
      '演劇を観に行きたい',
      '伝統芸能を嗜みたい',
    ],
  },
  {
    genre: 'お酒',
    plans: [
      '「居酒屋 さざん日ノ出町駅前店」に行きたい',
      '「肉と海鮮グリルマーベリックス大 宮宮原ステラタウン店」 に行きたい',
      '「大衆ビストロ煮ジル 学芸大学」に 行きたい',
      '「宵ノねこ」に行きたい',
      '「サケマルシェどへ」に行きたい',
      '「酒ト肴さしすせそ お初天神店」に 行きたい',
    ],
  },
  {
    genre: 'お笑い',
    plans: [
      'ザ・ニュースペーパーを観に行きたい',
      '桂宮治を観に行きたい',
      '柳家さん喬独演会を観に行きたい',
      'よしもとお笑いライブ~初秋のナイト寄席 ~を観に行きたい',
      '春風亭一之輔独演会を観に行きたい',
    ],
  },
  {
    genre: '音楽',
    plans: [
      'BUCK-TICKを観に行きたい',
      'The Songbardsを観に行きたい',
      'GENERATIONS from EXILE TRIBE に行きたい',
      '夜の本気ダンスを観に行きたい',
      'sajiを観に行きたい',
      'Anne-Marie を観に行きたい',
    ],
  },
  {
    genre: 'カフェ',
    plans: [
      '「サンテール渋谷」 に行きたい',
      '「マダムアン」に行きたい',
      '「TORINGO」 に行きたい',
      '「雪ノ下京都本店」 に行きたい',
      '「Kaffi NORDUR」 に行きたい',
    ],
  },
  {
    genre: 'ゲーム',
    plans: [
      'ゲームセンターで遊びたい',
      '一緒に麻雀を打ちたい',
      '一緒にゲームで遊びたい',
      'オンラインでゲームしたい',
      'ボードゲームカフェで一緒に遊びたい',
    ],
  },
  {
    genre: '趣味',
    plans: [
      'イオンレイクタウンに行きたい',
      'あみプレミアム・アウトレットに行き たい',
      'アーバンドックららぽーと豊洲に行 きたい',
      'りんくうプレミアム・アウトレットに 行きたい',
      '三井アウトレットパークジャズドリ ーム長島に行きたい',
    ],
  },
  {
    genre: '食事',
    plans: [
      '「Global French Kitchen 雫」に行きたい',
      '「とりのほまれ」に行きたい',
      '「焼肉ここから 西船橋店」に行きたい',
      '「月島もんじゃわらしべ 参番街店」に行きたい',
      '「北斗七星」に行きたい',
      '「健康中華庵 青蓮 Luz 大森店」に行きたい',
    ],
  },
  {
    genre: 'スポーツ',
    plans: [
      'KNOCK OUTを観に行きたい',
      'スポーツバイクでサイクリング',
      '一緒にバスケ観戦に行きたい',
      '一緒にサッカー観戦に行きたい',
      ' 一緒にプロレスに行きたい',
    ],
  },
  {
    genre: '街歩き',
    plans: [
      '図書館デートで一緒に勉強',
      '熊本城に行きたい',
      '伏見稲荷大社に行きたい',
      '下鴨神社に行きたい',
      '出雲大社に行きたい',
      '犬と一緒にお散歩デート',
    ],
  },
  {
    genre: 'レジャー・スポット',
    plans: [
      '下関市立しものせき水族館「海響館」に行きたい',
      '国営武蔵丘陵森林公園に行きたい',
      'さがみ湖リゾートプレジャーフォレストに行きたい',
      'ナイトZOOに行きたい',
      '一緒に水族館に行きたい',
    ],
  },
].map(g => ({
  id: randomUUID(),
  ...g,
}));

const hobbyGenres = [
  {
    genre: '料理・グルメ',
    tags: [
      'プリン クリームソーダ',
      'ピザ',
      '焼肉',
      'オムライス',
      '和食',
      '料理好き',
      '焼き鳥',
      '激辛料理',
      'チーズ料理',
      '海鮮',
      'ホットケーキ',
      'カフェ巡り',
      'スイーツ好き',
      'アフタヌーンティー',
      'タイ料理',
      '韓国料理',
      'フルーツサンド',
      'パフェ',
      'カレー',
    ],
  },
  {
    genre: '音楽',
    tags: [
      'J-POP',
      '洋楽',
      '邦楽',
      'ロック',
      'ヒップホップ',
      'ラップ',
      'EDM',
      'ハウス',
      'テクノ',
      'トランス',
      'R&B',
      'ソウル',
      'ジャズ',
      'クラシック',
      'アニソン',
      'アニメソング',
      'アイドル',
      'K-POP',
      'J-ROCK',
      'J-PUNK',
      'J-POP好き',
      '洋楽好き',
      '邦楽好き',
      '音楽好き',
      '音楽鑑賞',
    ],
  },
  {
    genre: '旅行',
    tags: [
      '北海道',
      '別府温泉',
      'ビーチ',
      'タイ',
      '大阪',
      '韓国',
      '九州',
      '世界遺産',
      'グアム',
      '東京',
      '京都',
      'ヨーロッパ',
      '東北',
      '沖縄',
      '福岡',
      '旅行好き',
      '金沢',
      'アメリカ',
      '紅葉',
      '四国',
      'アジア',
    ],
  },
  {
    genre: '漫画・アニメ',
    tags: [
      'ONE-PIECE',
      '呪術廻戦',
      'HUNTER×HUNTER',
      '鬼滅の刃',
      'ジョジョの奇妙な冒険',
      'ドラゴンボール',
      'BLEACH',
      'NARUTO',
      '鬼滅の刃',
      '進撃の巨人',
      'ワンピース',
      'アニメ好き',
      '漫画好き',
      'アニメ観賞好き',
      '漫画観賞好き',
    ],
  },
  {
    genre: 'スポーツ',
    tags: [
      'テニス',
      'ゴルフ',
      'サッカー',
      'バスケットボール',
      '野球',
      'バレーボール',
      'ラグビー',
      'フットサル',
      'アメフト',
      'ボクシング',
      '格闘技',
      'スポーツ観戦好き',
    ],
  },
  {
    genre: '映画',
    tags: [
      '映画好き',
      '映画鑑賞好き',
      'アクション',
      'コメディ',
      'SF',
      'ホラー',
      'ミステリー',
      'ドラマ',
      'アニメ',
    ],
  },
  {
    genre: 'ゲーム',
    tags: [
      'FPS',
      'RPG',
      'アクション',
      'シミュレーション',
      'スポーツ',
      'レース',
      'パズル',
      'ゲーム好き',
    ],
  },
  {
    genre: 'レジャー・スポット',
    tags: [
      'ボーリング',
      'カラオケ',
      'ビリヤード',
      'ダーツ',
      'ボードゲーム',
      'カフェ巡り',
      '映画館',
      '美術館',
      '博物館',
      '科学館',
      '動物園',
      '水族館',
      '遊園地',
      'テーマパーク',
    ],
  },
  {
    genre: 'アウトドア',
    tags: [
      '鉄道旅行',
      '聖地巡礼',
      '温泉旅行',
      '登山',
      'キャンプ',
      'スキー',
      'スノーボード',
      'アウトドア',
      '釣り',
    ],
  },
].map(g => ({
  id: randomUUID(),
  ...g,
}));

prisma
  .$transaction(async client => {
    await client.datePlanCategory.createMany({
      data: datePlanGenres.map(g => ({
        id: g.id,
        name: g.genre,
      })),
    });

    await client.datePlan.createMany({
      data: datePlanGenres.flatMap(g =>
        g.plans.map(p => ({
          name: p,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          date_plan_categoryId: g.id,
          image: 'https://picsum.photos/300/200',
        }))
      ),
    });

    await client.hobbyCategory.createMany({
      data: hobbyGenres.map(g => ({
        id: g.id,
        name: g.genre,
      })),
    });

    await client.hobby.createMany({
      data: hobbyGenres.flatMap(g =>
        g.tags.map(h => ({
          name: h,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          hobby_categoryId: g.id,
        }))
      ),
    });

    const maleUserNum = 10;
    const femaleUserNum = 10;
    const maleUserIds = [];
    const femaleUserIds = [];

    for (let i = 0; i < maleUserNum; i++) {
      const maleUser = await client.user.create({
        data: {
          email: 'user' + i.toString() + '@example.com',
          nickname: 'ユーザー' + i.toString(),
          password: hashSync('password', 10),
          refresh_token: '',
          gender: 'MALE',
          birthday: '2000-01-01',
          prefecture: 'TOKYO',
          profile: {
            create: {
              description: 'XX系の会社でYYをしています！ZZをやっている方と繋がりたいです！',
              avatar:
                'https://2208-ace-d.s3.ap-northeast-1.amazonaws.com/male/n000029/main_0001_01.jpg',
              height: 170,
              weight: 'NORMAL',
              education: 'UNIVERSITY',
              income: 'BETWEEN_500_AND_700',
              holiday: 'WEEKEND',
              work_prefecture: 'TOKYO',
              born_prefecture: 'OSAKA',
              blood_type: 'A',
              marry_intention: 'IF_I_MEET_THE_RIGHT_PERSON',
              date_plans: {
                connect: [],
              },
              hobbies: {
                create: [],
              },
            },
          },
        },
      });

      maleUserIds.push(maleUser.id);
    }

    for (let i = 0; i < femaleUserNum; i++) {
      const femaleUser = await client.user.create({
        data: {
          email: 'user' + (i + maleUserNum).toString() + '@example.com',
          nickname: 'ユーザー' + (i + maleUserNum).toString(),
          password: hashSync('password', 10),
          refresh_token: '',
          gender: 'FEMALE',
          birthday: '2000-01-01',
          prefecture: 'OSAKA',
          profile: {
            create: {
              description: 'AA会社でBBをしています！CCをやっている方と繋がりたいです！',
              avatar:
                'https://2208-ace-d.s3.ap-northeast-1.amazonaws.com/male/n000029/main_0001_01.jpg',
              height: 150,
              weight: 'LITTLE_THIN',
              education: 'UNIVERSITY',
              income: 'BETWEEN_500_AND_700',
              holiday: 'WEEKEND',
              work_prefecture: 'OSAKA',
              born_prefecture: 'TOKYO',
              blood_type: 'AB',
              marry_intention: 'IF_I_MEET_THE_RIGHT_PERSON',
              date_plans: {
                connect: [],
              },
              hobbies: {
                create: [],
              },
            },
          },
        },
      });

      femaleUserIds.push(femaleUser.id);
    }

    for (let i = 0; i < maleUserNum; i++) {
      for (let j = 0; j < femaleUserNum; j++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,security/detect-object-injection
        const maleUserId = maleUserIds[i]!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,security/detect-object-injection
        const femaleUserId = femaleUserIds[j]!;
        await client.talk.create({
          data: {
            users: {
              connect: [{ id: maleUserId }, { id: femaleUserId }],
            },
            messages: {
              createMany: {
                data: [
                  {
                    author_id: maleUserId,
                    content: 'こんにちは！初めまして！',
                    created_at: new Date(2022, 7, 18, 11, 30, 0),
                  },
                  {
                    author_id: femaleUserId,
                    content: 'こんにちは！',
                    created_at: new Date(2022, 7, 18, 11, 33, 0),
                  },
                  {
                    author_id: femaleUserId,
                    content: 'ちょっと今東京に来ていて、会いませんか？',
                    created_at: new Date(2022, 7, 18, 11, 36, 0),
                  },
                  {
                    author_id: maleUserId,
                    content: 'いいですね！',
                    created_at: new Date(2022, 7, 18, 11, 40, 0),
                  },
                ],
              },
            },
          },
        });
      }
    }
  })
  .catch(console.error);
