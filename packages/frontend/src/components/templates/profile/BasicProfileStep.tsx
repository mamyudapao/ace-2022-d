import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ProfileStepProps } from '@pages/profile';
import {
  UpdateUserRequestEducationEnum,
  UpdateUserRequestHolidayEnum,
  UpdateUserRequestIncomeEnum,
  UpdateUserRequestMarryIntentionEnum,
  UpdateUserRequestWeightEnum,
} from '@api/model';

interface BasicProfileStepProps extends ProfileStepProps {
  setHeight: (height: number) => void;
  setWeight: (weight: UpdateUserRequestWeightEnum) => void;
  setEducation: (education: UpdateUserRequestEducationEnum) => void;
  setIncome: (income: UpdateUserRequestIncomeEnum) => void;
  setHoliday: (holiday: UpdateUserRequestHolidayEnum) => void;
  setMarryIntention: (marryIntention: UpdateUserRequestMarryIntentionEnum) => void;
}

const BasicProfileStep = (props: BasicProfileStepProps) => {
  const [height, setHeight] = useState<number>();
  const [editingHeight, setEditingHeight] = useState(false);

  useEffect(() => {
    height && props.setHeight(height);
  }, [height, props]);

  const [weight, setWeight] = useState<UpdateUserRequestWeightEnum>();
  const [editingWeight, setEditingWeight] = useState(false);
  const getWeightType = useCallback((weight: UpdateUserRequestWeightEnum) => {
    switch (weight) {
      case 'FAT':
        return '太め';
      case 'LITTLE_FAT':
        return '少し太め';
      case 'NORMAL':
        return '普通';
      case 'LITTLE_THIN':
        return '少し細め';
      case 'THIN':
        return '細め';
    }

    return '不明';
  }, []);

  useEffect(() => {
    weight && props.setWeight(weight);
  }, [weight, props]);

  const [education, setEducation] = useState<UpdateUserRequestEducationEnum>();
  const [editingEducation, setEditingEducation] = useState(false);
  const getEducationType = useCallback((education: UpdateUserRequestEducationEnum) => {
    switch (education) {
      case 'ELEMENTARY_SCHOOL':
        return '小学校';
      case 'JUNIOR_HIGH_SCOOL':
        return '中学校';
      case 'HIGH_SCHOOL':
        return '高校';
      case 'UNIVERSITY':
        return '大学';
      case 'OTHER':
        return 'その他';
    }

    return '不明';
  }, []);

  useEffect(() => {
    education && props.setEducation(education);
  }, [education, props]);

  const [income, setIncome] = useState<UpdateUserRequestIncomeEnum>();
  const [editingIncome, setEditingIncome] = useState(false);
  const getIncomeType = useCallback((income: UpdateUserRequestIncomeEnum) => {
    switch (income) {
      case 'LOWER_THAN_300':
        return '300万円以下';
      case 'BETWEEN_300_AND_500':
        return '300万円以上500万円以下';
      case 'BETWEEN_500_AND_700':
        return '500万円以上700万円以下';
      case 'BETWEEN_700_AND_1000':
        return '700万円以上1000万円以下';
      case 'OVER_1000':
        return '1000万円以上';
    }

    return '不明';
  }, []);

  useEffect(() => {
    income && props.setIncome(income);
  }, [income, props]);

  const [holiday, setHoliday] = useState<UpdateUserRequestHolidayEnum>();
  const [editingHoliday, setEditingHoliday] = useState(false);
  const getHolidayType = useCallback((holiday: UpdateUserRequestHolidayEnum) => {
    switch (holiday) {
      case 'NO_HOLIDAY':
        return 'なし';
      case 'WEEKDAY':
        return '平日';
      case 'WEEKEND':
        return '週末';
      case 'EVERYDAY':
        return '毎日';
      case 'DONT_KNOW':
        return '不明';
    }

    return '不明';
  }, []);

  useEffect(() => {
    holiday && props.setHoliday(holiday);
  }, [holiday, props]);

  const [marryIntention, setMarryIntention] = useState<UpdateUserRequestMarryIntentionEnum>();
  const [editingMarryIntention, setEditingMarryIntention] = useState(false);
  const getMarryIntentionType = useCallback(
    (marryIntention: UpdateUserRequestMarryIntentionEnum) => {
      switch (marryIntention) {
        case 'WANT_TO_MARRY':
          return '結婚したい';
        case 'IF_I_MEET_THE_RIGHT_PERSON':
          return '会う人がいるなら';
        case 'NO_PLAN':
          return '計画なし';
      }

      return '不明';
    },
    []
  );

  useEffect(() => {
    marryIntention && props.setMarryIntention(marryIntention);
  }, [marryIntention, props]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden px-3 py-4">
        <div className={'flex flex-1 flex-col gap-6 overflow-hidden p-6'}>
          <Typography className="select-none" variant="h3">
            プロフィールを入力しましょう
          </Typography>
          <Typography variant="subtitle2">
            あなたの基本情報を教えてください。登録すると３ポイントが付与されます。
          </Typography>
          <div className="flex flex-col gap-2">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingHeight(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                身長
              </Typography>
              {height ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {height}cm
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
            <Divider />
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingWeight(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                体型
              </Typography>
              {weight ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {getWeightType(weight)}
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
            <Divider />
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingEducation(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                学歴
              </Typography>
              {education ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {getEducationType(education)}
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
            <Divider />
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingIncome(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                年収
              </Typography>
              {income ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {getIncomeType(income)}
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
            <Divider />
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingHoliday(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                休日
              </Typography>
              {holiday ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {getHolidayType(holiday)}
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
            <Divider />
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setEditingMarryIntention(true)}
            >
              <Typography variant="h6" fontWeight="normal">
                結婚に対する意思
              </Typography>
              {marryIntention ? (
                <Typography variant="h6" fontWeight="normal" color="#e64c5b">
                  {getMarryIntentionType(marryIntention)}
                </Typography>
              ) : (
                <Typography variant="h6" fontWeight="normal" color="#888fa1">
                  未登録
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="flex-none">
          <Link href={props.nextStepHref}>
            <Button className="rounded-lg" color="primary" fullWidth>
              次へ
            </Button>
          </Link>
        </div>
      </div>
      <Dialog open={editingHeight} onClose={() => setEditingHeight(false)} fullWidth>
        <DialogTitle align="center">身長</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {new Array(50).fill(undefined).map((_, i) => (
              <DialogContentText
                key={i}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setHeight(150 + i);
                  setEditingHeight(false);
                }}
              >
                {150 + i}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editingWeight} onClose={() => setEditingWeight(false)} fullWidth>
        <DialogTitle align="center">体系</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {Object.keys(UpdateUserRequestWeightEnum).map(v => (
              <DialogContentText
                key={v}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setWeight(v as UpdateUserRequestWeightEnum);
                  setEditingWeight(false);
                }}
              >
                {getWeightType(v as UpdateUserRequestWeightEnum)}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editingEducation} onClose={() => setEditingEducation(false)} fullWidth>
        <DialogTitle align="center">学歴</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {Object.keys(UpdateUserRequestEducationEnum).map(v => (
              <DialogContentText
                key={v}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setEducation(v as UpdateUserRequestEducationEnum);
                  setEditingEducation(false);
                }}
              >
                {getEducationType(v as UpdateUserRequestEducationEnum)}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editingIncome} onClose={() => setEditingEducation(false)} fullWidth>
        <DialogTitle align="center">年収</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {Object.keys(UpdateUserRequestIncomeEnum).map(v => (
              <DialogContentText
                key={v}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setIncome(v as UpdateUserRequestIncomeEnum);
                  setEditingIncome(false);
                }}
              >
                {getIncomeType(v as UpdateUserRequestIncomeEnum)}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editingHoliday} onClose={() => setEditingHoliday(false)} fullWidth>
        <DialogTitle align="center">休日</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {Object.keys(UpdateUserRequestHolidayEnum).map(v => (
              <DialogContentText
                key={v}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setHoliday(v as UpdateUserRequestHolidayEnum);
                  setEditingHoliday(false);
                }}
              >
                {getHolidayType(v as UpdateUserRequestHolidayEnum)}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={editingMarryIntention}
        onClose={() => setEditingMarryIntention(false)}
        fullWidth
      >
        <DialogTitle align="center">結婚に対する意思</DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6">
            {Object.keys(UpdateUserRequestMarryIntentionEnum).map(v => (
              <DialogContentText
                key={v}
                className="cursor-pointer"
                fontSize={14}
                color="#172242"
                onClick={() => {
                  setMarryIntention(v as UpdateUserRequestMarryIntentionEnum);
                  setEditingMarryIntention(false);
                }}
              >
                {getMarryIntentionType(v as UpdateUserRequestMarryIntentionEnum)}
              </DialogContentText>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BasicProfileStep;
