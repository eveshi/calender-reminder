import React from 'react';
import PropTypes from 'prop-types';
import { minuteStringGenerator } from '../../../utility/utility';

const MinutePicker = (props) => {
  const {
    minutePicked,
    onChange,
  } = props;

  const minuteArray = [];
  for (let i = 0; i < 60; i += 5) {
    const minuteString = minuteStringGenerator(i);
    minuteArray.push(minuteString);
  }

  const minuteOptions = minuteArray == null
    ? null
    : minuteArray.map(minute => (
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
  onChange: PropTypes.func.isRequired,
};

export default MinutePicker;
