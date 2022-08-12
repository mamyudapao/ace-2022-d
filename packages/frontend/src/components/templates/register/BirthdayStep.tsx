import { useListState } from '@mantine/hooks';
import { Button, TextField, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import PreviousLayout from '@organisms/PreviousLayout';
import { RegisterStepProps } from '@pages/register';

interface BirthdayStepProps extends RegisterStepProps {
  setBirthday: (birthday: string) => void;
}

interface BirthdayInputProps {
  placeholder: string;
  index: number;
}

const BirthdayStep = (props: BirthdayStepProps) => {
  const [birthday, birthdayHandlers] = useListState<number | undefined>([]);
  const [focusedInput, setFocusedInput] = useState<number>(0);
  const inputs: HTMLDivElement[] = useMemo(() => [], []);

  const isValid = useMemo(() => {
    if (birthday.length !== 8) return false;
    if (birthday.some(d => d === undefined)) return false;

    const year = +birthday.slice(0, 4).join('');
    const month = +birthday.slice(4, 6).join('');
    const day = +birthday.slice(6, 8).join('');

    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const date = new Date(year, month - 1, day);

    return new Date().getTime() - date.getTime() >= 18 * 365 * 24 * 60 * 60 * 1000;
  }, [birthday]);

  useEffect(() => {
    inputs.at(focusedInput)?.focus();
  }, [focusedInput, inputs]);

  useEffect(() => {
    if (isValid) props.setBirthday(birthday.join(''));
  }, [birthday, isValid, props]);

  const BirthdayInput = (props: BirthdayInputProps) => {
    const StyledBirthdayInput = styled(TextField)`
      width: 23px;

      & > div > input {
        padding-right: 0;
        padding-left: 6px;
      }

      & > div > input::placeholder {
        color: #2c3038;
      }
    `;

    return (
      <StyledBirthdayInput
        placeholder={props.placeholder}
        inputRef={(ref: HTMLInputElement) => (inputs[props.index] = ref)}
        value={birthday[props.index] ?? ''}
        onFocus={() => setFocusedInput(props.index)}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          switch (e.key) {
            case 'Backspace':
              birthdayHandlers.setItem(props.index, undefined);
              props.index > 0 && setFocusedInput(props.index - 1);
              break;
            case 'ArrowLeft':
              props.index > 0 && setFocusedInput(props.index - 1);
              break;
            case 'ArrowRight':
              props.index < 8 && setFocusedInput(props.index + 1);
              break;
          }
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value[e.target.value.length - 1];

          if (!input) {
            birthdayHandlers.setItem(props.index, undefined);
            return;
          }

          if (isNaN(Number(input))) return;

          birthdayHandlers.setItem(props.index, +input);
          setFocusedInput(props.index + 1);
        }}
      />
    );
  };

  return (
    <PreviousLayout
      footer={
        <Link href={props.nextStepHref}>
          <Button className="rounded-lg" color="primary" disabled={!isValid} fullWidth>
            次へ
          </Button>
        </Link>
      }
    >
      <Typography className="select-none" variant="h3">
        生年月日
      </Typography>
      <Typography variant="subtitle2">
        登録後は変更できません。誤って登録されますとやりとりなどができなくなる場合があります。
      </Typography>
      <div className="mt-4 flex gap-2">
        <BirthdayInput placeholder="1" index={0} />
        <BirthdayInput placeholder="9" index={1} />
        <BirthdayInput placeholder="-" index={2} />
        <BirthdayInput placeholder="-" index={3} />
        <Typography variant="subtitle1">/</Typography>
        <BirthdayInput placeholder="-" index={4} />
        <BirthdayInput placeholder="-" index={5} />
        <Typography variant="subtitle1">/</Typography>
        <BirthdayInput placeholder="-" index={6} />
        <BirthdayInput placeholder="-" index={7} />
      </div>
    </PreviousLayout>
  );
};

export default BirthdayStep;
