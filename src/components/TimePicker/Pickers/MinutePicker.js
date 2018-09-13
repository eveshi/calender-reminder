import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import * as utility from '../../../utility/utility';

const MinutePicker = (props) => {
  const {
    datePicked,
    hourPicked,
    minutePicked,
    onChange,
  } = props;

  const currentHour = dateFns.getHours(new Date());

  const minuteInit = (datePicked <= utility.formatCurrentDate
                      && currentHour === parseInt(hourPicked, 10))
    ? utility.minuteFiveGenerator()
    : 0;

  const minuteArray = [];
  for (let i = minuteInit; i < 60; i += 5) {
    const minuteString = utility.minuteStringGenerator(i);
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
  datePicked: PropTypes.string.isRequired,
  hourPicked: PropTypes.string.isRequired,
  minutePicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MinutePicker;
