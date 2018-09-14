import dateFns from 'date-fns';
import * as actionTypes from '../actions/actionTypes';
import { newSessionObject, updateObject } from '../utility/updateObject';
import * as utility from '../../utility/utility';
import { yearGe } from '../utility/arrayGenerator';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonthIndex = dateFns.getMonth(currentDate);
const currentMonth = {
  index: currentMonthIndex,
  string: utility.monthStringGenerator(currentMonthIndex),
};
let currentDay = dateFns.getDate(currentDate);
let currentHour = utility.hourStringGenerator(dateFns.getHours(currentDate));
let currentMinuteVogue = utility.currentMinuteFiveGenerator();

if (currentHour === '11'
    && dateFns.getMinutes(currentDate) > 55) {
  currentDay += 1;
  currentHour = '00';
  currentMinuteVogue = '00';
}

const initTimeAndDateSession = newSessionObject(
  currentYear,
  currentMonth,
  currentDay,
  currentHour,
  currentMinuteVogue,
  utility.formatDate(currentDate),
);

const initialState = {
  ...initTimeAndDateSession,
  yearArray: yearGe(currentYear),
  reminder: {
    id: 0,
    time: 0,
    reminder: '',
  },
};

const changeSessionYear = (state, action) => {
  const {
    month,
    day,
    hour,
    minute,
  } = state;

  const { year } = action;

  const valueToChange = newSessionObject(year, month, day, hour, minute);

  return updateObject(state, valueToChange);
};

const changeSessionMonth = (state, action) => {
  const {
    year,
    day,
    hour,
    minute,
  } = state;

  const month = {
    index: action.month,
    string: utility.monthStringGenerator(action.month),
  };

  const valueToChange = newSessionObject(year, month, day, hour, minute);

  return updateObject(state, valueToChange);
};

const changeSessionDay = (state, action) => {
  const {
    year,
    month,
    hour,
    minute,
  } = state;

  const { day } = action;

  const valueToChange = newSessionObject(year, month, day, hour, minute);

  return updateObject(state, valueToChange);
};

const changeSessionHour = (state, action) => {
  const {
    year,
    month,
    day,
    minute,
  } = state;

  const { hour } = action;

  const valueToChange = newSessionObject(year, month, day, hour, minute);

  return updateObject(state, valueToChange);
};

const changeSessionMinute = (state, action) => {
  const {
    year,
    month,
    day,
    hour,
  } = state;

  const { minute } = action;

  const valueToChange = newSessionObject(year, month, day, hour, minute);

  return updateObject(state, valueToChange);
};

const changeSessionReminder = (state, action) => {
  const valueToChange = {
    reminder: action.reminder,
  };

  return updateObject(state, valueToChange);
};

const cleanSession = (state) => {
  const {
    year,
    month,
    day,
  } = state;

  const hour = currentHour;
  const minute = currentMinuteVogue;

  const valueToChange = {
    ...newSessionObject(year, month, day, hour, minute),
    reminder: {
      id: 0,
      time: 0,
      reminder: '',
    },
  };

  return updateObject(state, valueToChange);
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SESSION_YEAR:
      return changeSessionYear(state, action);
    case actionTypes.CHANGE_SESSION_MONTH:
      return changeSessionMonth(state, action);
    case actionTypes.CHANGE_SESSION_DAY:
      return changeSessionDay(state, action);
    case actionTypes.CHANGE_SESSION_HOUR:
      return changeSessionHour(state, action);
    case actionTypes.CHANGE_SESSION_MINUTE:
      return changeSessionMinute(state, action);
    case actionTypes.CHANGE_SESSION_REMINDER:
      return changeSessionReminder(state, action);
    case actionTypes.CLEAN_SESSION:
      return cleanSession(state);
    default:
      return state;
  }
};

export default sessionReducer;
