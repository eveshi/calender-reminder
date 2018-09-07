import * as actionTypes from './actionTypes';

export const POST_REMINDER = (date, time, reminder) => ({
  type: actionTypes.POST_REMINDER,
  date,
  time,
  reminder,
});

export const GET_REMINDER = date => ({
  type: actionTypes.GET_REMINDER,
  date,
});

export const PUT_REMINDER = (date, id, time, reminder) => ({
  type: actionTypes.PUT_REMINDER,
  date,
  id,
  time,
  reminder,
});

export const DELETE_REMINDER = (date, id) => ({
  type: actionTypes.DELETE_REMINDER,
  date,
  id,
});
