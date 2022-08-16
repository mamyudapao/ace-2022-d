import { useListState } from '@mantine/hooks';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import PreviousLayout from '@organisms/PreviousLayout';
import { ProfileStepProps } from '@pages/profile';
import { HobbyCategoryResponse, HobbyResponse } from '@api/model';

interface HobbyStepProps extends ProfileStepProps {
  hobbies: HobbyResponse[] | undefined;
  hobbyCategories: HobbyCategoryResponse[] | undefined;
  selectedHobbyCategories: string[] | undefined;
  setHobbies: (hobbies: string[]) => void;
}

const HobbyStep = (props: HobbyStepProps) => {
  const [selectedHobbies, handlers] = useListState<string>([]);
  useEffect(() => {
    props.setHobbies(selectedHobbies);
  }, [props, selectedHobbies]);

  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button
            className="rounded-lg"
            color="primary"
            disabled={selectedHobbies.length < 5}
            fullWidth
          >
            {selectedHobbies.length < 5 ? '5つ以上選択しましょう' : '次へ'}
          </Button>
        </Link>
      }
    >
      <Typography className="select-none" variant="h3">
        プロフィールに趣味タグを追加しましょう
      </Typography>
      <Typography variant="subtitle2">5つ以上選択してください。</Typography>
      <div className="flex w-full flex-col gap-6 overflow-y-auto">
        {props.hobbyCategories
          ?.filter(category => props.selectedHobbyCategories?.includes(category.id))
          ?.map(category => (
            <div key={category.id} className="flex flex-col gap-3">
              <Typography variant="h6">{category.name}</Typography>
              <div className="mb-2 flex flex-wrap gap-2">
                {props.hobbies
                  ?.filter(h => h.category_id === category.id)
                  .map(hobby => (
                    <div
                      key={hobby.id}
                      className="flex cursor-pointer items-center justify-center rounded-full border border-solid py-[1px] px-3"
                      style={{
                        background: selectedHobbies.includes(hobby.id) ? '#ea6770' : 'transparent',
                        borderColor: selectedHobbies.includes(hobby.id) ? 'transparent' : '#CCCED3',
                      }}
                      onClick={() => {
                        if (selectedHobbies.includes(hobby.id)) {
                          handlers.filter(h => h !== hobby.id);
                        } else {
                          handlers.append(hobby.id);
                        }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="500"
                        color={selectedHobbies.includes(hobby.id) ? 'white' : '#888fa1'}
                      >
                        {hobby.name}
                      </Typography>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </PreviousLayout>
  );
};

export default HobbyStep;
