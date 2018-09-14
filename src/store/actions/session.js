import * as actionTypes from './actionTypes';

export const changeSessionYear = year => ({
  type: actionTypes.CHANGE_SESSION_YEAR,
  year,
});

export const changeSessionMonth = month => ({
  type: actionTypes.CHANGE_SESSION_MONTH,
  month,
});

export const changeSessionDay = day => ({
  type: actionTypes.CHANGE_SESSION_DAY,
  day,
});

export const changeSessionHour = hour => ({
  type: actionTypes.CHANGE_SESSION_HOUR,
  hour,
});

export const changeSessionMinute = minute => ({
  type: actionTypes.CHANGE_SESSION_MINUTE,
  minute,
});

export const changeSessionReminder = reminder => ({
  type: actionTypes.CHANGE_SESSION_REMINDER,
  reminder,
});

export const cleanSession = () => ({
  type: actionTypes.CLEAN_SESSION,
});
