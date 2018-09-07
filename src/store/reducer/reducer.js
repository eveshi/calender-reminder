import dateFns from 'date-fns';
import createHash from 'create-hash';
import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);

const initialState = {
  date: {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  },
  allReminders: {},
  remindersDisplay: [],
};

// allReminders: {date:[{id:1, time: 12:00, reminder: "wash hands"}]}

const CHANGE_DAY = (state, action) => {
  const valueToChange = {
    date: {
      ...state.date,
      ...action.day,
    },
  };

  return updateObject(state, valueToChange);
};

const CHANGE_YEAR_AND_MONTH = (state, action) => {
  const valueToChange = {
    date: {
      ...state.date,
      ...action.year,
      ...action.month,
    },
  };

  return updateObject(state, valueToChange);
};

const POST_REMINDER = (state, action) => {
  let dateReminders = { ...state.allReminders[action.date] };
  const id = createHash(action.reminder);
  dateReminders.push()
  const valueToChange = {
    reminder: {
      ...state.date,
      ...action.year,
      ...action.month,
    },
  };

  return updateObject(state, valueToChange);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DAY:
      return CHANGE_DAY(state, action);
    case actionTypes.CHANGE_YEAR_AND_MONTH:
      return CHANGE_YEAR_AND_MONTH(state, action);
    case actionTypes.POST_REMINDER:
    case actionTypes.PUT_REMINDER:
    case actionTypes.GET_REMINDER:
    case actionTypes.DELETE_REMINDER:
      return updateComment(state, action);
    default:
      return state;
  }
};

export default reducer;
