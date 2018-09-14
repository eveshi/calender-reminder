import React from 'react';
import PropTypes from 'prop-types';

const MinutePicker = (props) => {
  const {
    minutePicked,
    minuteArray,
    onChange,
  } = props;

  const minuteOptions = minuteArray.map(minute => (
    <option
      key={minute}
      value={minute}
    >
      {minute}
    </option>
  ));

  return (
    <select
      className="TimePicker_select"
      value={minutePicked}
      onChange={onChange}
      name="minute"
    >
      {minuteOptions}
    </select>
  );
};

MinutePicker.propTypes = {
  minutePicked: PropTypes.string.isRequired,
  minuteArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MinutePicker;
