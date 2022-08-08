import { Button } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const GetStarted = () => {
  return (
    <>
      <Head>
        <title>
          タップル(tapple) -
          恋活・婚活マッチングアプリ【公式】｜サイバーエージェントグループ企業運営
        </title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-between p-9">
        <div
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '170px',
            height: '170px',
          }}
        >
          <Image src="/logo.png" width={170} height={170} alt="tapple" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <Link href="/register">
            <Button color="primary" fullWidth>
              さっそくはじめる
            </Button>
          </Link>
          <Link href="/login">
            <Button color="secondary" fullWidth>
              ログイン
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
