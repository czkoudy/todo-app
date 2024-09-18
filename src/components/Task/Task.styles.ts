import { css } from '@emotion/react';
import {
  iconButtonClasses,
  listItemClasses,
  listItemTextClasses,
  svgIconClasses,
} from '@mui/material';

export const styles = {
  deleteIconButton: css`
    &.${iconButtonClasses.root} {
      &:hover {
        & .${svgIconClasses.root} {
          color: red;
        }
      }
    }
  `,
  editableTextField: css`
    width: 100%;
  `,
  listItem: css`
    &.${listItemClasses.root} {
      .${iconButtonClasses.root} {
        display: none;
      }
      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
        .${iconButtonClasses.root} {
          display: flex;
        }
      }
    }
  `,
  listItemText: (completed: boolean) => css`
    .${listItemTextClasses.secondary} {
      text-decoration: ${completed ? 'line-through' : 'none'};
    }
    .${listItemTextClasses.primary} {
      text-decoration: ${completed ? 'line-through' : 'none'};
    }
  `,
};
