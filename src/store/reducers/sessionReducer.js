import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  date: null,
  time: null,
  reminder: {
    id: null,
    time: null,
    reminder: null,
  },
};

const changeSessionDate = (state, action) => {
  const valueToChange = {
    date: action.date,
  };

  return updateObject(state, valueToChange);
};

const changeSessionTime = (state, action) => {
  const valueToChange = {
    time: action.time,
  };

  return updateObject(state, valueToChange);
};

const changeSessionReminder = (state, action) => {
  const valueToChange = {
    reminder: action.reminder,
  };

  return updateObject(state, valueToChange);
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SESSION_DATE:
      return changeSessionDate(state, action);
    case actionTypes.CHANGE_SESSION_TIME:
      return changeSessionTime(state, action);
    case actionTypes.CHANGE_SESSION_REMINDER:
      return changeSessionReminder(state, action);
    default:
      return state;
  }
};

export default sessionReducer;
