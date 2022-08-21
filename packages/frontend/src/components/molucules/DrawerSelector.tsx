/* eslint-disable */
import { Button, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect } from 'react';
import { UpdateUserRequest } from '@api/model';

export type SelectKey =
  | 'prefectures'
  | 'weight'
  | 'marryIntention'
  | 'income'
  | 'education'
  | 'bloods'
  | 'height';

export type SelectOptions = {
  [key in SelectKey]: string[] | number[] | string[][];
};

interface Props {
  data: string[] | number[] | string[][];
  currentDataValue: string | number | undefined; //一致しているものをアクティブにしたいから
  formValue: string | number | null;
  setFormValue: React.Dispatch<any>;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  submitKey: keyof UpdateUserRequest;
  handleSubmit: (key: keyof UpdateUserRequest, value: string | number | null) => Promise<void>;
}

export const DrawerSelector = (props: Props) => {
  const [open, setOpen] = React.useState(!props.open);

  const firstValue = props.currentDataValue;
  useEffect(() => {
    setOpen(!open);
  }, []);

  return (
    <div>
      <Drawer anchor="bottom" open={open}>
        <Toolbar className="flex justify-between">
          <Button
            variant="text"
            onClick={() => {
              props.setOpen(false);
              props.setFormValue(firstValue);
              setOpen(false);
            }}
          >
            <p className="text-black">キャンセル</p>
          </Button>
          <Button
            onClick={() => {
              void props.handleSubmit(props.submitKey, props.formValue);
              props.setOpen(false);
              setOpen(false);
            }}
          >
            保存
          </Button>
        </Toolbar>
        <List>
          {props.data.map((item: any, index) => {
            if (typeof item === ('string' || 'number') || props.submitKey === 'height') {
              return (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => {
                      props.setFormValue(item);
                    }}
                  >
                    <p className="text-black">{item}</p>
                  </ListItemButton>
                </ListItem>
              );
            } else {
              return (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => {
                      // eslint-disable-file @typescript-eslint/no-unsafe-member-access
                      props.setFormValue(item[0]);
                    }}
                  >
                    <p className="text-black">{item[1]}</p>
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </div>
  );
};
