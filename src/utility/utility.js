import dateFns from 'date-fns';

export const monthStringGenerator = (month) => {
  switch (month) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return month;
  }
};

export const hourStringGenerator = (hour) => {
  let hourString = hour.toString();
  if (hour < 10) {
    hourString = `0${hour}`;
  }

  return hourString;
};

export const minuteStringGenerator = (minute) => {
  let minuteString = minute.toString();
  if (minute < 10) {
    minuteString = `0${minute}`;
  }

  return minuteString;
};

export const timeStringGenerator = (time) => {
  const hour = parseInt(time / 100, 10);
  const minute = time % 100;
  const hourString = hourStringGenerator(hour);
  const minuteString = minuteStringGenerator(minute);
  return `${hourString}:${minuteString}`;
};

export const dateStringGenerator = (year, month, day) => (
  dateFns.format(new Date(year, month, day), 'YYYYMMDD')
);

export const formatCurrentDate = dateFns.format(new Date(), 'YYYYMMDD');

export const minuteFiveGenerator = () => {
  const currentMinute = dateFns.getMinutes(new Date());

  let currentMinuteDivideFive = currentMinute;

  for (currentMinuteDivideFive;
    (currentMinuteDivideFive % 5) !== 0;
    currentMinuteDivideFive += 1);

  return minuteStringGenerator(currentMinuteDivideFive);
};

export const timeIDGenerator = (hour, minute) => {
  const timeIDString = `${hour}${minute}`;
  return parseInt(timeIDString, 10);
};
