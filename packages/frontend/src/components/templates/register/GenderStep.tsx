import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface GenderStepProps extends RegisterStepProps {
  setGender: (gender: string) => void;
}

const GenderStep = (props: GenderStepProps) => {
  const [gender, setGender] = useState<string>();

  useEffect(() => {
    gender && props.setGender(gender);
  }, [gender, props]);

  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button className="rounded-lg" color="primary" disabled={gender === undefined} fullWidth>
            次へ
          </Button>
        </Link>
      }
    >
      <Typography className="select-none" variant="h3">
        性別
      </Typography>
      <Typography variant="subtitle2">一度登録した性別は変更できません。</Typography>
      <div className="flex flex-col gap-3">
        <SelectorButton selected={gender === 'MALE'} onClick={() => setGender('MALE')}>
          男性
        </SelectorButton>
        <SelectorButton selected={gender === 'FEMALE'} onClick={() => setGender('FEMALE')}>
          女性
        </SelectorButton>
      </div>
    </PreviousLayout>
  );
};

const SelectorButton = styled.button<{
  selected: boolean;
}>`
  height: 56px;
  padding: 0;
  border: 1px solid ${props => (props.selected ? 'transparent' : '#e7e8ec')};
  background-color: ${props => (props.selected ? '#fceced' : 'transparent')};
  border-radius: 0.8rem;
  color: ${props => (props.selected ? '#fc5c6c' : '#9097a8')};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: normal;
  outline: none;
`;

export default GenderStep;
