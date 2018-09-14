import dateFns from 'date-fns';
import * as arrayGenerator from './arrayGenerator';
import * as utility from '../../utility/utility';

export const updateReminderObject = (prevState, valueToChange) => {
  const newState = {
    ...prevState,
    ...valueToChange,
  };

  const {
    year,
    month,
    day,
  } = newState.date;

  const { allReminders } = newState;
  const date = dateFns.format(new Date(year, month, day), 'YYYYMMDD');
  const remindersDisplay = allReminders[date] == null
    ? []
    : [...allReminders[date]];

  return {
    ...newState,
    remindersDisplay,
  };
};

export const newSessionObject = (year, month, day, hour, minute) => {
  const monthArray = arrayGenerator.monthGe(year);
  const newMonth = utility.defaultMonthValue(monthArray, month);

  const dayArray = arrayGenerator.dayGe(year, newMonth.index);
  let newDay = utility.defaultValue(dayArray, day);
  let newDate = utility.formatDate(new Date(year, newMonth.index, newDay));

  if (newDate === utility.formatDate(new Date())
      && dateFns.getHours(new Date()) === 11
      && dateFns.getMinutes(new Date()) > 55) {
    newDay += 1;
    newDate = utility.formatDate(new Date(year, newMonth.index, newDay));
  }

  const hourArray = arrayGenerator.hourGe(newDate);
  const newHour = utility.defaultValue(hourArray, hour);

  const minuteArray = arrayGenerator.minuteGe(newDate, newHour);
  const newMinute = utility.defaultValue(minuteArray, minute);
  const time = utility.timeIDGenerator(newHour, newMinute);

  return {
    year,
    month: newMonth,
    monthArray,
    day: newDay,
    dayArray,
    date: newDate,
    hour: newHour,
    hourArray,
    minute: newMinute,
    minuteArray,
    time,
  };
};

export const updateObject = (prevState, valueToChange) => ({
  ...prevState,
  ...valueToChange,
});
