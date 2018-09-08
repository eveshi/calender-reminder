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
      day: action.day,
    },
  };

  return updateObject(state, valueToChange);
};

const CHANGE_YEAR_AND_MONTH = (state, action) => {
  const valueToChange = {
    date: {
      ...state.date,
      year: action.year,
      month: action.month,
    },
  };

  return updateObject(state, valueToChange);
};

const POST_REMINDER = (state, action) => {
  const dateReminders = [...state.allReminders[action.date]];
  const id = createHash(action.reminder);
  const reminderObject = {
    id,
    time: action.time,
    reminder: action.reminder,
  };
  dateReminders.push(reminderObject);
  const valueToChange = {
    allReminders: {
      ...state.allReminders,
      [state.date]: dateReminders,
    },
  };

  return updateObject(state, valueToChange);
};

const GET_REMINDER = (state, action) => {
  const remindersDisplay = [...state.allReminders[action.date]];
  const valueToChange = {
    remindersDisplay,
  };

  return updateObject(state, valueToChange);
};

const PUT_REMINDER = (state, action) => {
  const dateReminders = [...state.allReminders[action.date]];
  const newDateReminders = dateReminders.map((reminder) => {
    if (reminder.id === action.id) {
      return {
        ...reminder,
        time: action.time,
        reminder: action.reminder,
      };
    }

    return reminder;
  });
  const valueToChange = {
    allReminders: {
      ...state.allReminders,
      [state.date]: newDateReminders,
    },
  };

  return updateObject(state, valueToChange);
};

const DELETE_REMINDER = (state, action) => {
  const dateReminders = [...state.allReminders[action.date]];
  const newDateReminders = dateReminders.map((reminder) => {
    if (reminder.id === action.id) {
      return null;
    }

    return reminder;
  });
  const valueToChange = {
    allReminders: {
      ...state.allReminders,
      [state.date]: newDateReminders,
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
      return POST_REMINDER(state, action);
    case actionTypes.PUT_REMINDER:
      return PUT_REMINDER(state, action);
    case actionTypes.GET_REMINDER:
      return GET_REMINDER(state, action);
    case actionTypes.DELETE_REMINDER:
      return DELETE_REMINDER(state, action);
    default:
      return state;
  }
};

export default reducer;
