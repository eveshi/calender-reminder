import React from 'react';
import PropTypes from 'prop-types';

const HourPicker = (props) => {
  const {
    hourPicked,
    hourArray,
    onChange,
  } = props;

  const hourOptions = hourArray.map(hour => (
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
  hourArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  hourPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HourPicker;
