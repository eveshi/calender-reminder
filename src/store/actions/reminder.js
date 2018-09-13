import * as actionTypes from './actionTypes';

export const postReminder = (date, time, reminder) => ({
  type: actionTypes.POST_REMINDER,
  date,
  time,
  reminder,
});

export const deleteReminder = (date, id) => ({
  type: actionTypes.DELETE_REMINDER,
  date,
  id,
});

export const putReminder = (preDate, nextDate, id, time, reminder) => (dispatch) => {
  dispatch(deleteReminder(preDate, id));
  dispatch(postReminder(nextDate, time, reminder));
};

export const changeDay = day => ({
  type: actionTypes.CHANGE_DAY,
  day,
});

export const changeYearAndMonth = (year, month) => ({
  type: actionTypes.CHANGE_YEAR_AND_MONTH,
  year,
  month,
});
