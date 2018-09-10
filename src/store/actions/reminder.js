import * as actionTypes from './actionTypes';

export const POST_REMINDER = (date, time, reminder) => ({
  type: actionTypes.POST_REMINDER,
  date,
  time,
  reminder,
});

export const DELETE_REMINDER = (date, id) => ({
  type: actionTypes.DELETE_REMINDER,
  date,
  id,
});

export const PUT_REMINDER = (preDate, nextDate, id, time, reminder) => (dispatch) => {
  dispatch(DELETE_REMINDER(preDate, id));
  dispatch(POST_REMINDER(nextDate, time, reminder));
};

export const GET_SINGLE_REMINDER = id => ({
  type: actionTypes.GET_SINGLE_REMINDER,
  id,
});
