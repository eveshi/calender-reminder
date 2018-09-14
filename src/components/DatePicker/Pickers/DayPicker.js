import React from 'react';
import PropTypes from 'prop-types';

const DayPicker = (props) => {
  const {
    dayArray,
    dayPicked,
    onChange,
  } = props;

  const dayOptions = dayArray.map(day => (
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
  dayArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  dayPicked: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DayPicker;
