import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

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
    <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden px-3 py-4">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <FiArrowLeft className="cursor-pointer" size={32} onClick={router.back} />
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
            'flex flex-1 flex-col gap-6 p-4 overflow-hidden' +
            ` items-${props.align ?? 'start'} justify-${props.justify ?? 'start'}`
          }
        >
          {props.children}
        </div>
      </div>
      <div className="flex-none">{props.footer}</div>
    </div>
  );
};

export default PreviousLayout;
