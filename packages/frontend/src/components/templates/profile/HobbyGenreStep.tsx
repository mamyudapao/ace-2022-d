import { useListState } from '@mantine/hooks';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ProfileStepProps } from '@pages/profile';
import { HobbyCategoryResponse } from '@api/model';

interface HobbyGenreStepProps extends ProfileStepProps {
  hobbyCategories: HobbyCategoryResponse[] | undefined;
  setHobbyCategories: (hobbyCategories: string[]) => void;
}

const HobbyGenreStep = (props: HobbyGenreStepProps) => {
  const [selectedHobbyCategories, handlers] = useListState<string>([]);

  useEffect(() => {
    props.setHobbyCategories(selectedHobbyCategories);
  }, [props, selectedHobbyCategories]);

  return (
    <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden px-3 py-4">
      <div className={'flex flex-1 flex-col gap-6 overflow-hidden p-3'}>
        <Typography className="select-none px-3 pt-3" variant="h3">
          興味のあることを教えてください
        </Typography>
        <Typography className="px-3" variant="subtitle2">
          3つ以上選択してください。
        </Typography>
        <div className="grid grid-cols-3 gap-5 overflow-y-auto">
          {props.hobbyCategories?.map(category => (
            <div
              key={category.id}
              className="relative flex h-[90px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl p-2"
              style={{
                background: selectedHobbyCategories.includes(category.id) ? '#ea6770' : '#f1f2f4',
              }}
              onClick={() => {
                if (selectedHobbyCategories.includes(category.id)) {
                  handlers.filter(h => h !== category.id);
                } else {
                  handlers.append(category.id);
                }
              }}
            >
              <div className="absolute flex h-full w-full items-start justify-end p-2">
                {selectedHobbyCategories.includes(category.id) ? (
                  <BsFillCheckCircleFill size={18} color="white" />
                ) : (
                  <BsFillCheckCircleFill size={18} color="#abb0bb" />
                )}
              </div>
              <Typography
                variant="body2"
                color={selectedHobbyCategories.includes(category.id) ? 'white' : 'black'}
              >
                {category.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-none">
        <Link href={props.nextStepHref}>
          <Button
            className="rounded-lg"
            color="primary"
            disabled={selectedHobbyCategories.length < 3}
            fullWidth
          >
            {selectedHobbyCategories.length < 3 ? '3つ以上選択しましょう' : '次へ'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HobbyGenreStep;
