import * as actionTypes from './actionTypes';

export const changeDay = day => ({
  type: actionTypes.CHANGE_DAY,
  day,
});

export const changeYearAndMonth = (year, month) => ({
  type: actionTypes.CHANGE_YEAR_AND_MONTH,
  year,
  month,
});

export const changeSessionReminder = (date, time, reminder) => ({
  type: actionTypes.CHANGE_SESSION_REMINDER,
  date,
  time,
  reminder,
});
