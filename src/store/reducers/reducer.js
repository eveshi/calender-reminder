import dateFns from 'date-fns';
import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

// import { formatCurrentDate } from '../../utility/utility';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);

const initialState = {
  session: {
    date: null,
    time: null,
    reminder: {
      id: null,
      time: null,
      reminder: null,
    },
  },
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

const CHANGE_SESSION = (state, action) => {
  let valueToChange = {
    session: {
      ...state.session,
      date: action.date,
      time: action.time,
    },
  };

  if (action.time !== null) {
    valueToChange = {
      session: {
        ...state.session,
        time: action.time,
      },
    };
  }

  if (action.date !== null) {
    valueToChange = {
      session: {
        ...state.session,
        date: action.date,
      },
    };
  }

  if (action.reminder !== null) {
    valueToChange = {
      session: {
        ...state.session,
        reminder: action.reminder,
      },
    };
  }

  return updateObject(state, valueToChange);
};

const POST_REMINDER = (state, action) => {
  const dateReminders = state.allReminders[action.date] == null
    ? []
    : [...state.allReminders[action.date]];
  const id = `${action.date}${action.time}`;
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

  return updateObject(state, valueToChange);
};

const DELETE_REMINDER = (state, action) => {
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

  return updateObject(state, valueToChange);
};


const GET_SINGLE_REMINDER = (state, action) => {
  const singleReminderDisplay = [...state.remindersDisplay].filter(reminder => (
    reminder.id === action.id
  ));
  const valueToChange = {
    singleReminderDisplay,
  };

  return updateObject(state, valueToChange);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DAY:
      return CHANGE_DAY(state, action);
    case actionTypes.CHANGE_YEAR_AND_MONTH:
      return CHANGE_YEAR_AND_MONTH(state, action);
    case actionTypes.CHANGE_SESSION:
      return CHANGE_SESSION(state, action);
    case actionTypes.POST_REMINDER:
      return POST_REMINDER(state, action);
    case actionTypes.GET_SINGLE_REMINDER:
      return GET_SINGLE_REMINDER(state, action);
    case actionTypes.DELETE_REMINDER:
      return DELETE_REMINDER(state, action);
    default:
      return state;
  }
};

export default reducer;
