import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import {
  FaCommentDots,
  FaCompass,
  FaRegCommentDots,
  FaRegCompass,
  FaRegUserCircle,
  FaUserCircle,
} from 'react-icons/fa';
import { GrHomeRounded } from 'react-icons/gr';
import { RiDoorClosedFill, RiDoorClosedLine } from 'react-icons/ri';

interface FooterLayout {
  children: ReactNode;
}

const FooterLayout = (props: FooterLayout) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex flex-1 flex-col overflow-hidden">{props.children}</div>
      <div className="flex flex-none justify-between px-4 pt-2 pb-3">
        <FooterItem
          href="/home"
          label="ホーム"
          nonSelectedIcon={<HomeRounded size={24} />}
          selectedIcon={<HomeRoundedSelected size={24} />}
        />
        <FooterItem
          href="/discover"
          label="さがす"
          nonSelectedIcon={<FaRegCompass size={24} color="#a2a7b4" />}
          selectedIcon={<FaCompass size={24} color="transparent" fill="#172243" />}
        />
        <FooterItem
          href="/outing"
          label="おでかけ"
          nonSelectedIcon={<RiDoorClosedLine size={24} color="#a2a7b4" />}
          selectedIcon={<RiDoorClosedFill size={24} color="transparent" fill="#172243" />}
        />
        <FooterItem
          href="/talks"
          label="やりとり"
          nonSelectedIcon={<FaRegCommentDots size={24} color="#a2a7b4" />}
          selectedIcon={<FaCommentDots size={24} color="#172243" />}
        />
        <FooterItem
          href="/mypage"
          label="マイページ"
          nonSelectedIcon={<FaRegUserCircle size={24} color="#a2a7b4" />}
          selectedIcon={<FaUserCircle size={24} color="transparent" fill="#172243" />}
        />
      </div>
    </div>
  );
};

const HomeRounded = styled(GrHomeRounded)`
  & > path {
    fill: transparent;
    stroke: #a2a7b4;
  }
`;

const HomeRoundedSelected = styled(HomeRounded)`
  & > path {
    fill: #172243;
    stroke: transparent;
  }
`;

interface FooterItemProps {
  href: string;
  label: string;
  nonSelectedIcon: ReactNode;
  selectedIcon: ReactNode;
}

const FooterItem = (props: FooterItemProps) => {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <div className="flex w-[55px] cursor-pointer flex-col items-center gap-1">
        {router.pathname.startsWith(props.href) ? props.selectedIcon : props.nonSelectedIcon}
        <Typography variant="subtitle2" fontSize={9} lineHeight="100%">
          {props.label}
        </Typography>
      </div>
    </Link>
  );
};

export default FooterLayout;
