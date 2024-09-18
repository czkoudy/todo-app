import {
  formControlClasses,
  inputLabelClasses,
  outlinedInputClasses,
} from '@mui/material';
import { css } from '@emotion/react';

export const styles = {
  newTaskInput: css`
    &.${formControlClasses.root} {
      width: 100%;
    }
    .${outlinedInputClasses.root} {
      height: 80px;
      font-size: 32px;
    }
    .${inputLabelClasses.root} {
      font-size: 32px;
      &.${inputLabelClasses.focused} {
        top: -10px;
      }
    }
  `,
};
