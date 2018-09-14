import dateFns from 'date-fns';
import * as utility from '../../utility/utility';

const currentDate = new Date();
const currentYear = dateFns.getYear(currentDate);
const currentMonth = dateFns.getMonth(currentDate);
const currentDay = dateFns.getDate(currentDate);
const currentHour = utility.hourStringGenerator(dateFns.getHours(currentDate));
// const currentMinutePrecise = dateFns.getMinutes(currentDate);
const currentMinuteVogue = utility.currentMinuteFiveGenerator();

export const yearGe = () => {
  const yearArray = [];
  for (let i = currentYear; i < currentYear + 31; i += 1) {
    yearArray.push(i);
  }

  return yearArray;
};

export const monthGe = (year) => {
  const monthArray = [];

  const getInitMonthInArray = () => {
    if (year === currentYear) return currentMonth;
    return 0;
  };

  const initMonth = getInitMonthInArray();

  for (let i = initMonth; i < 12; i += 1) {
    const month = {
      index: i,
      string: utility.monthStringGenerator(i),
    };
    monthArray.push(month);
  }

  return monthArray;
};

export const dayGe = (year, month) => {
  const daysInMonthPicked = dateFns.getDaysInMonth(new Date(year, month, 1));

  const dayArray = [];
  const getInitDayInArray = () => {
    if (currentYear !== year) return 1;
    if (currentMonth !== month) return 1;

    return currentDay;
  };

  const initDay = getInitDayInArray();
  for (let i = initDay; i < daysInMonthPicked + 1; i += 1) {
    dayArray.push(i);
  }

  return dayArray;
};

export const hourGe = (date) => {
  let currentHourOption = parseInt(currentHour, 10);
  if (dateFns.getMinutes(new Date()) > 55) {
    currentHourOption += 1;
  }

  const getInitHourInArray = () => {
    if (date !== utility.formatDate(new Date())) return 0;
    return currentHourOption;
  };

  const initHour = getInitHourInArray();

  const hourArray = [];
  for (let i = initHour; i < 24; i += 1) {
    const hourString = utility.hourStringGenerator(i);
    hourArray.push(hourString);
  }

  return hourArray;
};

export const minuteGe = (date, hour) => {
  const getMinuteInit = () => {
    if (date > utility.formatDate(currentDate)) return 0;
    if (currentHour === hour) return parseInt(currentMinuteVogue, 10);

    return 0;
  };

  const initMinute = getMinuteInit();

  const minuteArray = [];
  for (let i = initMinute; i < 60; i += 5) {
    const minuteString = utility.minuteStringGenerator(i);
    minuteArray.push(minuteString);
  }

  return minuteArray;
};
