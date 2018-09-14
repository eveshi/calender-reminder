import dateFns from 'date-fns';
import reducer from './sessionReducer';
import * as actionTypes from '../actions/actionTypes';
import * as utility from '../../utility/utility';
import { newSessionObject } from '../utility/updateObject';
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

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_SESSION_DAY', () => {
    const day = 28;
    const changedTimeAndDateSession = newSessionObject(
      currentYear,
      currentMonth,
      day,
      currentHour,
      currentMinuteVogue,
      utility.formatDate(currentDate),
    );
    expect(
      reducer(initialState, {
        type: actionTypes.CHANGE_SESSION_DAY,
        day,
      }),
    ).toEqual(
      {
        ...changedTimeAndDateSession,
        yearArray: yearGe(currentYear),
        reminder: {
          id: 0,
          time: 0,
          reminder: '',
        },
      },
    );
  });
});
