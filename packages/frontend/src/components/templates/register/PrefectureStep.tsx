import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';
import { RegisterRequestPrefectureEnum } from '@api/model';

interface PrefectureStepProps extends RegisterStepProps {
  setPrefecture: (prefecture: RegisterRequestPrefectureEnum) => void;
}

const PrefectureStep = (props: PrefectureStepProps) => {
  const [prefecture, setPrefecture] = useState<RegisterRequestPrefectureEnum>();
  const prefectures: {
    key: string;
    japaneseName: string;
  }[] = [
    { key: 'HOKKAIDO', japaneseName: '北海道' },
    { key: 'AOMORI', japaneseName: '青森県' },
    { key: 'IWATE', japaneseName: '岩手県' },
    { key: 'MIYAGI', japaneseName: '宮城県' },
    { key: 'AKITA', japaneseName: '秋田県' },
    { key: 'YAMAGATA', japaneseName: '山形県' },
    { key: 'FUKUSHIMA', japaneseName: '福島県' },
    { key: 'IBARAKI', japaneseName: '茨城県' },
    { key: 'TOCHIGI', japaneseName: '栃木県' },
    { key: 'GUNMA', japaneseName: '群馬県' },
    { key: 'SAITAMA', japaneseName: '埼玉県' },
    { key: 'CHIBA', japaneseName: '千葉県' },
    { key: 'TOKYO', japaneseName: '東京都' },
    { key: 'KANAGAWA', japaneseName: '神奈川県' },
    { key: 'NIIGATA', japaneseName: '新潟県' },
    { key: 'TOYAMA', japaneseName: '富山県' },
    { key: 'ISHIKAWA', japaneseName: '石川県' },
    { key: 'FUKUI', japaneseName: '福井県' },
    { key: 'YAMANASHI', japaneseName: '山梨県' },
    { key: 'NIGATA', japaneseName: '長野県' },
    { key: 'SHIZUOKA', japaneseName: '静岡県' },
    { key: 'AICHI', japaneseName: '愛知県' },
    { key: 'MIE', japaneseName: '三重県' },
    { key: 'SHIGA', japaneseName: '滋賀県' },
    { key: 'KYOTO', japaneseName: '京都府' },
    { key: 'OSAKA', japaneseName: '大阪府' },
    { key: 'HYOGO', japaneseName: '兵庫県' },
    { key: 'NARA', japaneseName: '奈良県' },
    { key: 'WAKAYAMA', japaneseName: '和歌山県' },
    { key: 'TOTTORI', japaneseName: '鳥取県' },
    { key: 'SHIMANE', japaneseName: '島根県' },
    { key: 'OKAYAMA', japaneseName: '岡山県' },
    { key: 'HIROSHIMA', japaneseName: '広島県' },
    { key: 'YAMAGUCHI', japaneseName: '山口県' },
    { key: 'KAGAWA', japaneseName: '香川県' },
    { key: 'TOKUSHIMA', japaneseName: '徳島県' },
    { key: 'EHIME', japaneseName: '愛媛県' },
    { key: 'KOCHI', japaneseName: '高知県' },
    { key: 'FUKUOKA', japaneseName: '福岡県' },
    { key: 'SAGA', japaneseName: '佐賀県' },
    { key: 'NAGASAKI', japaneseName: '長崎県' },
    { key: 'KUMAMOTO', japaneseName: '熊本県' },
    { key: 'OITA', japaneseName: '大分県' },
    { key: 'MIYAZAKI', japaneseName: '宮崎県' },
    { key: 'KAGOSHIMA', japaneseName: '鹿児島県' },
    { key: 'OKINAWA', japaneseName: '沖縄県' },
  ];

  useEffect(() => {
    prefecture && props.setPrefecture(prefecture);
  }, [prefecture, props]);

  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button
            className="rounded-lg"
            color="primary"
            disabled={prefecture === undefined}
            fullWidth
          >
            次へ
          </Button>
        </Link>
      }
    >
      <Typography className="select-none" variant="h3">
        居住地
      </Typography>
      <FormControl className="w-full overflow-y-scroll">
        <RadioGroup
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrefecture(e.currentTarget.value as RegisterRequestPrefectureEnum)
          }
        >
          {prefectures.map(prefecture => (
            <FormControlLabel
              key={prefecture.key}
              value={prefecture.key}
              label={prefecture.japaneseName}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </PreviousLayout>
  );
};

export default PrefectureStep;
