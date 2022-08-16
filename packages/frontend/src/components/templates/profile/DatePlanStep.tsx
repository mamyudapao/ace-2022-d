import { useListState } from '@mantine/hooks';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { SyntheticEvent, useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { ProfileStepProps } from '@pages/profile';
import { DatePlanCategoryResponse, DatePlanResponse } from '@api/model';

interface DatePlanStepProps extends ProfileStepProps {
  datePlans: DatePlanResponse[] | undefined;
  datePlanCategories: DatePlanCategoryResponse[] | undefined;
  setDatePlan: (datePlans: string[]) => void;
}

const DatePlanStep = (props: DatePlanStepProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPlans, handlers] = useListState<string>([]);

  useEffect(() => {
    const planScroller = document.getElementById('plans');
    const handleScroll = () => {
      const planTabs = document.querySelectorAll('.plan-tab');
      const currentTab = Array.from(planTabs).findIndex(
        tab => tab.getBoundingClientRect().bottom > 0
      );
      currentTab > -1 && setSelectedTab(currentTab);
    };

    planScroller?.addEventListener('scroll', handleScroll);
    return () => {
      planScroller?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    props.setDatePlan(selectedPlans);
  }, [props, selectedPlans]);

  return (
    <div className="flex h-screen w-screen flex-col justify-between gap-6 overflow-hidden">
      <div className={'flex flex-1 flex-col gap-6 overflow-hidden'}>
        <Typography className="select-none px-9 pt-10" variant="h3">
          プロフィールにデートプランを追加しましょう
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={(_event: SyntheticEvent, newValue: number) => {
            setSelectedTab(newValue);
            document.getElementById(`tab-${newValue}`)?.scrollIntoView({ behavior: 'smooth' });
          }}
          variant="scrollable"
        >
          {props.datePlanCategories?.map(category => (
            <Tab key={category.id} label={category.name} />
          ))}
        </Tabs>
        <div id="plans" className="flex flex-col gap-6 overflow-y-auto px-4">
          <Typography variant="subtitle2" color="#888fa1">
            やりたいことや行きたい場所を選んでください。
            <br />
            あとから変更することが可能です。
          </Typography>
          {props.datePlanCategories?.map((category, index) => (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div key={category.id} className="plan-tab flex flex-col gap-6">
              <Typography id={`tab-${index}`} variant="h4">
                {category.name}
              </Typography>
              <div className="flex flex-wrap justify-between gap-y-6">
                {props.datePlans
                  ?.filter(p => p.category_id === category.id)
                  ?.map(p => (
                    <div
                      key={p.id}
                      className="relative flex h-[230px] w-[47%] cursor-pointer flex-col overflow-hidden rounded-xl shadow-xl"
                      onClick={() => {
                        if (selectedPlans.includes(p.id)) handlers.filter(id => id !== p.id);
                        else handlers.append(p.id);
                      }}
                    >
                      {selectedPlans.includes(p.id) && (
                        <div className="absolute flex h-full w-full justify-end bg-[#fc5c6cbb] p-2">
                          <BsCheckCircleFill size={24} color="white" />
                        </div>
                      )}
                      {/*eslint-disable-next-line @next/next/no-img-element*/}
                      <img className="h-2/3 w-full bg-cover" src={p.image} alt="" />
                      <div className="p-2">
                        <Typography variant="body2">{p.name}</Typography>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-none px-3 py-4">
        <Link href={props.nextStepHref}>
          <Button
            className="rounded-lg"
            color="primary"
            disabled={selectedPlans.length < 3}
            fullWidth
          >
            {selectedPlans.length < 3 ? '3つ以上選択しましょう' : '次へ'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DatePlanStep;
