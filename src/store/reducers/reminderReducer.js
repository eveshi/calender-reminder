import dateFns from 'date-fns';
import * as actionTypes from '../actions/actionTypes';
import { updateReminderObject } from '../utility/updateObject';
import { formatDate } from '../../utility/utility';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);

const initialState = {
  date: {
    date: formatDate(currentDate),
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  },
  allReminders: {},
  remindersDisplay: [],
};

const changeDay = (state, action) => {
  const {
    year,
    month,
  } = state.date;
  const valueToChange = {
    date: {
      ...state.date,
      date: formatDate(new Date(year, month, action.day)),
      day: action.day,
    },
  };

  return updateReminderObject(state, valueToChange);
};

const changeYearAndMonth = (state, action) => {
  const {
    day,
  } = state.date;
  const valueToChange = {
    date: {
      ...state.date,
      dete: formatDate(new Date(action.year, action.month, day)),
      year: action.year,
      month: action.month,
    },
  };

  return updateReminderObject(state, valueToChange);
};

const postReminder = (state, action) => {
  const dateReminders = state.allReminders[action.date] == null
    ? []
    : [...state.allReminders[action.date]];
  const id = dateFns.getTime(new Date());
  const reminderObject = {
    id,
    time: action.time,
    reminder: action.reminder,
  };
  dateReminders.push(reminderObject);
  const valueToChange = {
    allReminders: {
      ...state.allReminders,
      [action.date]: dateReminders,
    },
  };

  return updateReminderObject(state, valueToChange);
};

const deleteReminder = (state, action) => {
  const dateReminders = state.allReminders[action.date] == null
    ? []
    : [...state.allReminders[action.date]];
  const newDateReminders = dateReminders.filter(reminder => reminder.id !== action.id);
  const valueToChange = {
    allReminders: {
      ...state.allReminders,
      [action.date]: newDateReminders,
    },
  };

  return updateReminderObject(state, valueToChange);
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DAY:
      return changeDay(state, action);
    case actionTypes.CHANGE_YEAR_AND_MONTH:
      return changeYearAndMonth(state, action);
    case actionTypes.POST_REMINDER:
      return postReminder(state, action);
    case actionTypes.DELETE_REMINDER:
      return deleteReminder(state, action);
    default:
      return state;
  }
};

export default reminderReducer;
