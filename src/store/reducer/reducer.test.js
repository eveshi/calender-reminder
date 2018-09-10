import dateFns from 'date-fns';
import reducer from './reducer';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);

const initState = {
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

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });
});
