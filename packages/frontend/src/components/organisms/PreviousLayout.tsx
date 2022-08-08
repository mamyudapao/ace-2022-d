import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface PreviousHeaderProps {
  link?: {
    href: string;
    text: string;
  };
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'around' | 'between';
  footer?: ReactNode;
  children: ReactNode;
}

const PreviousLayout = (props: PreviousHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-4">
      <div className="flex w-full items-center justify-between">
        <AiOutlineArrowLeft className="cursor-pointer" size={32} onClick={router.back} />
        {props.link && (
          <Link href={props.link.href}>
            <Typography className="cursor-pointer select-none" variant="subtitle1">
              {props.link.text}
            </Typography>
          </Link>
        )}
      </div>
      <div
        className={
          'flex w-full h-full flex-col gap-6 p-6' +
          ` items-${props.align ?? 'start'} justify-${props.justify ?? 'start'}`
        }
      >
        {props.children}
      </div>
      {props.footer}
    </div>
  );
};

export default PreviousLayout;
