import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

const DayPicker = (props) => {
  const {
    yearPicked,
    monthPicked,
    dayPicked,
    onChange,
  } = props;

  const daysInMonthPicked = dateFns.getDaysInMonth(new Date(yearPicked, monthPicked, 1));
  const dayArray = [];
  for (let i = 1; i < daysInMonthPicked + 1; i += 1) {
    dayArray.push(i);
  }

  const dayOptions = dayArray === null
    ? null
    : dayArray.map(day => (
      <option
        key={day}
        value={day}
      >
        {day}
      </option>
    ));

  return (
    <select
      className="DatePicker_picker_select"
      value={dayPicked}
      onChange={onChange}
    >
      {dayOptions}
    </select>
  );
};

DayPicker.propTypes = {
  yearPicked: PropTypes.string.isRequired,
  monthPicked: PropTypes.string.isRequired,
  dayPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DayPicker;
