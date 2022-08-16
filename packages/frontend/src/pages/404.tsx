import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 px-8">
      <Typography variant="h4">お探しのページは見つかりません</Typography>
      <Typography variant="body2" align="center">
        お探しのページは見つかりません。一時的にアクセスできない状態か、移動もしくは削除されてしまった可能性があります。
      </Typography>
      <Link href="/">
        <Button variant="outlined">トップページへ戻る</Button>
      </Link>
    </div>
  );
};

export default NotFound;
