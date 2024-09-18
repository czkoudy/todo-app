import { css } from '@emotion/react';
import { alertClasses, svgIconClasses } from '@mui/material';

export const styles = {
  alert: css`
    margin-bottom: 10px;
    .${alertClasses.action} {
      padding-top: 1px;
    }
  `,
  alertButton: css`
    font-size: 12px;
    .${svgIconClasses.root} {
      width: 16px;
      padding-right: 5px;
    }
  `,
  boldText: css`
    font-weight: bold;
  `,
  wrapper: css`
    width: 100%;
  `,
};
