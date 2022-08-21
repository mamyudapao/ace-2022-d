/* eslint-disable */
import * as React from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { UpdateUserRequest } from '@api/model';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface Props {
  handleSubmit: (key: keyof UpdateUserRequest, value: string | number | null) => void;
  currentDataValue?: string | null;
  formValue: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const FullScreenDialog = (props: Props) => {
  const [open, setOpen] = React.useState(!props.open);

  useEffect(() => {
    setOpen(!open);
    if (props.currentDataValue) {
      props.setValue(props.currentDataValue);
    } else {
      props.setValue(null);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <Toolbar>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <BiArrowBack />
          </IconButton>
          <Typography variant="h6" className="w-full text-center">
            自己紹介
          </Typography>
          <Button
            className="w-24"
            onClick={() => {
              props.handleSubmit('description', props.formValue);
              props.setOpen(false);
              setOpen(false);
            }}
          >
            保存
          </Button>
        </Toolbar>
        <TextField
          className="h-4/6 bg-white"
          InputProps={{
            disableUnderline: true,
          }}
          multiline
          rows={30}
          value={props.formValue}
          onChange={e => {
            props.setValue(e.target.value);
          }}
        />
      </Dialog>
    </div>
  );
};
