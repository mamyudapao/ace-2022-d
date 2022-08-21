import styled from '@emotion/styled';
import { Fade, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { UserResponseProfileHobbiesInner } from '@api/model/user-response-profile-hobbies-inner';

interface Props {
  nickname: string;
  avatar: string;
  age: number;
  prefecture: string;
  hobbies: UserResponseProfileHobbiesInner[];
  imageList: string[] | undefined;
}

const UserDetailModal = (props: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [cannnotMove, setCannnotMove] = useState<'left' | 'default' | 'right'>('default');

  const imageList = props.imageList ?? [];
  const selectedImage = imageList.at(selectedImageIndex);

  const onClickChangeImage = (next: boolean) => {
    const newSelectImageIndex = selectedImageIndex + (next ? 1 : -1);
    if (0 <= newSelectImageIndex && newSelectImageIndex < imageList.length) {
      setSelectedImageIndex(newSelectImageIndex);
    } else if (newSelectImageIndex < 0) {
      setCannnotMove('left');
      setTimeout(() => {
        setCannnotMove('default');
      }, 100);
    } else {
      setCannnotMove('right');
      setTimeout(() => {
        setCannnotMove('default');
      }, 100);
    }
  };

  const ImageContentBox = styled.div`
    translate: ${cannnotMove === 'left' ? '2%' : cannnotMove === 'right' ? '-2%' : ''};
  `;

  return (
    <Fade in={true} timeout={600}>
      <div className="flex w-full flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden">
        <div className="relative">
          {selectedImage ? (
            <ImageContentBox>
              <Image src={selectedImage} alt="profileImage" width={500} height={500} />
            </ImageContentBox>
          ) : (
            <Skeleton variant="rectangular" width={500} height={500} />
          )}

          <div className="absolute bottom-9 z-10 flex w-full justify-center gap-1">
            {imageList.map((_, index) => (
              <div
                key={index}
                className={`h-[4px] w-[25px] rounded-sm ${
                  index === selectedImageIndex ? 'bg-white' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          <div className="absolute top-0 flex h-full w-full">
            <div onClick={() => onClickChangeImage(false)} className="z-10 h-[100%] w-1/2"></div>
            <div onClick={() => onClickChangeImage(true)} className="z-10 h-[100%] w-1/2"></div>
          </div>
        </div>

        <div className="relative z-10 -mt-7 rounded-t-2xl bg-white px-4 py-8">
          <div className="z-10 flex flex-col gap-10">
            <div>
              <Typography variant="h3">{props.nickname}</Typography>
              <Typography variant="subtitle1">
                {props.age}歳・{props.prefecture}
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="h6">趣味タグ</Typography>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Typography variant="body2">設定しているタグ</Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {props.hobbies.length}
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-2">
                  {props.hobbies.map(hobby => (
                    <Typography
                      variant="subtitle2"
                      key={hobby.name}
                      sx={{
                        bgcolor: 'rgba(48, 61, 80, 0.05)',
                        borderRadius: 10,
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      {hobby.name}
                    </Typography>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-1">
                <Typography variant="subtitle2">すべての趣味タグ</Typography>
                <FiChevronRight size={20} color="#A1A6B5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default UserDetailModal;
