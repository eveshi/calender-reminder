import * as actionTypes from './actionTypes';

export const changeSessionDate = date => ({
  type: actionTypes.CHANGE_SESSION_DATE,
  date,
});

export const changeSessionTime = time => ({
  type: actionTypes.CHANGE_SESSION_TIME,
  time,
});

export const changeSessionReminder = reminder => ({
  type: actionTypes.CHANGE_SESSION_REMINDER,
  reminder,
});
