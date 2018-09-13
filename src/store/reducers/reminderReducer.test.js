import dateFns from 'date-fns';
import reducer from './reminderReducer';
import * as actionTypes from '../actions/actionTypes';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);

const initState = {
  date: {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  },
  allReminders: {},
  remindersDisplay: [],
};

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle CHANGE_DAY', () => {
    expect(
      reducer(initState, {
        type: actionTypes.CHANGE_DAY,
        day: 7,
      }),
    ).toEqual(
      {
        date: {
          year: currentYear,
          month: currentMonth,
          day: 7,
        },
        allReminders: {},
        remindersDisplay: [],
      },
    );
  });
});
