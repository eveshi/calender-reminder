import React from 'react';
import PropTypes from 'prop-types';
import { hourStringGenerator } from '../../../utility/utility';

const HourPicker = (props) => {
  const {
    hourPicked,
    onChange,
  } = props;

  const hourArray = [];
  for (let i = 0; i < 24; i += 1) {
    const hourString = hourStringGenerator(i);
    hourArray.push(hourString);
  }

  const hourOptions = hourArray == null
    ? null
    : hourArray.map(hour => (
      <option
        key={hour}
        value={hour}
      >
        {hour}
      </option>
    ));

  return (
    <select
      className="TimePicker_select"
      value={hourPicked}
      onChange={onChange}
      name="hour"
    >
      {hourOptions}
    </select>
  );
};

HourPicker.propTypes = {
  hourPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HourPicker;
