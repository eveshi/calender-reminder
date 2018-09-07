import * as actionTypes from './actionTypes';

export const CHANGE_DAY = day => ({
  type: actionTypes.CHANGE_DATE,
  day,
});

export const CHANGE_YEAR_AND_MONTH = (year, month) => ({
  type: actionTypes.CHANGE_YEAR_AND_MONTH,
  year,
  month,
});
