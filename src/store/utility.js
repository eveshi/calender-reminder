import dateFns from 'date-fns';

const updateObject = (prevState, valueToChange) => {
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

export default updateObject;
