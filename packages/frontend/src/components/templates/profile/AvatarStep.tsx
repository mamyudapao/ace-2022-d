import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PreviousLayout from '@organisms/PreviousLayout';
import { ProfileStepProps } from '@pages/profile';

interface AvatarStepProps extends ProfileStepProps {
  setAvatar: (avatar: string) => void;
  handleSubmit: () => Promise<void> | void;
}

const AvatarStep = (props: AvatarStepProps) => {
  const router = useRouter();

  const [avatar, setAvatar] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    avatar && setAvatar(avatar);
  }, [avatar, props]);

  const submit = async () => {
    setLoading(true);
    try {
      await props.handleSubmit();
    } finally {
      setLoading(false);
    }
    await router.push(props.nextStepHref);
  };

  const uploader = (
    <input
      hidden
      accept="image/*"
      type="file"
      onChange={event => {
        const reader = new FileReader();
        reader.onload = e => {
          const result = e.target?.result;

          if (!result) {
            return;
          }

          setAvatar(e.target.result as string);
        };

        const file = event.target.files?.[0];
        file && reader.readAsDataURL(file);
      }}
    />
  );
  return (
    <PreviousLayout>
      <Typography className="select-none" variant="h3">
        写真を登録しましょう
      </Typography>
      <Typography variant="subtitle2">
        写真を登録するとマッチングの成功率が約3.8倍にアップします！写真をアップロードした方には200ポイントプレゼント！
      </Typography>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="h-32 w-32 rounded-full object-cover" src={avatar} alt="" />
          ) : (
            <label className="h-32 w-32 rounded-full bg-gray-200">{uploader}</label>
          )}
        </div>
        {avatar ? (
          <Button
            disabled={isLoading}
            fullWidth
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={submit}
          >
            この写真で登録する
          </Button>
        ) : (
          <Button component="label">
            写真をアップロード
            {uploader}
          </Button>
        )}
        <Typography variant="subtitle2">※写真は後で変更できます</Typography>
      </div>
    </PreviousLayout>
  );
};

export default AvatarStep;
